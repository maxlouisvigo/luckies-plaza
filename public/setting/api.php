<?php
session_start();
header('Content-Type: application/json; charset=utf-8');

// Auth check
if (!isset($_SESSION['auth_user']) || $_SESSION['auth_user'] !== 'Louis') {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Sesi berakhir atau belum login.']);
    exit;
}

$action = isset($_GET['action']) ? $_GET['action'] : '';

// Shared traffic stats file in luiarchives
$statsFile = __DIR__ . '/../../luiarchives/setting/traffic_data.json';
if (!file_exists($statsFile)) {
    $statsFile = __DIR__ . '/../luiarchives/setting/traffic_data.json';
}

if ($action === 'get_stats') {
    $stats = [
        'summary' => [
            'total_views' => 0,
            'unique_visitors_all_time' => 0,
            'today_date' => date('Y-m-d'),
            'today_views' => 0,
            'today_uniques' => 0,
            'last_hit' => ''
        ],
        'by_path' => [],
        'by_country' => [],
        'by_device' => ['Mobile' => 0, 'Desktop' => 0, 'Tablet' => 0],
        'by_os' => [],
        'by_browser' => [],
        'by_referrer' => [],
        'recent_logs' => []
    ];

    if (file_exists($statsFile)) {
        $raw = @file_get_contents($statsFile);
        $decoded = json_decode($raw, true);
        if (is_array($decoded)) {
            $stats = array_replace_recursive($stats, $decoded);
        }
    }

    // Filter strictly for Root Domain (path === '/' or does NOT contain luiarchives)
    $allLogs = isset($stats['recent_logs']) && is_array($stats['recent_logs']) ? $stats['recent_logs'] : [];
    $rootLogs = [];
    $rootViews = 0;
    $rootTodayViews = 0;
    $uniqueIds = [];
    $todayUniqueIds = [];
    $rootDevices = ['Mobile' => 0, 'Desktop' => 0, 'Tablet' => 0];
    $rootCountries = [];
    $rootReferrers = [];
    $rootOS = [];
    $rootBrowsers = [];
    $todayStr = date('Y-m-d');

    foreach ($allLogs as $l) {
        $p = isset($l['path']) ? $l['path'] : '/';
        if ($p === '/' || $p === '' || strpos($p, 'luiarchives') === false) {
            $rootLogs[] = $l;
            $rootViews++;
            
            $ts = isset($l['timestamp']) ? $l['timestamp'] : '';
            if (strpos($ts, $todayStr) === 0) {
                $rootTodayViews++;
                if (!empty($l['visitor_id'])) $todayUniqueIds[$l['visitor_id']] = true;
            }
            if (!empty($l['visitor_id'])) $uniqueIds[$l['visitor_id']] = true;

            // Device
            $dev = isset($l['device']) ? $l['device'] : 'Desktop';
            if (!isset($rootDevices[$dev])) $rootDevices[$dev] = 0;
            $rootDevices[$dev]++;

            // Country
            $cCode = isset($l['country_code']) ? $l['country_code'] : 'ID';
            if (!isset($rootCountries[$cCode])) {
                $rootCountries[$cCode] = [
                    'code' => $cCode,
                    'name' => isset($l['country_name']) ? $l['country_name'] : $cCode,
                    'flag' => isset($l['country_flag']) ? $l['country_flag'] : '🌐',
                    'count' => 0
                ];
            }
            $rootCountries[$cCode]['count']++;

            // OS
            $os = isset($l['os']) ? $l['os'] : 'Unknown';
            if (!isset($rootOS[$os])) $rootOS[$os] = 0;
            $rootOS[$os]++;

            // Browser
            $br = isset($l['browser']) ? $l['browser'] : 'Other';
            if (!isset($rootBrowsers[$br])) $rootBrowsers[$br] = 0;
            $rootBrowsers[$br]++;

            // Referrer
            $ref = isset($l['referrer']) ? $l['referrer'] : 'Direct';
            if (!isset($rootReferrers[$ref])) $rootReferrers[$ref] = 0;
            $rootReferrers[$ref]++;
        }
    }

    // Sort countries & referrers
    uasort($rootCountries, function($a, $b) {
        return ($b['count'] ?? 0) <=> ($a['count'] ?? 0);
    });
    arsort($rootReferrers);
    arsort($rootOS);
    arsort($rootBrowsers);

    // Fallback path hits counter
    $rootHitsCount = isset($stats['by_path']['/']) ? $stats['by_path']['/'] : $rootViews;
    if ($rootHitsCount < $rootViews) $rootHitsCount = $rootViews;

    echo json_encode([
        'success' => true,
        'cloudflare_url' => 'https://dash.cloudflare.com/344d1e1cb50e88c07b935f5ae218e124/web-analytics/overview?siteTag~in=f1c760cf247d407da1d28be721636bc7&excludeBots=Yes',
        'stats' => [
            'total_views' => $rootHitsCount,
            'today_views' => $rootTodayViews,
            'total_uniques' => count($uniqueIds) ?: ($rootHitsCount > 0 ? 1 : 0),
            'today_uniques' => count($todayUniqueIds) ?: ($rootTodayViews > 0 ? 1 : 0),
            'devices' => $rootDevices,
            'countries' => $rootCountries,
            'referrers' => $rootReferrers,
            'os' => $rootOS,
            'browsers' => $rootBrowsers,
            'recent_logs' => array_slice($rootLogs, 0, 30)
        ]
    ]);
    exit;
}

if ($action === 'get_cf_graph') {
    $cfApiFile = __DIR__ . '/cf_api.php';
    if (!file_exists($cfApiFile)) {
        $cfApiFile = __DIR__ . '/../luiarchives/setting/cf_api.php';
    }
    if (!file_exists($cfApiFile)) {
        $cfApiFile = __DIR__ . '/../../luiarchives/setting/cf_api.php';
    }
    require_once $cfApiFile;

    $scope = isset($_GET['scope']) ? $_GET['scope'] : 'root';
    $hours = isset($_GET['hours']) ? intval($_GET['hours']) : 24;
    if (!in_array($scope, ['archives', 'root', 'all'])) {
        $scope = 'root';
    }
    if ($hours <= 0 || $hours > 168) {
        $hours = 24;
    }
    echo json_encode(fetchCloudflareAnalyticsData($scope, $hours));
    exit;
}

http_response_code(400);
echo json_encode(['success' => false, 'message' => 'Aksi tidak valid.']);
exit;
