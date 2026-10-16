const windowsLogo = `<svg class="os-logo" viewBox="0 0 88 88" width="52" height="52" role="img" aria-label="Windows"><path fill="#0078d4" d="M0 0h42v42H0zM46 0h42v42H46zM0 46h42v42H0zM46 46h42v42H46z"/></svg>`;
const linuxLogo = `<svg class="os-logo" viewBox="0 0 88 88" width="52" height="52" role="img" aria-label="Linux (Ubuntu)">
  <ellipse cx="22" cy="54" rx="6.5" ry="17" transform="rotate(18 22 54)" fill="#1d1d1f"/>
  <ellipse cx="66" cy="54" rx="6.5" ry="17" transform="rotate(-18 66 54)" fill="#1d1d1f"/>
  <path fill="#1d1d1f" d="M44 6c-10 0-17 8-17 18 0 4 1 7 2 10-6 6-10 14-10 24 0 14 11 24 25 24s25-10 25-24c0-10-4-18-10-24 1-3 2-6 2-10 0-10-7-18-17-18z"/>
  <path fill="#fff" d="M44 34c-9 0-15 10-15 23 0 12 7 20 15 20s15-8 15-20c0-13-6-23-15-23z"/>
  <ellipse cx="38.5" cy="22" rx="5" ry="6.5" fill="#fff"/><ellipse cx="49.5" cy="22" rx="5" ry="6.5" fill="#fff"/>
  <circle cx="39.5" cy="23" r="2.4" fill="#1d1d1f"/><circle cx="48.5" cy="23" r="2.4" fill="#1d1d1f"/>
  <path fill="#f2a516" d="M35.5 30.5c4-2.6 13-2.6 17 0-2.6 4.6-14.4 4.6-17 0z"/>
  <ellipse cx="32" cy="82" rx="10" ry="4.6" fill="#f2a516"/><ellipse cx="56" cy="82" rx="10" ry="4.6" fill="#f2a516"/>
</svg>`;

