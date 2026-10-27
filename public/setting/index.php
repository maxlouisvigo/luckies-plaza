<?php
session_start();

$error = '';
$isLoggedIn = isset($_SESSION['auth_user']) && $_SESSION['auth_user'] === 'Louis';

// Handle Logout
if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    $_SESSION = [];
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    session_destroy();
    header('Location: index.php');
    exit;
}

// Handle Login POST
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login_submit'])) {
    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    $password = isset($_POST['password']) ? trim($_POST['password']) : '';

    if ($username === 'Louis' && $password === 'Aplnxszk99') {
        $_SESSION['auth_user'] = 'Louis';
        header('Location: index.php');
        exit;
    } else {
        $error = 'Username atau Password tidak valid. Silakan coba kembali.';
    }
}

$cfDashboardUrl = "https://dash.cloudflare.com/344d1e1cb50e88c07b935f5ae218e124/web-analytics/overview?siteTag~in=f1c760cf247d407da1d28be721636bc7&excludeBots=Yes";
?>
<!DOCTYPE html>
<html lang="id" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo $isLoggedIn ? 'Dapur Portofolio · Louis Vigo' : 'Login Dapur · Louis Vigo'; ?></title>
  
  <!-- Privacy Shield -->
  <meta name="robots" content="noindex, nofollow, noarchive, nosnippet">
  <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet">

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23F05A22'/><text x='50%' y='65%' font-size='55' font-weight='bold' font-family='sans-serif' fill='white' text-anchor='middle'>V</text></svg>" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Chart.js CDN for Real-Time Analytics Graph -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ["Plus Jakarta Sans", "system-ui", "-apple-system", "sans-serif"],
            serif: ["Instrument Serif", "Georgia", "serif"],
            mono: ["JetBrains Mono", "monospace"],
          },
          colors: {
            brandOrange: "#F05A22",
            brandOrangeHover: "#D94B17",
            brandDark: "#0C0A09",
            brandSurface: "#171412",
            brandBorder: "#29231F",
            brandUmber: "#3D2B1F"
          }
        }
      }
    }
  </script>
</head>
<body class="bg-brandDark text-neutral-100 font-sans min-h-screen flex flex-col antialiased selection:bg-brandOrange selection:text-white">

<?php if (!$isLoggedIn): ?>
  <!-- ========================================================= -->
  <!-- LOGIN SCREEN                                              -->
  <!-- ========================================================= -->
  <div class="flex-1 flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-brandSurface border border-brandBorder rounded-3xl p-7 sm:p-9 shadow-2xl relative overflow-hidden">
      
      <!-- Subtle Ambient Glow -->
      <div class="absolute -top-24 -right-24 w-48 h-48 bg-brandOrange/20 rounded-full blur-3xl pointer-events-none"></div>
      
      <div class="text-center mb-8 relative">
        <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brandOrange text-white font-extrabold text-2xl shadow-lg shadow-brandOrange/30 mb-3">
          V
        </div>
        <h1 class="text-2xl font-serif tracking-wide text-white">Dapur Portofolio</h1>
        <p class="text-xs text-neutral-400 mt-1 font-mono tracking-tight">louisvigo.com &bull; Root Analytics &amp; Control</p>
      </div>

      <?php if (!empty($error)): ?>
        <div class="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold flex items-center space-x-2">
          <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span><?php echo htmlspecialchars($error); ?></span>
        </div>
      <?php endif; ?>

      <form method="POST" action="" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Username</label>
          <input type="text" name="username" required autocomplete="username"
            class="w-full text-sm px-4 py-3 rounded-xl bg-brandDark/80 border border-brandBorder text-white focus:bg-brandDark focus:outline-none focus:ring-2 focus:ring-brandOrange/40 focus:border-brandOrange transition">
        </div>

        <div>
          <label class="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Password</label>
          <input type="password" name="password" required autocomplete="current-password"
            class="w-full text-sm px-4 py-3 rounded-xl bg-brandDark/80 border border-brandBorder text-white focus:bg-brandDark focus:outline-none focus:ring-2 focus:ring-brandOrange/40 focus:border-brandOrange transition">
        </div>

        <button type="submit" name="login_submit"
          class="w-full py-3.5 rounded-xl bg-brandOrange hover:bg-brandOrangeHover text-white text-xs font-bold uppercase tracking-wider transition shadow-lg shadow-brandOrange/20 mt-2">
          Buka Dapur Portofolio
        </button>
      </form>

      <div class="mt-7 pt-5 border-t border-brandBorder/60 text-center">
        <a href="../" class="text-xs text-neutral-400 hover:text-white transition inline-flex items-center space-x-1">
          <span>&larr; Kembali ke Portofolio Utama</span>
        </a>
      </div>
    </div>
  </div>

