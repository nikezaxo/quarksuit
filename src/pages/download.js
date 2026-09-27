export const download = {
  title: 'Download',
  render: () => `
<h1>Download</h1>

<div class="download-box">
  <svg class="os-logo" viewBox="0 0 88 88" width="52" height="52" role="img" aria-label="Windows"><path fill="#0078d4" d="M0 0h42v42H0zM46 0h42v42H46zM0 46h42v42H0zM46 46h42v42H46z"/></svg>
  <div>
    <a class="file" href="downloads/QuarkSuit-v1-Setup.exe">QuarkSuit-v1-Setup.exe</a><br>
    QuarkSuit v1 (1.0) installer for Windows 10 (version 1903 or later) and Windows 11, 64-bit.<br>
    <span class="small muted">One file; works offline. By downloading you accept the licence below.</span>
  </div>
</div>

<p>QuarkSuit is free for research, teaching and personal use. There is no macOS or Linux
version.</p>

<h2 id="requirements">System requirements</h2>
<div class="table-wrap"><table>
  <tr><th>Operating system</th><td>Windows 10 version 1903 or later, or Windows 11; 64-bit only</td></tr>
  <tr><th>Processor</th><td>Any 64-bit processor. Docking uses every core, so more cores means shorter runs.</td></tr>
  <tr><th>Graphics</th><td>OpenGL 2.0 or newer. Without a working graphics driver QuarkSuit starts with its built-in software renderer (slower, but it works).</td></tr>
  <tr><th>GPU grids (optional)</th><td>A graphics card whose driver includes OpenCL (NVIDIA, AMD, or Intel HD/UHD/Iris).</td></tr>
  <tr><th>Administrator rights</th><td>Not needed; you can install for your own account.</td></tr>
  <tr><th>Internet</th><td>Not needed, for installing or for running.</td></tr>
</table></div>

<h2 id="install">Installing</h2>
<ol>
  <li>Run <code>QuarkSuit-v1-Setup.exe</code>.</li>
  <li>Read the licence agreement and accept it.</li>
  <li>Choose the installation folder. Folder names in Kurdish, Arabic or other scripts are fine.</li>
  <li>Optionally tick <span class="ui">Create a desktop shortcut</span>, then click <span class="ui">Install</span>.</li>
</ol>
<p>To uninstall, use <span class="ui">Settings &rsaquo; Apps</span> in Windows or
<span class="ui">Uninstall QuarkSuit v1</span> in the Start menu. Your own structure files are
never touched.</p>

<h3>What the installer puts on your computer</h3>
<div class="table-wrap"><table>
  <tr><th>File or folder</th><th>Purpose</th></tr>
  <tr><td><code>QuarkSuit.exe</code></td><td>The program.</td></tr>
  <tr><td><code>quarksuit_chem.exe</code></td><td>Chemistry engine (RDKit): file conversion, hydrogens, charges, force fields, descriptors. Runs as a separate process so a failed operation can never close the program.</td></tr>
  <tr><td><code>python\</code></td><td>A private Python 3.12 with RDKit, used only by <span class="ui">Fix Layout</span> in the 2D interaction diagram.</td></tr>
  <tr><td><code>mesa\</code></td><td>Software OpenGL renderer, used only when the PC has no working graphics driver.</td></tr>
  <tr><td><code>icons\</code>, <code>kurdish font\</code></td><td>Menu icons and the Amiri font.</td></tr>
  <tr><td><code>licenses\</code>, <code>THIRD-PARTY-NOTICES.txt</code></td><td>Licence texts of the components QuarkSuit includes.</td></tr>
</table></div>
<p>Settings are kept in <code>%APPDATA%\\QuarkSuit\\settings.ini</code>; crash reports, if any, in
<code>%APPDATA%\\QuarkSuit\\crashes</code>. Nothing else on the system is changed.</p>

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
  <tr><td>Python 3.12, RDKit, NumPy, Pillow</td><td>2D layout (Fix Layout)</td><td>PSF; BSD 3-Clause; MIT-CMU</td></tr>
  <tr><td>Mesa 3D (llvmpipe)</td><td>Software renderer</td><td>MIT; Apache 2.0 with LLVM exceptions</td></tr>
  <tr><td>Dear ImGui, GLFW, GLAD, stb</td><td>User interface, window and images</td><td>MIT; zlib; MIT; public domain</td></tr>
  <tr><td>Amiri font; Font Awesome Free icons</td><td>Interface text and menu icons</td><td>SIL OFL 1.1; OFL 1.1 and CC BY 4.0</td></tr>
</table></div>
`,
};