export const download = {
  title: 'Download',
  render: () => `
<h1>Download</h1>

<p>The current release is <b>QuarkSuit 2026</b>. Releases are named after their year. It comes in
three editions with the same features; choose the one for your operating system.</p>

<div class="download-box">
  ${windowsLogo}
  <div>
    <span class="file">QuarkSuit-2026-Windows-Setup.exe</span><br>
    QuarkSuit 2026 for Windows 10 and Windows 11, 64-bit.<br>
    <b>Not available for download yet.</b>
  </div>
</div>

<div class="download-box">
  ${windowsLogo}
  <div>
    <span class="file">QuarkSuit-2026-Windows7-8-Setup.exe</span><br>
    QuarkSuit 2026 for Windows 7 (with Service Pack 1), Windows 8 and Windows 8.1, 64-bit.<br>
    <b>Not available for download yet.</b>
  </div>
</div>

<div class="download-box">
  ${linuxLogo}
  <div>
    <span class="file">QuarkSuit-2026-Ubuntu-amd64.deb</span><br>
    QuarkSuit 2026 for Ubuntu 22.04 or newer (24.04, 26.04 and the releases between them), 64-bit.<br>
    <b>Not available for download yet.</b>
  </div>
</div>

<p>QuarkSuit is free for research, teaching and personal use. There is no macOS version.</p>

<h2 id="requirements">System requirements</h2>
<div class="table-wrap"><table>
  <tr><th>Operating system</th><td>Windows 10 or 11; Windows 7 with Service Pack 1, 8 or 8.1 (their own edition);
  Ubuntu 22.04 or newer. 64-bit (x86-64) only.</td></tr>
  <tr><th>Processor</th><td>Any 64-bit processor. Docking uses every core, so more cores means shorter runs.</td></tr>
  <tr><th>Graphics</th><td>OpenGL 2.0 or newer. On Windows, without a working graphics driver QuarkSuit starts with its
  built-in software renderer (slower, but it works); on Ubuntu the system's own graphics libraries include such a renderer.</td></tr>
  <tr><th>GPU grids (optional)</th><td>A graphics card whose driver includes OpenCL (NVIDIA, AMD, or Intel HD/UHD/Iris). On Ubuntu
  also the OpenCL loader, package <code>ocl-icd-libopencl1</code>.</td></tr>
  <tr><th>Administrator rights</th><td>Windows: not needed; you can install for your own account. Ubuntu: installing a
  package needs <code>sudo</code>.</td></tr>
  <tr><th>Internet</th><td>Not needed to install or run QuarkSuit on Windows. On Ubuntu, <code>apt</code> downloads any of
  the standard system packages QuarkSuit uses that are not installed yet (for example <code>zenity</code>, for file dialogs).</td></tr>
</table></div>

<h2 id="install">Installing on Windows</h2>
<ol>
  <li>Run <code>QuarkSuit-2026-Windows-Setup.exe</code> (on Windows 7, 8 or 8.1:
  <code>QuarkSuit-2026-Windows7-8-Setup.exe</code>).</li>
  <li>Read the licence agreement and accept it.</li>
  <li>Choose the installation folder. Folder names in Arabic or other scripts are fine.</li>
  <li>Optionally tick <span class="ui">Create a desktop shortcut</span>, then click <span class="ui">Install</span>.</li>
</ol>
<p>To uninstall, use <span class="ui">Settings &rsaquo; Apps</span> (Windows 7 and 8: <span class="ui">Control Panel &rsaquo;
Programs and Features</span>) or <span class="ui">Uninstall QuarkSuit 2026</span> in the Start menu. Your own structure
files are never touched.</p>

<h3>What the installer puts on your computer</h3>
<div class="table-wrap"><table>
  <tr><th>File or folder</th><th>Purpose</th></tr>
  <tr><td><code>QuarkSuit.exe</code></td><td>The program.</td></tr>
  <tr><td><code>quarksuit_chem.exe</code></td><td>Chemistry engine (RDKit): file conversion, hydrogens, charges, force fields, descriptors, 2D layout. Runs as a separate process so a failed operation can never close the program.</td></tr>
  <tr><td><code>mesa\\</code></td><td>Software OpenGL renderer, used only when the PC has no working graphics driver.</td></tr>
  <tr><td><code>fonts\\</code>, <code>icons\\</code></td><td>The Amiri font and the menu icons.</td></tr>
  <tr><td><code>licenses\\</code>, <code>THIRD-PARTY-NOTICES.txt</code></td><td>Licence texts of the components QuarkSuit includes.</td></tr>
</table></div>
<p>Settings are kept in <code>%APPDATA%\\QuarkSuit\\settings.ini</code>; crash reports, if any, in
<code>%APPDATA%\\QuarkSuit\\crashes</code>. Nothing else on the system is changed.</p>

<h2 id="install-ubuntu">Installing on Ubuntu</h2>
<ol>
  <li>Open a terminal in the folder that holds <code>QuarkSuit-2026-Ubuntu-amd64.deb</code>.</li>
  <li>Run <code>sudo apt install ./QuarkSuit-2026-Ubuntu-amd64.deb</code>.</li>
  <li>Start <span class="ui">QuarkSuit 2026</span> from the applications menu, or type <code>quarksuit</code> in a terminal.</li>
</ol>
<p>To uninstall, run <code>sudo apt remove quarksuit</code>. Your own structure files are never touched.</p>
<div class="table-wrap"><table>
  <tr><th>File or folder</th><th>Purpose</th></tr>
  <tr><td><code>/opt/quarksuit/</code></td><td>The program (<code>QuarkSuit</code>), its chemistry engine (<code>quarksuit_chem</code>), fonts, icons and licence texts.</td></tr>
  <tr><td><code>/usr/bin/quarksuit</code></td><td>The <code>quarksuit</code> command.</td></tr>
  <tr><td>Menu entry and icons</td><td><code>/usr/share/applications/quarksuit.desktop</code> and <code>/usr/share/icons/hicolor</code>; <code>.qs</code> project files open in QuarkSuit.</td></tr>
</table></div>
<p>Settings are kept in <code>~/.config/QuarkSuit/settings.ini</code>; crash reports, if any, in
<code>~/.local/share/QuarkSuit/crashes</code>.</p>

<h2 id="tutorial-files">Tutorial files</h2>
<p>The input and output files of the <a href="#tutorial">tutorial</a>:</p>
<ul>
  <li><a href="tutorial/files/1STP.pdb">1STP.pdb</a> &ndash; streptavidin with biotin, as distributed by the Protein Data Bank</li>
  <li><a href="tutorial/files/1stp_receptor.pdbqt">1stp_receptor.pdbqt</a>, <a href="tutorial/files/btn_ligand.pdbqt">btn_ligand.pdbqt</a>, <a href="tutorial/files/btn_crystal.pdb">btn_crystal.pdb</a> &ndash; the files the tutorial produces, for comparison</li>
  <li><a href="tutorial/files/imatinib.sdf">imatinib.sdf</a> &ndash; used in the ligand editor section (from the AutoDock Vina examples)</li>
</ul>

<h2 id="licence">Licence</h2>
<p>QuarkSuit is closed-source software owned by its developers at the TCCG Center, University of
Zakho. The licence agreement shown by the installer grants you a free, non-exclusive licence to
install and use it on your own computers for research, education and personal work. In short,
you may not:</p>
<ul>
  <li>sell, rent, lease or sublicense the software;</li>
  <li>remove or change its copyright or licence notices;</li>
  <li>reverse engineer the parts written by the QuarkSuit developers, except where the law allows it;</li>
  <li>distribute modified copies under the QuarkSuit name without written permission.</li>
</ul>
<p>The agreement in the installer is the binding text. Results you obtain with QuarkSuit are
yours; you are responsible for checking them before you rely on them.</p>

<h3>Third-party components</h3>
<p>QuarkSuit includes the components below, each under its own licence (full texts are in the
installation folder).</p>
<div class="table-wrap"><table>
  <tr><th>Component</th><th>Used for</th><th>Licence</th></tr>
  <tr><td>Portions of AutoDock Vina (The Scripps Research Institute)</td><td>Scoring function of the docking engine</td><td>Apache 2.0</td></tr>
  <tr><td>RDKit, with RingDecomposerLib, Boost headers and better-enums</td><td>Chemistry engine</td><td>BSD 3-Clause; Boost 1.0; BSD 2-Clause</td></tr>
  <tr><td>PDBFixer residue templates; OpenMM force-field data</td><td>Rebuilding missing heavy atoms; residue charges</td><td>MIT</td></tr>
  <tr><td>Mesa 3D (llvmpipe), Windows editions only</td><td>Software renderer</td><td>MIT; Apache 2.0 with LLVM exceptions</td></tr>
  <tr><td>Dear ImGui, GLFW, GLAD, stb</td><td>User interface, window and images</td><td>MIT; zlib; MIT; public domain</td></tr>
  <tr><td>Amiri font; Font Awesome Free icons</td><td>Interface text and menu icons</td><td>SIL OFL 1.1; OFL 1.1 and CC BY 4.0</td></tr>
</table></div>
`,
};