<?php else: ?>
  <!-- ========================================================= -->
  <!-- AUTHENTICATED DASHBOARD: ROOT PORTOFOLIO                   -->
  <!-- ========================================================= -->
  <div class="flex-1 flex flex-col">
    
    <!-- Top Navigation Header -->
    <header class="bg-brandSurface/90 backdrop-blur-md border-b border-brandBorder sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        
        <div class="flex items-center space-x-3">
          <div class="w-9 h-9 rounded-xl bg-brandOrange text-white font-extrabold text-lg flex items-center justify-center shadow-md shadow-brandOrange/20">
            V
          </div>
          <div>
            <div class="flex items-center space-x-2">
              <h1 class="text-base font-bold text-white tracking-tight">Dapur Portofolio</h1>
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-brandOrange/20 text-brandOrange border border-brandOrange/30">
                Root Domain
              </span>
            </div>
            <p class="text-xs font-mono text-neutral-400">louisvigo.com &bull; Control &amp; Traffic Hub</p>
          </div>
        </div>

        <div class="flex items-center space-x-2.5">
          <a href="../" target="_blank" rel="noopener" class="px-3 py-1.5 rounded-xl bg-brandDark/80 hover:bg-brandDark border border-brandBorder text-neutral-300 hover:text-white text-xs font-semibold transition flex items-center space-x-1.5">
            <span>Lihat Web</span>
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          <a href="../luiarchives/setting/" target="_blank" rel="noopener" class="hidden sm:flex px-3 py-1.5 rounded-xl bg-brandDark/80 hover:bg-brandDark border border-brandBorder text-neutral-300 hover:text-white text-xs font-semibold transition items-center space-x-1.5">
            <span>Dapur Archives</span>
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          <a href="?action=logout" class="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition flex items-center space-x-1">
            <span>Keluar</span>
          </a>
        </div>

      </div>
    </header>

    <!-- Main Content Container -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 space-y-6">

      <!-- Cloudflare Quick Launch Banner -->
      <div class="bg-gradient-to-r from-brandSurface to-brandUmber/40 border border-brandBorder rounded-3xl p-6 sm:p-7 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-5">
        
        <div class="space-y-1 relative z-10 max-w-2xl">
          <div class="flex items-center space-x-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse mr-1.5"></span>
              Cloudflare Web Analytics
            </span>
            <span class="text-xs font-mono text-neutral-400">Official Cloudflare Dashboard</span>
          </div>
          <h2 class="text-lg sm:text-xl font-bold text-white tracking-tight pt-1">Pantau Traffic Resmi di Cloudflare</h2>
          <p class="text-xs text-neutral-300 leading-relaxed">
            Akses dashboard analitik resmi akun Cloudflare Babe untuk melihat Core Web Vitals, page views, dan detail real-time lengkap.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3 relative z-10">
          <a href="<?php echo htmlspecialchars($cfDashboardUrl); ?>" target="_blank" rel="noopener"
            class="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-brandDark font-extrabold text-xs tracking-wide transition shadow-lg shadow-amber-500/20 flex items-center space-x-2">
            <span>Buka Cloudflare Analytics Resmi</span>
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>

          <button onclick="loadDashboardStats()" class="px-3.5 py-3 rounded-2xl bg-brandDark/80 hover:bg-brandDark border border-brandBorder text-neutral-300 text-xs font-bold transition flex items-center space-x-1.5">
            <svg class="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Refresh</span>
          </button>
        </div>

      </div>

      <!-- 4 KPI Cards (Khusus Root) -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <!-- Card 1: Pengunjung Unik -->
        <div class="bg-brandSurface p-5 rounded-3xl border border-brandBorder shadow-xs">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-semibold text-neutral-400">Pengunjung Unik</span>
            <span class="w-7 h-7 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center text-xs">👥</span>
          </div>
          <div class="flex items-baseline space-x-2">
            <span id="kpi-today-uniques" class="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">0</span>
            <span class="text-xs font-medium text-neutral-400">hari ini</span>
          </div>
          <p class="text-[11px] font-mono text-neutral-400 mt-2 pt-2 border-t border-brandBorder">
            Total: <strong id="kpi-total-uniques" class="text-white font-bold">0</strong> all-time
          </p>
        </div>

        <!-- Card 2: Total Pageviews -->
        <div class="bg-brandSurface p-5 rounded-3xl border border-brandBorder shadow-xs">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-semibold text-neutral-400">Total Pageviews</span>
            <span class="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs">👁️</span>
          </div>
          <div class="flex items-baseline space-x-2">
            <span id="kpi-today-views" class="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">0</span>
            <span class="text-xs font-medium text-neutral-400">hari ini</span>
          </div>
          <p class="text-[11px] font-mono text-neutral-400 mt-2 pt-2 border-t border-brandBorder">
            Total: <strong id="kpi-total-views" class="text-white font-bold">0</strong> hits
          </p>
        </div>

        <!-- Card 3: Lokasi Terbanyak -->
        <div class="bg-brandSurface p-5 rounded-3xl border border-brandBorder shadow-xs">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-semibold text-neutral-400">Lokasi Terbanyak</span>
            <span class="w-7 h-7 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center text-xs">📍</span>
          </div>
          <div class="flex items-center space-x-2 mt-1">
            <span id="kpi-top-country-flag" class="text-2xl">🇮🇩</span>
            <div>
              <span id="kpi-top-country-name" class="text-sm sm:text-base font-bold text-white block leading-tight">Indonesia</span>
              <span id="kpi-top-country-pct" class="text-[11px] font-mono text-emerald-400 font-semibold">0% traffic</span>
            </div>
          </div>
          <p class="text-[11px] font-mono text-neutral-400 mt-2 pt-2 border-t border-brandBorder">
            Cloudflare CF-IPCountry
          </p>
        </div>

        <!-- Card 4: Device Dominan -->
        <div class="bg-brandSurface p-5 rounded-3xl border border-brandBorder shadow-xs">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-semibold text-neutral-400">Device Dominan</span>
            <span class="w-7 h-7 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center text-xs">📱</span>
          </div>
          <div class="flex items-center space-x-2 mt-1">
            <span id="kpi-top-device-icon" class="text-2xl">💻</span>
            <div>
              <span id="kpi-top-device-name" class="text-sm sm:text-base font-bold text-white block leading-tight">Desktop</span>
              <span id="kpi-top-device-pct" class="text-[11px] font-mono text-purple-400 font-semibold">0% users</span>
            </div>
          </div>
          <p class="text-[11px] font-mono text-neutral-400 mt-2 pt-2 border-t border-brandBorder">
            User-Agent Parser
          </p>
        </div>
      </div>

      <!-- REAL-TIME CLOUDFLARE GRAPH CARD (ROOT & GLOBAL) -->
      <div class="bg-brandSurface rounded-3xl p-6 sm:p-7 border border-brandBorder space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-brandBorder/60">
          <div>
            <div class="flex items-center space-x-2">
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-brandOrange/20 text-brandOrange border border-brandOrange/30">
                <span class="w-1.5 h-1.5 rounded-full bg-brandOrange animate-pulse mr-1"></span>
                Cloudflare GraphQL Edge
              </span>
              <span class="text-xs font-mono text-neutral-400" id="chartLastUpdated">Live</span>
            </div>
            <h3 class="text-base font-bold text-white tracking-tight mt-1">Grafik Aktivitas Pengunjung Real-Time</h3>
            <p class="text-xs text-neutral-400">Pantauan fluktuasi requests &amp; unique visits per jam langsung dari satelit Cloudflare.</p>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <!-- Scope Select -->
            <div class="inline-flex p-1 bg-brandDark rounded-xl border border-brandBorder text-xs font-semibold">
              <button onclick="setRootChartScope('root')" id="chart-scope-root" class="px-2.5 py-1 rounded-lg bg-brandSurface text-white shadow-xs transition font-bold">Root (Portofolio)</button>
              <button onclick="setRootChartScope('archives')" id="chart-scope-archives" class="px-2.5 py-1 rounded-lg text-neutral-400 hover:text-white transition">/luiarchives</button>
              <button onclick="setRootChartScope('all')" id="chart-scope-all" class="px-2.5 py-1 rounded-lg text-neutral-400 hover:text-white transition">Global</button>
            </div>

            <!-- Hours Select -->
            <div class="inline-flex p-1 bg-brandDark rounded-xl border border-brandBorder text-xs font-semibold">
              <button onclick="setRootChartHours(24)" id="chart-hours-24" class="px-2.5 py-1 rounded-lg bg-brandSurface text-white shadow-xs transition font-bold">24 Jam</button>
              <button onclick="setRootChartHours(168)" id="chart-hours-168" class="px-2.5 py-1 rounded-lg text-neutral-400 hover:text-white transition">7 Hari</button>
            </div>

            <button onclick="fetchRootCloudflareGraph()" class="p-1.5 rounded-xl bg-brandDark hover:bg-brandBorder text-neutral-300 transition" title="Refresh Grafik">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Chart Canvas Container -->
        <div class="relative w-full h-64 sm:h-72">
          <canvas id="cfRootChartCanvas"></canvas>
          <div id="chartLoadingOverlay" class="absolute inset-0 bg-brandSurface/80 backdrop-blur-xs flex items-center justify-center text-xs font-semibold text-neutral-300 hidden">
            <span class="inline-flex items-center space-x-2">
              <svg class="animate-spin w-4 h-4 text-brandOrange" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <span>Memuat data Cloudflare...</span>
            </span>
          </div>
        </div>

        <!-- Bottom Summary Bar of the Chart -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-brandBorder/60 text-xs">
          <div class="p-2.5 rounded-xl bg-brandDark/80 border border-brandBorder/60">
            <span class="text-neutral-400 block text-[10px] font-mono">TOTAL REQUESTS</span>
            <strong id="chartStatRequests" class="text-sm font-bold text-white font-mono">0</strong>
          </div>
          <div class="p-2.5 rounded-xl bg-brandDark/80 border border-brandBorder/60">
            <span class="text-neutral-400 block text-[10px] font-mono">UNIQUE VISITS</span>
            <strong id="chartStatVisits" class="text-sm font-bold text-emerald-400 font-mono">0</strong>
          </div>
          <div class="p-2.5 rounded-xl bg-brandDark/80 border border-brandBorder/60">
            <span class="text-neutral-400 block text-[10px] font-mono">PEAK TRAFFIC</span>
            <strong id="chartStatPeak" class="text-sm font-bold text-white font-mono">-</strong>
          </div>
          <div class="p-2.5 rounded-xl bg-brandDark/80 border border-brandBorder/60">
            <span class="text-neutral-400 block text-[10px] font-mono">API STATUS</span>
            <strong class="text-xs font-bold text-emerald-400">&check; Connected</strong>
          </div>
        </div>
      </div>

      <!-- 2-Column Visual Breakdown Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <!-- Col 1: Device Breakdown & Referrers -->
        <div class="space-y-6">

          <!-- Device Box -->
          <div class="bg-brandSurface rounded-3xl p-6 border border-brandBorder space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-brandBorder/60">
              <div>
                <h3 class="text-sm font-bold text-white">Jenis Perangkat (Desktop vs HP)</h3>
                <p class="text-xs text-neutral-400">Proporsi pengunjung yang melihat portofolio utama</p>
              </div>
              <span class="text-xs font-mono font-bold text-neutral-400" id="totalDeviceHits">0 hits</span>
            </div>

            <!-- Visual Progress Bars -->
            <div class="space-y-3 pt-1">
              <div>
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span class="flex items-center space-x-1.5 text-neutral-300">
                    <span>💻</span>
                    <span>Desktop / Laptop</span>
                  </span>
                  <span class="font-mono text-white" id="dev-desktop-stat">0 (0%)</span>
                </div>
                <div class="w-full h-2 bg-brandDark rounded-full overflow-hidden">
                  <div id="dev-desktop-bar" class="h-full bg-blue-500 rounded-full transition-all duration-500" style="width: 0%"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span class="flex items-center space-x-1.5 text-neutral-300">
                    <span>📱</span>
                    <span>Mobile (Smartphone)</span>
                  </span>
                  <span class="font-mono text-white" id="dev-mobile-stat">0 (0%)</span>
                </div>
                <div class="w-full h-2 bg-brandDark rounded-full overflow-hidden">
                  <div id="dev-mobile-bar" class="h-full bg-purple-500 rounded-full transition-all duration-500" style="width: 0%"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span class="flex items-center space-x-1.5 text-neutral-300">
                    <span>📟</span>
                    <span>Tablet / iPad</span>
                  </span>
                  <span class="font-mono text-white" id="dev-tablet-stat">0 (0%)</span>
                </div>
                <div class="w-full h-2 bg-brandDark rounded-full overflow-hidden">
                  <div id="dev-tablet-bar" class="h-full bg-amber-500 rounded-full transition-all duration-500" style="width: 0%"></div>
                </div>
              </div>
            </div>

            <!-- OS & Browser Chips -->
            <div class="pt-3 border-t border-brandBorder/60 space-y-3">
              <div>
                <span class="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">Sistem Operasi (OS)</span>
                <div class="flex flex-wrap gap-1.5" id="osBadgesList">
                  <span class="text-xs text-neutral-400 italic">Belum ada data</span>
                </div>
              </div>
              <div>
                <span class="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">Browser Pengunjung</span>
                <div class="flex flex-wrap gap-1.5" id="browserBadgesList">
                  <span class="text-xs text-neutral-400 italic">Belum ada data</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Referrers Box -->
          <div class="bg-brandSurface rounded-3xl p-6 border border-brandBorder space-y-3">
            <div class="flex items-center justify-between pb-3 border-b border-brandBorder/60">
              <div>
                <h3 class="text-sm font-bold text-white">Sumber Trafik (Dari Mana Datangnya)</h3>
                <p class="text-xs text-neutral-400">Behance, LinkedIn, Instagram, atau Direct</p>
              </div>
              <span class="text-xs font-mono text-neutral-400">Referrer</span>
            </div>
            <div class="space-y-2 pt-1" id="referrersList">
              <p class="text-xs text-neutral-400 italic py-2">Belum ada data referrer.</p>
            </div>
          </div>

        </div>

        <!-- Col 2: Lokasi Pengunjung & Hub Navigasi -->
        <div class="space-y-6">

          <!-- Countries List Box -->
          <div class="bg-brandSurface rounded-3xl p-6 border border-brandBorder space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-brandBorder/60">
              <div>
                <h3 class="text-sm font-bold text-white">Lokasi Pengunjung (Negara Asal)</h3>
                <p class="text-xs text-neutral-400">Terdeteksi via Cloudflare Geo-Location</p>
              </div>
              <span class="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">&check; Cloudflare Geo</span>
            </div>

            <div class="space-y-2.5 max-h-64 overflow-y-auto pr-1" id="countriesList">
              <p class="text-xs text-neutral-400 italic py-2">Belum ada data negara.</p>
            </div>
          </div>

          <!-- Navigation & Quick Hub -->
          <div class="bg-brandSurface rounded-3xl p-6 border border-brandBorder space-y-3">
            <h3 class="text-sm font-bold text-white">Akses Cepat Ekosistem louisvigo.com</h3>
            <p class="text-xs text-neutral-400">Navigasi langsung ke subfolder dan kontrol lainnya</p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <a href="../luiarchives/setting/" target="_blank" rel="noopener"
                class="p-3.5 rounded-2xl bg-brandDark/80 hover:bg-brandDark border border-brandBorder text-xs transition flex items-center justify-between">
                <div>
                  <span class="font-bold text-white block">Dapur Lui Archives</span>
                  <span class="text-[11px] text-neutral-400">Feed &amp; Foto Setting</span>
                </div>
                <span class="text-neutral-400">&rarr;</span>
              </a>

              <a href="../" target="_blank" rel="noopener"
                class="p-3.5 rounded-2xl bg-brandDark/80 hover:bg-brandDark border border-brandBorder text-xs transition flex items-center justify-between">
                <div>
                  <span class="font-bold text-white block">Lihat Portofolio</span>
                  <span class="text-[11px] text-neutral-400">Live Website 2026</span>
                </div>
                <span class="text-neutral-400">&rarr;</span>
              </a>
            </div>
          </div>

        </div>

      </div>

      <!-- Full-Width Card: Tabel Live Feed Kunjungan Root -->
      <div class="bg-brandSurface rounded-3xl p-6 border border-brandBorder space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-brandBorder/60">
          <div>
            <div class="flex items-center space-x-2">
              <h3 class="text-sm font-bold text-white">Feed Kunjungan Terakhir ke Portofolio Utama</h3>
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5"></span>
                <span>Live Stream Aktif (5s)</span>
              </span>
            </div>
            <p class="text-xs text-neutral-400 mt-0.5">Mencatat pengunjung yang membuka halaman utama louisvigo.com secara real-time.</p>
          </div>
          <span class="text-xs font-mono text-neutral-400">Khusus Root Path ( / )</span>
        </div>

        <div class="overflow-x-auto rounded-2xl border border-brandBorder/60">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-brandDark/80 border-b border-brandBorder/60 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                <th class="py-3 px-3.5">Waktu</th>
                <th class="py-3 px-3.5">Negara</th>
                <th class="py-3 px-3.5">Perangkat &amp; OS</th>
                <th class="py-3 px-3.5">Browser</th>
                <th class="py-3 px-3.5">Sumber (Referrer)</th>
              </tr>
            </thead>
            <tbody id="recentLogsTableBody" class="divide-y divide-brandBorder/40 font-mono">
              <tr>
                <td colspan="5" class="py-8 text-center text-neutral-400 italic font-sans">
                  Memuat log traffic root...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </main>

  </div>

  <script>
    let rootPollingTimer = null;
    let rootLatestSeenLogId = null;

    function startRootLivePolling() {
      if (rootPollingTimer) clearInterval(rootPollingTimer);
      rootPollingTimer = setInterval(() => {
        if (!document.hidden) {
          loadDashboardStatsSilently();
        }
      }, 5000);
    }

    async function loadDashboardStatsSilently() {
      try {
        const res = await fetch('api.php?action=get_stats');
        const data = await res.json();
        if (data.success) {
          renderRootStats(data.stats);
        }
      } catch (e) {}
    }

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        loadDashboardStatsSilently();
      }
    });

    async function loadDashboardStats() {
      try {
        const res = await fetch('api.php?action=get_stats');
        const data = await res.json();
        if (data.success) {
          renderRootStats(data.stats);
        }
      } catch (err) {
        console.error('Failed to load root stats:', err);
      }
    }

    function renderRootStats(stats) {
      if (!stats) return;

      document.getElementById('kpi-today-uniques').textContent = stats.today_uniques || 0;
      document.getElementById('kpi-total-uniques').textContent = stats.total_uniques || 0;
      document.getElementById('kpi-today-views').textContent = stats.today_views || 0;
      document.getElementById('kpi-total-views').textContent = stats.total_views || 0;

      const totalViews = stats.total_views || 0;

      // Top Country
      const countries = Object.values(stats.countries || {});
      if (countries.length > 0) {
        countries.sort((a, b) => (b.count || 0) - (a.count || 0));
        const topC = countries[0];
        const pct = totalViews > 0 ? Math.round((topC.count / totalViews) * 100) : 0;
        document.getElementById('kpi-top-country-flag').textContent = topC.flag || '🌐';
        document.getElementById('kpi-top-country-name').textContent = topC.name || topC.code;
        document.getElementById('kpi-top-country-pct').textContent = pct + '% traffic (' + topC.count + ' hits)';
      } else {
        document.getElementById('kpi-top-country-flag').textContent = '🇮🇩';
        document.getElementById('kpi-top-country-name').textContent = 'Indonesia';
        document.getElementById('kpi-top-country-pct').textContent = '0% traffic';
      }

      // Device
      const dev = stats.devices || { Mobile: 0, Desktop: 0, Tablet: 0 };
      const mob = dev.Mobile || 0;
      const desk = dev.Desktop || 0;
      const tab = dev.Tablet || 0;
      const devTotal = mob + desk + tab;
      document.getElementById('totalDeviceHits').textContent = devTotal + ' hits';

      let dominantDev = 'Desktop';
      let dominantPct = 0;
      let dominantIcon = '💻';

      if (mob > desk && mob > tab) {
        dominantDev = 'Mobile';
        dominantIcon = '📱';
        dominantPct = devTotal > 0 ? Math.round((mob / devTotal) * 100) : 0;
      } else {
        dominantPct = devTotal > 0 ? Math.round((desk / devTotal) * 100) : 0;
      }

      document.getElementById('kpi-top-device-icon').textContent = dominantIcon;
      document.getElementById('kpi-top-device-name').textContent = dominantDev;
      document.getElementById('kpi-top-device-pct').textContent = dominantPct + '% users';

      const deskPct = devTotal > 0 ? Math.round((desk / devTotal) * 100) : 0;
      const mobPct = devTotal > 0 ? Math.round((mob / devTotal) * 100) : 0;
      const tabPct = devTotal > 0 ? Math.round((tab / devTotal) * 100) : 0;

      document.getElementById('dev-desktop-stat').textContent = desk + ' (' + deskPct + '%)';
      document.getElementById('dev-desktop-bar').style.width = deskPct + '%';

      document.getElementById('dev-mobile-stat').textContent = mob + ' (' + mobPct + '%)';
      document.getElementById('dev-mobile-bar').style.width = mobPct + '%';

      document.getElementById('dev-tablet-stat').textContent = tab + ' (' + tabPct + '%)';
      document.getElementById('dev-tablet-bar').style.width = tabPct + '%';

      // OS Badges
      const osEl = document.getElementById('osBadgesList');
      const osObj = stats.os || {};
      const osKeys = Object.keys(osObj);
      if (osKeys.length > 0) {
        osEl.innerHTML = osKeys.map(k => `
          <span class="inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-semibold bg-brandDark text-neutral-200 border border-brandBorder">
            ${escapeHtml(k)}: <strong class="ml-1 font-mono text-white">${osObj[k]}</strong>
          </span>
        `).join('');
      } else {
        osEl.innerHTML = '<span class="text-xs text-neutral-400 italic">Belum ada data</span>';
      }

      // Browser Badges
      const brEl = document.getElementById('browserBadgesList');
      const brObj = stats.browsers || {};
      const brKeys = Object.keys(brObj);
      if (brKeys.length > 0) {
        brEl.innerHTML = brKeys.map(k => `
          <span class="inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-semibold bg-brandDark text-neutral-200 border border-brandBorder">
            ${escapeHtml(k)}: <strong class="ml-1 font-mono text-white">${brObj[k]}</strong>
          </span>
        `).join('');
      } else {
        brEl.innerHTML = '<span class="text-xs text-neutral-400 italic">Belum ada data</span>';
      }

      // Referrers
      const refEl = document.getElementById('referrersList');
      const refObj = stats.referrers || {};
      const refKeys = Object.keys(refObj);
      if (refKeys.length > 0) {
        refEl.innerHTML = refKeys.map(k => {
          const count = refObj[k];
          const pct = totalViews > 0 ? Math.round((count / totalViews) * 100) : 0;
          return `
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-brandDark/80 border border-brandBorder/60 text-xs">
              <span class="font-semibold text-neutral-200 flex items-center space-x-2">
                <span class="w-2 h-2 rounded-full bg-brandOrange"></span>
                <span>${escapeHtml(k)}</span>
              </span>
              <div class="flex items-center space-x-2 font-mono">
                <span class="text-white font-bold">${count}</span>
                <span class="text-[10px] text-neutral-400">(${pct}%)</span>
              </div>
            </div>
          `;
        }).join('');
      } else {
        refEl.innerHTML = '<p class="text-xs text-neutral-400 italic py-2">Belum ada log traffic masuk.</p>';
      }

      // Countries
      const cListEl = document.getElementById('countriesList');
      if (countries.length > 0) {
        cListEl.innerHTML = countries.map(c => {
          const count = c.count || 0;
          const pct = totalViews > 0 ? Math.round((count / totalViews) * 100) : 0;
          return `
            <div class="p-2.5 rounded-2xl bg-brandDark/80 border border-brandBorder/60 space-y-1.5">
              <div class="flex items-center justify-between text-xs">
                <div class="flex items-center space-x-2">
                  <span class="text-base">${c.flag || '🌐'}</span>
                  <span class="font-bold text-white">${escapeHtml(c.name || c.code)}</span>
                  <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400">${c.code}</span>
                </div>
                <div class="font-mono text-xs font-bold text-white">
                  ${count} <span class="text-[10px] font-normal text-neutral-400">(${pct}%)</span>
                </div>
              </div>
              <div class="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                <div class="h-full bg-emerald-500 rounded-full" style="width: ${pct}%"></div>
              </div>
            </div>
          `;
        }).join('');
      } else {
        cListEl.innerHTML = '<p class="text-xs text-neutral-400 italic py-2">Belum ada pengunjung terdeteksi.</p>';
      }

      // Recent Logs
      const tbody = document.getElementById('recentLogsTableBody');
      const logs = stats.recent_logs || [];
      if (logs.length > 0) {
        tbody.innerHTML = logs.map(l => `
          <tr class="hover:bg-brandDark/50 transition text-xs">
            <td class="py-2.5 px-3.5 text-neutral-400 whitespace-nowrap">${escapeHtml(l.timestamp)}</td>
            <td class="py-2.5 px-3.5 whitespace-nowrap">
              <span class="inline-flex items-center space-x-1.5">
                <span class="text-sm">${l.country_flag || '🌐'}</span>
                <span class="font-semibold text-white font-sans">${escapeHtml(l.country_name || l.country_code)}</span>
              </span>
            </td>
            <td class="py-2.5 px-3.5 text-neutral-300 whitespace-nowrap font-sans">
              <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold ${l.device === 'Mobile' ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20' : 'bg-blue-500/10 text-blue-300 border border-blue-500/20'}">
                ${l.device === 'Mobile' ? '📱' : '💻'} ${escapeHtml(l.device)}
              </span>
              <span class="text-[11px] text-neutral-400 ml-1">(${escapeHtml(l.os)})</span>
            </td>
            <td class="py-2.5 px-3.5 text-neutral-300 whitespace-nowrap font-sans">${escapeHtml(l.browser)}</td>
            <td class="py-2.5 px-3.5 text-neutral-400 whitespace-nowrap font-sans">${escapeHtml(l.referrer || 'Direct')}</td>
          </tr>
        `).join('');
      } else {
        tbody.innerHTML = `
          <tr>
            <td colspan="5" class="py-8 text-center text-neutral-400 italic font-sans">
              Belum ada kunjungan ke halaman root portofolio.
            </td>
          </tr>
        `;
      }
    }

    function escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    // Real-Time Cloudflare Chart State for Root
    let cfRootChartInstance = null;
    let cfRootChartScope = 'root';
    let cfRootChartHours = 24;

    function setRootChartScope(scope) {
      cfRootChartScope = scope;
      ['root', 'archives', 'all'].forEach(k => {
        const btn = document.getElementById('chart-scope-' + k);
        if (btn) {
          if (k === scope) {
            btn.className = 'px-2.5 py-1 rounded-lg bg-brandSurface text-white shadow-xs transition font-bold';
          } else {
            btn.className = 'px-2.5 py-1 rounded-lg text-neutral-400 hover:text-white transition';
          }
        }
      });
      fetchRootCloudflareGraph();
    }

    function setRootChartHours(hours) {
      cfRootChartHours = hours;
      [24, 168].forEach(h => {
        const btn = document.getElementById('chart-hours-' + h);
        if (btn) {
          if (h === hours) {
            btn.className = 'px-2.5 py-1 rounded-lg bg-brandSurface text-white shadow-xs transition font-bold';
          } else {
            btn.className = 'px-2.5 py-1 rounded-lg text-neutral-400 hover:text-white transition';
          }
        }
      });
      fetchRootCloudflareGraph();
    }

    async function fetchRootCloudflareGraph() {
      const overlay = document.getElementById('chartLoadingOverlay');
      if (overlay) overlay.classList.remove('hidden');

      try {
        const res = await fetch(`api.php?action=get_cf_graph&scope=${cfRootChartScope}&hours=${cfRootChartHours}`);
        const data = await res.json();
        if (data.success) {
          renderRootCloudflareChart(data);
        } else {
          console.warn('CF Root Graph error:', data.error);
        }
      } catch (err) {
        console.error('Failed to fetch CF root graph:', err);
      } finally {
        if (overlay) overlay.classList.add('hidden');
      }
    }

    function renderRootCloudflareChart(cfData) {
      const ctx = document.getElementById('cfRootChartCanvas');
      if (!ctx || typeof Chart === 'undefined') return;

      const timeline = cfData.timeline || [];
      const labels = timeline.map(t => t.label);
      const requestsData = timeline.map(t => t.requests);
      const visitsData = timeline.map(t => t.visits);

      document.getElementById('chartStatRequests').textContent = (cfData.total_requests || 0).toLocaleString();
      document.getElementById('chartStatVisits').textContent = (cfData.total_visits || 0).toLocaleString();
      document.getElementById('chartLastUpdated').textContent = 'Update: ' + (cfData.last_updated || 'Barusan');

      let maxReq = 0;
      let peakLabel = '-';
      timeline.forEach(t => {
        if (t.requests > maxReq) {
          maxReq = t.requests;
          peakLabel = t.label + ` (${t.requests} req)`;
        }
      });
      document.getElementById('chartStatPeak').textContent = peakLabel;

      if (cfRootChartInstance) {
        cfRootChartInstance.destroy();
      }

      const chartCtx = ctx.getContext('2d');
      const gradientReq = chartCtx.createLinearGradient(0, 0, 0, 240);
      gradientReq.addColorStop(0, 'rgba(240, 90, 34, 0.35)');
      gradientReq.addColorStop(1, 'rgba(240, 90, 34, 0.0)');

      const gradientVisits = chartCtx.createLinearGradient(0, 0, 0, 240);
      gradientVisits.addColorStop(0, 'rgba(16, 185, 129, 0.30)');
      gradientVisits.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

      cfRootChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels.length > 0 ? labels : ['00:00'],
          datasets: [
            {
              label: 'Total Requests (Hits)',
              data: requestsData,
              borderColor: '#F05A22',
              backgroundColor: gradientReq,
              borderWidth: 2.5,
              tension: 0.35,
              fill: true,
              pointBackgroundColor: '#F05A22',
              pointHoverRadius: 6,
              pointRadius: timeline.length > 30 ? 0 : 3
            },
            {
              label: 'Unique Visits',
              data: visitsData,
              borderColor: '#10B981',
              backgroundColor: gradientVisits,
              borderWidth: 2,
              borderDash: [4, 4],
              tension: 0.35,
              fill: true,
              pointBackgroundColor: '#10B981',
              pointHoverRadius: 6,
              pointRadius: timeline.length > 30 ? 0 : 3
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              align: 'end',
              labels: {
                boxWidth: 12,
                boxHeight: 12,
                usePointStyle: true,
                pointStyle: 'circle',
                font: {
                  family: 'Plus Jakarta Sans',
                  size: 11,
                  weight: '600'
                },
                color: '#A3A3A3'
              }
            },
            tooltip: {
              backgroundColor: '#1C1917',
              borderColor: '#29231F',
              borderWidth: 1,
              titleColor: '#FFFFFF',
              bodyColor: '#E5E5E5',
              padding: 10,
              cornerRadius: 12,
              titleFont: { family: 'Plus Jakarta Sans', size: 12, weight: 'bold' },
              bodyFont: { family: 'JetBrains Mono', size: 11 }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: {
                font: { family: 'JetBrains Mono', size: 10 },
                color: '#737373',
                maxTicksLimit: 12
              }
            },
            y: {
              grid: { color: 'rgba(255, 255, 255, 0.05)' },
              ticks: {
                font: { family: 'JetBrains Mono', size: 10 },
                color: '#737373',
                precision: 0
              },
              beginAtZero: true
            }
          }
        }
      });
    }

    loadDashboardStats();
    fetchRootCloudflareGraph();
    startRootLivePolling();
  </script>

<?php endif; ?>

</body>
</html>
