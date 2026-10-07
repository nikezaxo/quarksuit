// QuarkSuit v1 documentation: how to use the program and how it works. Chapter ids are
// linked as #documentation/<id>. Equations are MathML, which current browsers draw natively.

const parts = [
  ['Using QuarkSuit', [
    ['d-intro', 'Introduction'],
    ['d-install', 'Installation and files'],
    ['d-start', 'Working in QuarkSuit'],
    ['d-loading', 'Loading structures'],
    ['d-properties', 'The Molecule Properties window'],
    ['d-prep-protein', 'Preparing a protein'],
    ['d-prep-ligand', 'Preparing a ligand'],
    ['d-docking', 'Running a docking'],
    ['d-analysis', 'Analysing docking results'],
    ['d-vis', 'The Visualization workspace'],
    ['d-design', 'Small molecule design'],
    ['d-display', 'Display, pictures and export'],
  ]],
  ['How QuarkSuit works', [
    ['d-architecture', 'How the program is built'],
    ['d-perception', 'Reading structures: bonds, bond orders and charges'],
    ['d-protonation', 'Hydrogens and protonation at a chosen pH'],
    ['d-charges', 'Partial charges'],
    ['d-types', 'AutoDock atom types and the torsion tree'],
    ['d-forcefields', 'Force fields: UFF, MMFF94 and MMFF94s'],
    ['d-minimisation', 'Energy minimisation'],
    ['d-3d', 'Building 3D structures'],
    ['d-repair', 'Rebuilding missing heavy atoms'],
    ['d-score', 'The docking score'],
    ['d-search', 'The docking search'],
    ['d-gpu', 'Energy grids on the graphics card'],
    ['d-rmsd', 'RMSD'],
    ['d-interactions', 'Interaction analysis and the 2D map'],
    ['d-rendering', 'Secondary structure, surfaces and display styles'],
  ]],
  ['Reference', [
    ['d-validation', 'Validation and limits'],
    ['d-trouble', 'Troubleshooting'],
    ['d-glossary', 'Glossary'],
    ['d-refs', 'References'],
  ]],
];
const chapters = parts.flatMap(([, list]) => list);
const head = (id) => {
  const n = chapters.findIndex(c => c[0] === id) + 1;
  return `<h2 id="${id}">${n}. ${chapters[n - 1][1]}</h2>`;
};
const back = '<p class="back"><a href="#documentation/contents">Contents</a></p>';
const link = (id, text) => `<a href="#documentation/${id}">${text || `chapter ${chapters.findIndex(c => c[0] === id) + 1}`}</a>`;
// A displayed equation with its number
const eq = (n, mathml) => `<div class="eq"><math display="block">${mathml}</math><span class="eqn">(${n})</span></div>`;

let first = 1;
const toc = parts.map(([name, list]) => {
  const html = `<p class="toc-part">${name}</p><ol start="${first}">${list.map(([id, t]) => `<li><a href="#documentation/${id}">${t}</a></li>`).join('')}</ol>`;
  first += list.length;
  return html;
}).join('');

export const documentation = {
  title: 'Documentation',
  render: () => `
<h1>QuarkSuit v1 documentation</h1>
<p class="lead">How to use QuarkSuit, and how it works. The first part goes through the program
workspace by workspace. The second explains the methods inside it: how structures are read and
protonated, how partial charges are calculated, how the UFF and MMFF94 force fields and the
minimisers work, how a docking pose is scored and searched for, and how contacts, RMSD and the
pictures are computed. Each method is described as QuarkSuit implements it, with its equations,
parameters and limits.</p>
<p>For a first run through the program, the <a href="#tutorial">tutorial</a> is quicker. Inside
QuarkSuit, <kbd>F1</kbd> opens the <span class="ui">Command Guide</span>, which lists every menu
command with its icon, shortcut and purpose. Resting the pointer on a command, or on the attention
icon (a circled exclamation mark) beside an option, explains it.</p>

<div class="toc" id="contents">
  <p class="toc-title">Contents</p>
  ${toc}
</div>

<!-- ============================================================ PART I -->

${head('d-intro')}
<p>QuarkSuit is a Windows program for structure-based drug design. It reads a protein (the
receptor) and a small molecule or peptide (the ligand), prepares both for docking, predicts how
the ligand binds in a region you choose, and helps you examine, picture and report the result.
Everything runs on your own computer: the docking engine and the chemistry toolkit are part of
the installation, and no internet connection or other program is needed.</p>

<h3>The four workspaces</h3>
<div class="table-wrap"><table>
  <tr><th>Home screen button</th><th>Use it to</th><th>Chapters</th></tr>
  <tr><td><span class="ui">PREPARE STRUCTURES</span></td><td>Remove waters, rebuild missing side-chain atoms, add hydrogens at a chosen pH, relax the geometry, assign partial charges and save docking-ready files.</td><td>${link('d-prep-protein', '6')}, ${link('d-prep-ligand', '7')}</td></tr>
  <tr><td><span class="ui">DOCKING</span></td><td>Load a receptor and a ligand, place the search box, dock, and analyse the poses.</td><td>${link('d-docking', '8')}, ${link('d-analysis', '9')}</td></tr>
  <tr><td><span class="ui">VISUALIZATION</span></td><td>Open any number of structures together, split into chains, ligands, ions and waters; show interactions and 2D maps.</td><td>${link('d-vis', '10')}</td></tr>
  <tr><td><span class="ui">DESIGN SMALL MOLECULES</span></td><td>Draw, edit and minimise small molecules in a linked 2D and 3D editor.</td><td>${link('d-design', '11')}</td></tr>
</table></div>

<h3>A typical project</h3>
<ol>
  <li>Open the receptor in <span class="ui">PREPARE STRUCTURES</span> and read its Molecule Properties report.</li>
  <li>Save the co-crystal ligand if you want it as a reference, delete it and any chains you do not need, then prepare
      the protein (waters, hydrogens at pH 7.4, Gasteiger charges) and save it as PDBQT.</li>
  <li>Prepare the ligand the same way, preferably from an SDF or MOL2 file, and save it as PDBQT.</li>
  <li>In <span class="ui">DOCKING</span>, load both PDBQT files, place the box over the binding site and start the docking.</li>
  <li>Inspect the poses, their contacts and the 2D map; measure the RMSD from a reference ligand; save the complex,
      pictures, the report and the project.</li>
</ol>

<h3>Conventions</h3>
<p>Lengths are in &aring;ngstr&ouml;ms (1&nbsp;&Aring; = 10<sup>&minus;10</sup>&nbsp;m), energies in kcal/mol,
charges in units of the elementary charge <i>e</i>, angles in degrees unless radians are stated. In equations,
<i>r</i> is a distance between atom centres and <i>d</i> a distance between atom surfaces.</p>
${back}

${head('d-install')}
<p>System requirements, the installer and the files it installs are on the <a href="#download">Download</a> page.
QuarkSuit registers <code>.qs</code> project files, so double-clicking one in Explorer opens it.</p>
<h3>Where QuarkSuit keeps its files</h3>
<div class="table-wrap"><table>
  <tr><th>Item</th><th>Location</th></tr>
  <tr><td>Settings: language, theme, window controls, interface size, graphics and docking devices, recent projects</td><td><code>%APPDATA%\\QuarkSuit\\settings.ini</code></td></tr>
  <tr><td>Crash reports</td><td><code>%APPDATA%\\QuarkSuit\\crashes</code></td></tr>
  <tr><td>Temporary chemistry files</td><td>A work folder under your temporary directory, removed when each job ends</td></tr>
</table></div>
<h3>Checking an installation</h3>
<p>From a command prompt in the installation folder, <code>QuarkSuit.exe --selftest</code> checks the chemistry
engine (including paths with non-Latin characters, force-field gradients against numerical derivatives and metal
geometries) and the graphics card's compute driver, without opening the window, and prints the result.
<code>QuarkSuit.exe --gl-info</code> prints the OpenGL renderer in use.</p>
${back}

${head('d-start')}
<h3>The home screen and sessions</h3>
<p><span class="ui">Settings</span> and <span class="ui">About</span> are at the top left, the four workspace
buttons at the right. Opening a workspace starts a fresh session. <span class="ui">File &rsaquo; Home</span> closes
the session: molecules, results, preparation windows and property tabs are cleared. If there is unsaved work,
QuarkSuit asks first; a preparation that is still running is cancelled and its result discarded, while a docking
or minimisation that is still running keeps the workspace open.</p>

<h3>The parts of a workspace</h3>
<dl>
  <dt>Menu bar</dt><dd><span class="ui">File</span>, <span class="ui">Edit</span>, <span class="ui">View</span>,
  <span class="ui">Tools</span> and <span class="ui">Help</span>. The project name is shown at the right, with <code>*</code>
  while there are unsaved changes.</dd>
  <dt>Side panel</dt><dd>The settings of the current task, in numbered sections worked through from the top.</dd>
  <dt>3D view</dt><dd>The molecules, the search box and the interaction lines (${link('d-display')}).</dd>
  <dt>Terminal Output</dt><dd>A log of what QuarkSuit does: files read with atom and bond counts, each preparation
  step, warnings and docking results. Look here first when something is unexpected.</dd>
  <dt>Tool windows</dt><dd>Docking Analysis, the 2D map, Molecule Properties, Style Options, Lighting and others.
  Each can be minimised to a button at the bottom right of the screen.</dd>
</dl>

<h3>Menus</h3>
<div class="table-wrap"><table>
  <tr><th>Menu</th><th>Commands</th></tr>
  <tr><td>File</td><td>New Project <kbd>Ctrl+N</kbd>, Open Project <kbd>Ctrl+O</kbd>, Recent Projects (the last eight opened or saved),
  Save Project <kbd>Ctrl+S</kbd>, Save Project As <kbd>Ctrl+Shift+S</kbd>, Load Protein, Load Ligand, Save Complex As,
  Save Docking Result, Export (3D view, 2D map), Home, Exit. In Visualization: Open Files <kbd>Ctrl+O</kbd>, Open Project,
  Recent Projects, Close All, Save Project, Save Project As.</td></tr>
  <tr><td>Edit</td><td>Undo <kbd>Ctrl+Z</kbd>, Redo <kbd>Ctrl+Y</kbd>, Copy 3D View Image <kbd>Ctrl+Shift+C</kbd>, Copy 2D Map Image,
  Clear Interaction Lines, Colors. In Visualization also the selection commands (${link('d-vis')}).</td></tr>
  <tr><td>View</td><td>Protein Style, Style Options, Protein Color, Ligand Style, Ligand Color, Water Display, Modern Shader,
  Black Outlines, Show Box Faces, Parameters Panel, Terminal Output, Docking Analysis, 2D Interaction Map, Molecule Properties,
  Merge Protein and Ligand Views (Preparation), Reset Camera View, Zoom to Fit, Center on Ligand, View From (front, back, left,
  right, top, bottom), Spin.</td></tr>
  <tr><td>Tools</td><td>Lighting, Background Blur, Interactions, Labels.</td></tr>
  <tr><td>Help</td><td>Command Guide <kbd>F1</kbd>, Settings, About QuarkSuit.</td></tr>
</table></div>

<h3>Projects and undo</h3>
<p>A project file (<code>.qs</code>) stores the molecules with their partial charges, alternate-position labels and
occupancies, the reference ligand, the docking results, the interaction list and every display setting. A project
remembers the workspace it was saved in and always opens there; when that means switching workspace, or when the
open work has unsaved changes, QuarkSuit says so first and offers to save. <span class="ui">Undo</span> and
<span class="ui">Redo</span> cover changes to molecules, results and settings (not the camera); a slider drag or a
box move counts as one step. The Visualization and Small Molecule Design workspaces keep their own undo histories.</p>

<h3>Settings</h3>
<div class="table-wrap"><table>
  <tr><th>Setting</th><th>Choices</th><th>Effect</th></tr>
  <tr><td>Language</td><td>English, Kurdish (Sorani), Arabic</td><td>Menus, panel headers and buttons; Kurdish and Arabic are written right to left.</td></tr>
  <tr><td>Theme</td><td>Dark Modern, Light Clean, Classic, Black &amp; White</td><td>Colours of the interface. The Windows title bar follows: dark or light on Windows 10, the theme's own colour on Windows 11.</td></tr>
  <tr><td>Window controls</td><td>Classic, Modern</td><td>Style of the minimise, maximise and close buttons of the tool windows.</td></tr>
  <tr><td>Interface size</td><td>Match Windows, or 75&ndash;300&nbsp;%</td><td>Size of text and panels, for high-resolution screens. Applies after a restart.</td></tr>
  <tr><td>Graphics GPU</td><td>Automatic, or a named graphics card</td><td>On laptops with two GPUs, the card that draws the window. Applies after a restart.</td></tr>
  <tr><td>Docking engine</td><td>CPU only, GPU, Hybrid (GPU + CPU)</td><td>What builds the receptor energy grids (${link('d-gpu')}). The search always runs on the processor cores.</td></tr>
  <tr><td>GPU device, Test GPU</td><td>The first GPU, or a named OpenCL device</td><td>The device used in GPU and Hybrid modes; Test GPU builds a real grid on it and compares it with the processor's.</td></tr>
</table></div>
${back}

${head('d-loading')}
<p><span class="ui">Load Protein</span> and <span class="ui">Load Ligand</span> (side panel and File menu) check what a
file contains before they load it.</p>
<dl>
  <dt>Load Protein</dt>
  <dd>Accepts a receptor: a structure with at least two amino-acid or nucleotide residues, or, for files without residue
  names, two peptide backbone units recognised from the bonds (N&ndash;C&alpha;&ndash;C(=O)). A whole protein, a binding-site
  extract and a DNA or RNA receptor are accepted. Otherwise the message is <i>Check input file, non-protein residue.</i></dd>
  <dt>Load Ligand</dt>
  <dd>Accepts any molecule that is not a protein: drug-like molecules, peptides, sugars, macrocycles and other large molecules.
  A chain of 30 or more amino acids counts as a protein and is refused with <i>Check input file, protein residue.</i> If the
  file is a protein&ndash;ligand complex, the message lists the ligands in it &mdash; hetero groups (covalently linked hetero
  residues such as a sugar chain are kept together; groups with fewer than two heavy atoms are skipped) and peptide chains
  shorter than 30 residues &mdash; and <span class="ui">Load ligand</span> takes the selected one.</dd>
</dl>

<h3 id="formats">File formats</h3>
<div class="table-wrap"><table>
  <tr><th>Format</th><th>Extensions</th><th>Read</th><th>Written by</th><th>Holds</th></tr>
  <tr><td>Protein Data Bank</td><td><code>.pdb</code>, <code>.ent</code></td><td>yes</td><td>preparation, complex export, editor</td><td>Coordinates, names, residues, B-factors, occupancies; no bond orders, no partial charges.</td></tr>
  <tr><td>AutoDock PDBQT</td><td><code>.pdbqt</code></td><td>yes</td><td>preparation, complex export, editor</td><td>Partial charge (Q) and AutoDock atom type (T) per atom and, for a ligand, the torsion tree. The docking input.</td></tr>
  <tr><td>MDL molfile / SD file</td><td><code>.sdf</code>, <code>.sd</code>, <code>.mol</code></td><td>yes</td><td>preparation, complex export, editor</td><td>Bond orders, formal charges, stereochemistry. QuarkSuit also writes its partial charges and residue names into SDF.</td></tr>
  <tr><td>Tripos MOL2</td><td><code>.mol2</code></td><td>yes</td><td>complex export, editor</td><td>Bond orders, SYBYL types, partial charges and the name of the charge model.</td></tr>
  <tr><td>mmCIF</td><td><code>.cif</code>, <code>.mmcif</code></td><td>yes</td><td>complex export</td><td>Macromolecular structures as distributed by the PDB.</td></tr>
  <tr><td>XYZ</td><td><code>.xyz</code></td><td>yes</td><td>editor</td><td>Elements and coordinates only.</td></tr>
  <tr><td>Gaussian input</td><td><code>.gjf</code></td><td>yes</td><td>&ndash;</td><td>Coordinates and connectivity.</td></tr>
  <tr><td>SMILES, CML</td><td><code>.smi</code>, <code>.cml</code></td><td>editor</td><td>editor</td><td>SMILES has no coordinates.</td></tr>
  <tr><td>QuarkSuit project</td><td><code>.qs</code></td><td>yes</td><td>File menu</td><td>Molecules, results and settings together.</td></tr>
</table></div>
<p>PDB, PDBQT, SDF and GJF files are read directly; MOL2, mmCIF, MOL and XYZ through the chemistry engine (a ligand as SDF,
so bond orders are kept; a receptor as PDB, so residues are kept). From a file with several models (a docking output), the
first is taken. How bonds and bond orders are recovered from files that do not store them is described in
${link('d-perception')}.</p>
<div class="note"><b>Docking needs AutoDock atom types.</b> The docking score reads each atom's AutoDock type, which only a
PDBQT file stores. Dock receptors and ligands prepared by QuarkSuit (or another preparation program) and saved as PDBQT. A
receptor or ligand loaded from PDB, SDF, MOL2 or mmCIF and docked unprepared is scored with bare element types: its oxygen and
nitrogen atoms are then not recognised as hydrogen-bond acceptors, nor its N&ndash;H and O&ndash;H groups as donors
(${link('d-score')}).</div>
${back}

${head('d-properties')}
<p>When a protein or ligand is opened, the <span class="ui">Molecule Properties</span> window opens with one tab per molecule.
Coloured labels at the top summarise the findings (green: fine, orange: needs attention, red: a problem for docking); the
sections below give the details, and pointing at a row explains it. <span class="ui">Copy report</span> copies everything as
text. In the docking and preparation workspaces the tabs follow the loaded molecules and are checked again after a
preparation. Clear <span class="ui">Show when a molecule is opened</span> to stop the window opening by itself;
<span class="ui">View &rsaquo; Molecule Properties</span> opens it at any time. The checks run on a copy in the background, so a
large protein never holds up the program.</p>
<p>The report states only what the file shows. Where a property is not recorded in the file (a charge model, a protonation
state), QuarkSuit says what it measured and why, rather than guessing a name.</p>
<h3>For a protein</h3>
<dl>
  <dt>Overview</dt><dd>PDB entry, title, experimental method and resolution (from the header), atom counts, chains with residue
  ranges, modified residues (MSE, SEP, TPO, PTR), waters, metal and other ions, hetero groups with their centres (a convenient
  place for a docking box), multiple models, mean B-factor, zero-occupancy atoms, and the centre and size of the structure.</dd>
  <dt>Hydrogens</dt><dd>None, polar only, or all, with counts. When the structure has hydrogens, every backbone N&ndash;H and
  side-chain donor (Ser, Thr, Tyr, Trp, Asn, Gln, Arg, Lys, His) is checked, and sites missing hydrogens are listed.</dd>
  <dt>Charges</dt><dd>Whether partial charges are present and their total; the net charge of the protonation states, read from
  the hydrogens when they are present (Lys with three H on N&zeta;, His with H on both ring nitrogens, Asp with no H on its
  oxygens) and otherwise from the usual states at pH 7 (Lys, Arg +1; Asp, Glu &minus;1; His neutral; charged termini); and
  disulfide bonds: cysteine pairs whose sulfurs are within 2.5&nbsp;&Aring;, with SSBOND records that join symmetry copies in the
  crystal noted separately.</dd>
  <dt>Missing atoms and residues</dt><dd>Missing heavy atoms in standard residues, residues not modelled (REMARK 465), sequence
  coverage, chain breaks with their gap length, and alternate positions.</dd>
  <dt>AutoDock atom types</dt><dd>For PDBQT files, the types present and any that the docking score has no parameters for.</dd>
</dl>
<h3>For a ligand</h3>
<dl>
  <dt>Overview</dt><dd>Formula and molecular weight, fragments (a salt gives several; docking needs one), 2D or 3D coordinates,
  overlapping atoms, number of poses in the file, elements without scoring parameters, centre and size.</dd>
  <dt>Hydrogens</dt><dd>The state and counts, and how many polar and non-polar hydrogens are missing: those that adding hydrogens
  would place.</dd>
  <dt>Charges</dt><dd>Formal charge (from the file, or derived from the 3D structure for PDB and PDBQT), partial charges and their
  model (below), and whether the total is a whole number.</dd>
  <dt>Torsion tree</dt><dd>The tree written in a PDBQT file (branches, TORSDOF), the number of torsions the docking will turn, and
  the strict count of rotatable bonds.</dd>
  <dt>Drug-likeness</dt><dd>Wildman&ndash;Crippen logP, topological polar surface area (TPSA), hydrogen-bond donors and acceptors,
  rings, aromatic rings, stereocentres (and how many are unspecified), Lipinski's rule of five (MW &le; 500, logP &le; 5, donors
  &le; 5, acceptors &le; 10) and Veber's rule (&le; 10 rotatable bonds, TPSA &le; 140&nbsp;&Aring;<sup>2</sup>).</dd>
</dl>
<h3 id="charge-model">How a ligand's charge model is recognised</h3>
<p>A MOL2 file names its charge model in its header, and that name is reported. Otherwise QuarkSuit recalculates
Gasteiger&ndash;Marsili charges (${link('d-charges')}) for the same structure and compares them with the file's. A mean
difference of at most 0.01&nbsp;<i>e</i> (largest 0.05) is reported as Gasteiger; up to 0.03&nbsp;<i>e</i> as Gasteiger from another
program, which types a few atoms differently; larger differences as another model (for example AM1-BCC or RESP). If the file's
charges add up to a different total than the structure's formal charge, they belong to another protonation state and no model
is named.</p>
${back}

${head('d-prep-protein')}
<p>Open the protein in <span class="ui">PREPARE STRUCTURES</span>, choose the steps and click <span class="ui">Proceed</span>.
Preparation always works on a copy: the loaded protein changes only when every selected step has succeeded, and a failed or
cancelled job leaves it untouched. A progress window shows each step (it can be minimised), the terminal records counts for
every step, and a summary window reports the result. <span class="ui">Check structure</span> lists the problems the steps
would meet &mdash; missing heavy atoms, repeated atom names, alternate positions, metals, chain breaks, atoms without charges
&mdash; without changing anything.</p>

<h3>The steps</h3>
<dl>
  <dt>Alternate positions (always)</dt><dd>Where a residue has alternate positions, the set with the higher average occupancy is
  kept (A when equal). Coordinates are never averaged or moved, and the log lists the choice for each residue. Repeated atom
  names without alternate-position labels stop preparation.</dd>
  <dt>1. Remove waters</dt><dd>Deletes water molecules (residue names HOH, WAT, H2O, SOL, TIP, TIP3, SPC, DOD).
  <span class="ui">Keep waters bound to metal ions</span> keeps every water whose oxygen is within 3&nbsp;&Aring; of a metal ion: they
  complete the ion's coordination shell as in the crystal.</dd>
  <dt>2. Rebuild missing heavy atoms</dt><dd>Completes standard residues whose side-chain (or carbonyl) atoms are missing, one
  residue at a time, without moving any existing atom (${link('d-repair')}). Rebuilt atoms glow green in the 3D view; pointing
  at one explains what was rebuilt and its closest contacts. Missing loops and termini are not built.</dd>
  <dt>3. Add hydrogens</dt><dd><span class="ui">Polar only (docking)</span> keeps hydrogens on N, O and S and merges the others
  into their carbons (united atoms, the form AutoDock receptors use); <span class="ui">All hydrogens</span> keeps every hydrogen.
  Heavy atoms never move. With <span class="ui">Use selected pH</span>, every existing hydrogen is replaced and each ionisable
  group gets the state its typical p<i>K</i><sub>a</sub> gives at that pH (${link('d-protonation')}); without it, existing
  hydrogens are kept and the rest completed.</dd>
  <dt>4. Minimize geometry</dt><dd>Local relaxation of the whole protein with all its hydrogens, with UFF, MMFF94 or MMFF94s
  (${link('d-forcefields')}), by steepest descent (default), conjugate gradients, steepest descent then conjugate gradients, or
  L-BFGS, for up to 10&ndash;2000 steps (default 50). It stops at the step limit, when the RMS force falls below
  0.01&nbsp;kcal&nbsp;mol<sup>&minus;1</sup>&nbsp;&Aring;<sup>&minus;1</sup>, or when the energy stops falling. Every atom must be
  covered by the force field; there is no fallback and no solvent model. A live panel shows the real coordinates, energy, RMS
  force and the movement of the heavy atoms during the run.</dd>
  <dt>5. Partial charges</dt><dd><span class="ui">Gasteiger</span> (default, any organic structure);
  <span class="ui">Kollman (legacy table; strict)</span>, the united-atom table for polar-hydrogen receptors, which stops with an
  error on any atom it does not cover (unusual residues, cofactors, free termini) instead of mixing models; or
  <span class="ui">Keep externally assigned charges</span> for a receptor prepared elsewhere (all other steps must then be off).
  See ${link('d-charges')}.</dd>
</dl>
<p>After the hydrogens, every atom is given its AutoDock type for docking (${link('d-types')}). With polar hydrogens only, the
charges of the merged non-polar hydrogens are added to their carbons, so the total charge is kept.</p>

<h3 id="metals">Metal ions</h3>
<p>Metal ions &mdash; residues that are a single metal atom, as the PDB writes Zn<sup>2+</sup>, Ca<sup>2+</sup> or
Mg<sup>2+</sup> &mdash; are set aside while hydrogens, types and charges are added to the rest, then restored with unchanged
coordinates and charge 0, as AutoDockTools writes them; no oxidation state is guessed. The protonation that metal binding
requires is applied: a cysteine sulfur within 3.0&nbsp;&Aring; of an ion loses its hydrogen (a thiolate), and a histidine ring
nitrogen within 2.8&nbsp;&Aring; carries no hydrogen, so a hydrogen placed there moves to the other ring nitrogen and the residue
becomes HID or HIE. Minimisation and Kollman charges are refused for a protein with metal ions, since neither models metal
coordination. A metal inside a larger residue (haem iron, an iron&ndash;sulfur cluster) belongs to a cofactor and needs a model
prepared elsewhere.</p>

<h3>Chains and hetero groups</h3>
<p><span class="ui">Protein Chains</span> lists each chain with its residues; the waste-bin icon removes a chain (with its ligands
and waters) or a single residue. <span class="ui">Co-Crystal / Water / Ions</span> lists the hetero groups tagged [L] ligand, [W]
water or [I] ion: the eye hides a group in the view, the waste bin deletes it, the colour box sets its colour. A co-crystal ligand
must be deleted from a receptor before docking; save it separately first if you want it as the RMSD reference.</p>

<h3>Saving</h3>
<div class="table-wrap"><table>
  <tr><th>Format</th><th>Keeps</th><th>Use for</th></tr>
  <tr><td>PDBQT</td><td>Partial charges (three decimals), AutoDock types</td><td>Docking</td></tr>
  <tr><td>SDF</td><td>Bonds, formal charges, and QuarkSuit's record of partial charges, docking types, residue names, alternate labels, occupancies and rebuilt-atom marks</td><td>A master copy QuarkSuit reads back completely</td></tr>
  <tr><td>PDB</td><td>Coordinates, names, B-factors, occupancies; no partial charges or types</td><td>Other programs</td></tr>
</table></div>
${back}

${head('d-prep-ligand')}
<p>Load the ligand in <span class="ui">PREPARE STRUCTURES</span>, preferably from SDF or MOL2, which keep bond orders and
formal charges. With a protein loaded too, the 3D view shows them in two panes side by side, each with its own camera;
<span class="ui">View &rsaquo; Merge Protein and Ligand Views</span> shows them together.</p>
<dl>
  <dt>1. Add hydrogens</dt><dd>Polar only (default) or all hydrogens. <span class="ui">Use selected pH</span> (default pH 7.4) first
  returns every reversibly ionised group to its neutral form, then applies the p<i>K</i><sub>a</sub> rules
  (${link('d-protonation')}), so changing the pH also works on a ligand prepared at another pH. Without it, the input's formal
  charges and hydrogens are kept.</dd>
  <dt>2. Minimize geometry</dt><dd>UFF, MMFF94 (default) or MMFF94s, 10&ndash;2000 steps (default 200), L-BFGS. Where MMFF94 has no
  parameters for an atom (a metal, boron), UFF is used and the log says so. The 3D view replays every step of the minimisation on
  the ligand itself.</dd>
  <dt>3. Assign Gasteiger charges</dt><dd>Gasteiger&ndash;Marsili charges on the complete hydrogen model. The charges must add up to
  the ligand's formal charge (within 0.01&nbsp;<i>e</i> plus a rounding allowance per atom), or the preparation stops.</dd>
</dl>
<p>For PDB and PDBQT ligands, which store no bond orders, the bond orders and formal charges are first derived from the 3D
geometry (${link('d-perception')}). After preparation, the atoms that changed glow on the ligand: green where a hydrogen was added,
orange where one was removed, white-yellow where a formal charge changed (an acid or base step at the chosen pH). Pointing at a glow
explains the change, for example <i>H+ given up at pH 7.40: carboxylic acid, typical pKa 4.4</i>.</p>
${back}

${head('d-docking')}
<p>Open <span class="ui">DOCKING</span> and work down the side panel.</p>

<h3>Inputs</h3>
<p>Load the prepared receptor and ligand, both as PDBQT (see the note in ${link('d-loading')}). The ligand must be one connected
molecule. Its torsion tree is taken from the PDBQT file when the ligand is unchanged since loading; otherwise QuarkSuit builds the
tree from the bonds (${link('d-types')}). The number of torsions is written in the terminal at the start of the run.</p>

<h3>The search box</h3>
<p>The box is the region searched; every atom of every pose lies inside it. <span class="ui">Center</span> and
<span class="ui">Size</span> are in &aring;ngstr&ouml;ms (1&ndash;200&nbsp;&Aring; per side). Drag a field sideways to change it,
double-click it to type a value, or hold <kbd>Shift</kbd> and drag in the 3D view. A hetero group's centre in Molecule Properties
is a good box centre.</p>
<div class="table-wrap"><table>
  <tr><th>Situation</th><th>Size per side</th></tr>
  <tr><td>Known pocket, drug-sized ligand</td><td>18&ndash;22&nbsp;&Aring;</td></tr>
  <tr><td>Known pocket, large or flexible ligand</td><td>22&ndash;30&nbsp;&Aring;</td></tr>
  <tr><td>Uncertain pocket, a region of the protein</td><td>30&ndash;50&nbsp;&Aring;</td></tr>
  <tr><td>Blind docking over a small protein</td><td>50&ndash;90&nbsp;&Aring;; expect long runs</td></tr>
</table></div>

<h3>Parameters</h3>
<div class="table-wrap"><table>
  <tr><th>Parameter</th><th class="num">Range</th><th class="num">Default</th><th>Meaning</th></tr>
  <tr><td>Thoroughness (exhaustiveness)</td><td class="num">1&ndash;200</td><td class="num">8</td><td>Number of independent Monte Carlo searches. Run time grows about in proportion.</td></tr>
  <tr><td>Num Poses</td><td class="num">1&ndash;100</td><td class="num">9</td><td>Most distinct poses to report.</td></tr>
  <tr><td>Score Tolerance (energy range)</td><td class="num">1&ndash;10&nbsp;kcal/mol</td><td class="num">3.0</td><td>How much worse than the best a reported pose may score. An output filter only.</td></tr>
</table></div>
<p>A thoroughness of 8 suits most drug-like ligands with up to about ten rotatable bonds; use 16&ndash;32 for flexible ligands
or results you will publish. If two runs with different settings give clearly different best poses, the search is too short.
The random seeds are fixed, so repeating a run with identical inputs repeats the same search.</p>

<h3 id="auto-exhaustiveness">Thoroughness for large boxes</h3>
<p>A larger box needs more searching. Above 30&nbsp;&times;&nbsp;30&nbsp;&times;&nbsp;30&nbsp;&Aring; (27&nbsp;000&nbsp;&Aring;<sup>3</sup>)
QuarkSuit raises the thoroughness to</p>
${eq(1, `<msub><mi>N</mi><mtext>auto</mtext></msub><mo>=</mo><mi>max</mi><mo stretchy="false">(</mo><mn>8</mn><mo>,</mo><mi>min</mi><mo stretchy="false">(</mo><mn>200</mn><mo>,</mo><mo>&#8968;</mo><mn>8</mn><mfrac><mi>V</mi><mrow><mn>27&#8201;000</mn><mspace width="0.2em"/><msup><mtext>&#197;</mtext><mn>3</mn></msup></mrow></mfrac><mo>&#8969;</mo><mo stretchy="false">)</mo><mo stretchy="false">)</mo>`)}
<p>where <i>V</i> is the box volume, and notes it under the slider. A value you set higher is never lowered; shrinking the box
lowers an automatic value again.</p>
<div class="table-wrap"><table class="plain">
  <tr><th>Cubic box</th><th class="num">Volume (&Aring;<sup>3</sup>)</th><th class="num">Thoroughness</th></tr>
  <tr><td>30&nbsp;&Aring; or smaller</td><td class="num">&le; 27&nbsp;000</td><td class="num">your value</td></tr>
  <tr><td>40&nbsp;&Aring;</td><td class="num">64&nbsp;000</td><td class="num">19</td></tr>
  <tr><td>50&nbsp;&Aring;</td><td class="num">125&nbsp;000</td><td class="num">38</td></tr>
  <tr><td>60&nbsp;&Aring;</td><td class="num">216&nbsp;000</td><td class="num">64</td></tr>
  <tr><td>80&nbsp;&Aring;</td><td class="num">512&nbsp;000</td><td class="num">152</td></tr>
  <tr><td>90&nbsp;&Aring; and larger</td><td class="num">&ge; 729&nbsp;000</td><td class="num">200</td></tr>
</table></div>

<h3>Running</h3>
<p><span class="ui">START DOCKING</span> starts the run. The terminal reports the energy grids (atom types, points, the device
that built them and the time), then the progress of the search. The side panel is locked during the run so that it always shows
what is being docked; the view can still be turned. <span class="ui">CANCEL DOCKING</span> stops the search and keeps the best
poses found so far. At the end the terminal reports the best affinity with its hydrogen-bond, hydrophobic and metal contact counts,
and the <span class="ui">Docking Analysis</span> window opens. What the engine does is described in ${link('d-score')} and
${link('d-search')}.</p>
${back}

${head('d-analysis')}
<h3>Poses</h3>
<p><span class="ui">Docking Analysis</span> lists the poses from best to worst, for example <i>Pose 1 | Final Affinity:
&minus;7.75 kcal/mol</i>. Clicking a pose shows it in the 3D view. A more negative affinity is a stronger predicted binding; how the
value is defined is in ${link('d-score', 'the docking score')}.</p>

<h3>RMSD against a reference ligand</h3>
<p><span class="ui">Load Reference Ligand (co-crystal)</span> takes the experimental position of the ligand. Each pose's heavy-atom
RMSD from it is shown, measured in the receptor frame without superposition. Atoms are paired by chemical structure, not file
order, so a reference written in another atom order, or without hydrogens, is measured correctly, and symmetric groups are matched
the best way (${link('d-rmsd')}).</p>
<div class="table-wrap"><table class="plain">
  <tr><th>Colour</th><th>RMSD</th><th>Meaning</th></tr>
  <tr><td>green</td><td>below 2.0&nbsp;&Aring;</td><td>The pose reproduces the experimental binding mode.</td></tr>
  <tr><td>yellow</td><td>2.0&ndash;3.5&nbsp;&Aring;</td><td>Similar placement with differences.</td></tr>
  <tr><td>red</td><td>3.5&nbsp;&Aring; or more</td><td>A different binding mode.</td></tr>
</table></div>

<h3 id="interactions">Interactions</h3>
<p><span class="ui">Radius</span> (default 4&nbsp;&Aring;) and <span class="ui">Find Interactions</span> list the contacts between the
selected pose and the receptor, most significant first, and draw them in the 3D view. Twelve types are recognised: metal
coordination, unfavourable bump, conventional hydrogen bond, salt bridge, attractive charge, &pi;&ndash;cation, &pi;&ndash;&pi;
stacking, &pi;&ndash;&sigma;, carbon hydrogen bond, &pi;&ndash;alkyl, alkyl and van der Waals; the exact rules are in
${link('d-interactions')}. Raise the radius to 5.5&nbsp;&Aring; to include &pi;-stacking and &pi;&ndash;cation contacts.
<span class="ui">Tools &rsaquo; Interactions</span> sets the line style (beads, dashed, solid or animated flow, the default), width,
glow, outline and the colour of each type, and <span class="ui">Show distances</span> writes each contact's length beside its line.</p>

<h3>The 2D interaction map</h3>
<p><span class="ui">Generate 2D Map</span> draws the pose in two dimensions, surrounded by a card for every residue it touches, with
lines coloured by contact type and a legend. The tabs along the top set the residue cards (size, shape, distance from the ligand,
label font), the ligand (size, rotation, atom labels, ball-and-stick drawing), the lines (width, dashed, dotted or solid, colour by
type or one colour) and the canvas (background, with a one-click white background for figures). <span class="ui">Fix Layout</span>
redraws the ligand as a clean 2D structure (${link('d-interactions')}); it works best when the ligand came from SDF or MOL2.
<span class="ui">Save Image&hellip;</span> saves the map with its legend; <span class="ui">Edit &rsaquo; Copy 2D Map Image</span>
copies it.</p>

<h3>Saving the results</h3>
<dl>
  <dt>File &rsaquo; Save Complex As&hellip;</dt><dd>The receptor with a chosen pose (or the undocked ligand) as PDB, mmCIF, MOL2, SDF or
  PDBQT, to open in other programs.</dd>
  <dt>File &rsaquo; Save Docking Result&hellip;</dt><dd>A plain-text record of the run for a lab notebook or supplementary material:
  input files with atom, heavy-atom and rotatable-bond counts; the box; thoroughness (and whether it was raised automatically), poses
  requested and returned, score tolerance, scoring function and search method, compute device; start and end time, elapsed time,
  processor, threads and total CPU time; and every pose with its affinity, <b>rmsd l.b.</b> and <b>rmsd u.b.</b> from pose 1
  (${link('d-rmsd')}) and, with a reference loaded, its RMSD from the reference.</dd>
</dl>
<pre>  mode |   affinity | rmsd l.b. | rmsd u.b. | RMSD vs ref
       | (kcal/mol) |    (&Aring;)    |    (&Aring;)    |     (&Aring;)
     1 |     -7.750 |     0.000 |     0.000 |       0.674</pre>
${back}

${head('d-vis')}
<p>The Visualization workspace shows any number of structures together. Drag files onto the window or use
<span class="ui">Open files&hellip;</span> (PDB, PDBQT, mmCIF, SDF, MOL2, MOL, XYZ, GJF). A file with several models opens as one
object per model. A QuarkSuit project dropped or opened here opens in its own workspace.</p>
<ul>
  <li>Each object is split into chains, ligands (each hetero residue, or the whole file when it has no amino acids or nucleotides),
  ions and water. The eye shows or hides an object or a part; the waste bin removes an object.</li>
  <li>Click items to select them, <kbd>Ctrl</kbd>+click to add, double-click to zoom to one. The <span class="ui">Edit</span> menu, or
  a right-click on an item, acts on the selection: <span class="ui">Select All</span> <kbd>Ctrl+A</kbd>, <span class="ui">Select</span>
  (all protein chains, all ligands and other molecules, ions, water; <kbd>Ctrl</kbd> adds), <span class="ui">Invert Selection</span>,
  <span class="ui">Clear Selection</span>, <span class="ui">Zoom to Selection</span>, <span class="ui">Show Only Selected</span>,
  <span class="ui">Show Selected</span>, <span class="ui">Hide Selected</span>, <span class="ui">Show All</span> and
  <span class="ui">Delete Selected</span> <kbd>Del</kbd>, which removes the parts from the open structures (not from the files) and
  can be undone.</li>
  <li><span class="ui">Show interactions</span> finds the contacts between the selected ligands and the selected chains (every visible
  chain when none is selected), within the <span class="ui">Contact distance</span>.</li>
  <li><span class="ui">View &rsaquo; 2D Interaction Map</span> first asks for the molecule of interest (a ligand, cofactor or any other
  molecule outside the protein chains) and the neighbours to draw around it: chains, other molecules, ions and water from any open
  file, with the number of residues of each within the contact distance. Every residue, molecule, ion or water molecule of a ticked
  neighbour that touches the molecule of interest gets its own card. The map is rebuilt whenever the structures change.</li>
  <li>Projects saved here keep every object, which parts are shown and the map's choice.</li>
</ul>
${back}

${head('d-design')}
<p><span class="ui">DESIGN SMALL MOLECULES</span> opens the molecule editor: a library on the left, the 2D drawing and the 3D view
side by side, and status and log lines below. Both views show the same molecule; an edit in one appears in the other.</p>
<h3>Menus</h3>
<div class="table-wrap"><table>
  <tr><td>File</td><td>New molecule, Open molecule, Molecule format, Add H on save, Save molecule, Export 2D image, Export 3D image, Image scale, Image format and size, Home.</td></tr>
  <tr><td>Edit</td><td>Undo, Redo, Copy SMILES <kbd>Ctrl+C</kbd>, Paste SMILES <kbd>Ctrl+V</kbd>, Copy 2D image, Copy 3D image, Delete selection, Deselect, Clean 2D, Hydrogens (add all, add polar, remove, show), Fit views, Reset 3D view, 3D style, Atom labels, Atom colors, Background.</td></tr>
  <tr><td>Minimization</td><td>Force field, algorithm, maximum steps and RMS force tolerance; Rebuild 3D from the drawing first; Minimize; Cancel operation; Show last energy graph.</td></tr>
  <tr><td>Help</td><td>Command Guide (<kbd>F1</kbd>), Workspace tips.</td></tr>
</table></div>
<h3>Drawing</h3>
<p>2D tools: <span class="ui">Select / move</span>, <span class="ui">Draw bonds</span>, <span class="ui">Change atom</span>,
<span class="ui">Erase</span> and <span class="ui">Stretch bond</span>. Click empty space to place an atom of the chosen element (any
element of the periodic table) and drag from an atom to add a bonded one; bond angles snap to 30&deg; steps and lengths to
1.5&nbsp;&Aring;, <kbd>Alt</kbd> places freely. Bonds can be single, double, triple or aromatic, and plain, wedged or hashed. The
library holds rings, aromatic systems, functional groups, reference drugs and the 20 amino acids; any SMILES can be inserted, or
pasted with <kbd>Ctrl+V</kbd>. Valence errors are reported and must be fixed before 3D work, minimisation or export.</p>
<h3>Editing in 3D</h3>
<p>3D tools: <span class="ui">Orbit / select</span>, <span class="ui">Move atom</span> (<kbd>Shift</kbd> moves in depth),
<span class="ui">Change atom</span>, <span class="ui">Change bond</span>, <span class="ui">Rotate bond</span> and
<span class="ui">Stretch bond</span>. Selecting an atom on a single bond outside a ring shows two curved arrows that turn its branch
about the neighbouring (gold) atom; <span class="ui">Pivot atom</span> chooses that neighbour. Ring and multiple bonds cannot be
twisted. The 3D view keeps your coordinates; <span class="ui">Clean 2D</span>, <span class="ui">Rebuild 3D</span> and
<span class="ui">Minimize</span> run only when chosen, and Undo reverses them. <span class="ui">Edit &rsaquo; 3D style</span> draws the
3D view in the Docking tab's ligand styles: Spheres, Sticks, Ball &amp; Stick, Glossy Atoms (the default) or Prototype (QuarkSuit).</p>
<h3>Minimisation</h3>
<div class="table-wrap"><table>
  <tr><th>Force field</th><th>Choose it for</th></tr>
  <tr><td>MMFF94 (default)</td><td>Typical drug-like organic molecules.</td></tr>
  <tr><td>MMFF94s</td><td>As MMFF94, with planar delocalised nitrogens; closer to crystal geometries.</td></tr>
  <tr><td>UFF</td><td>Molecules with metals or unusual elements: it covers the whole periodic table. QuarkSuit keeps a metal's coordination geometry (${link('d-forcefields')}).</td></tr>
</table></div>
<p>Defaults: MMFF94, L-BFGS, up to 2000 steps, RMS force tolerance 0.01&nbsp;kcal&nbsp;mol<sup>&minus;1</sup>&nbsp;&Aring;<sup>&minus;1</sup>.
Where MMFF94 has no parameters for an atom, UFF is used and the window says so. A flat drawing is first built into a 3D structure
(${link('d-3d')}). The minimisation window shows the energy of every step, the RMS force and an animation of the moving structure, then
the initial and final energy, why the run stopped, and the heavy-atom movement. The graph can be saved as PNG, JPEG, BMP or SVG and the
steps as CSV. Energies from different force fields are not comparable.</p>
<h3>Saving</h3>
<p>Choose the format under <span class="ui">File &rsaquo; Molecule format</span> (SDF, PDB, PDBQT, MOL2, MOL, XYZ, SMILES, CML), then
<span class="ui">Save molecule</span>. PDBQT is written with Gasteiger charges and a torsion tree, ready for docking. Keep an SDF copy as
the master: it keeps bond orders, charges and stereochemistry.</p>
${back}

${head('d-display')}
<h3>Mouse</h3>
<div class="table-wrap"><table>
  <tr><th>Action</th><th>Control</th></tr>
  <tr><td>Rotate</td><td>Left-drag</td></tr>
  <tr><td>Pan</td><td>Right-drag, or <kbd>Ctrl</kbd> + left-drag</td></tr>
  <tr><td>Zoom</td><td>Mouse wheel</td></tr>
  <tr><td>Move the docking box</td><td><kbd>Shift</kbd> + left-drag (Docking; locked during a run)</td></tr>
  <tr><td>Fit everything shown, or look at the ligand</td><td><span class="ui">View &rsaquo; Zoom to Fit</span>, <span class="ui">Center on Ligand</span></td></tr>
  <tr><td>Look from a side, the top or the bottom</td><td><span class="ui">View &rsaquo; View From</span></td></tr>
  <tr><td>Turn the molecules slowly</td><td><span class="ui">View &rsaquo; Spin</span> (20&deg; per second)</td></tr>
</table></div>
<h3>Styles</h3>
<div class="table-wrap"><table>
  <tr><th>Protein style</th><th>What it shows</th></tr>
  <tr><td>Prototype (QuarkSuit)</td><td>The default. Glass-like sticks sized by element: a bond is as thick as its bigger atom (C&ndash;N a little thicker than C&ndash;C, S and Cl clearly thicker), bonds to hydrogen stay thin (${link('d-rendering')}).</td></tr>
  <tr><td>Rubber Ribbon (Cartoon)</td><td>Secondary structure: helices as coiled ribbons, strands as arrows, loops as tubes.</td></tr>
  <tr><td>Spheres (CPK)</td><td>Every atom as a ball.</td></tr>
  <tr><td>Sticks, Ball &amp; Stick</td><td>Bonds, and atoms as small balls.</td></tr>
  <tr><td>Sausage (Intestine)</td><td>A smooth tube through the C&alpha; atoms.</td></tr>
  <tr><td>Rough Surface (Matte)</td><td>A molecular surface with options for chain colours, detail, softness, sheen, crevice shading and a water coating.</td></tr>
  <tr><td>Translucent Surface</td><td>A see-through envelope.</td></tr>
  <tr><td>Gel Surface (Rubber + Ocean)</td><td>Coloured residues inside a clear shell.</td></tr>
  <tr><td>Ligand Editor (Glossy Atoms)</td><td>The look of the molecule editor's 3D view.</td></tr>
</table></div>
<p>Ligand styles: Ribbon, Spheres, Sticks (default), Ball &amp; Stick, Glossy Atoms and Prototype. Protein colours: CPK atom type, solid,
B-factor, residue type, and charge (assigned partial charges from blue through white to red, &minus;0.5 to +0.5&nbsp;<i>e</i>; grey where
none). Water display: hidden, spheres, ball and stick, sticks. <span class="ui">Style Options</span> holds the settings of the current
style; <span class="ui">Lighting</span> the light's direction, brightness, ambient light, highlights, softness and colours;
<span class="ui">Background Blur</span> a depth-of-field effect; <span class="ui">Labels</span> residue names and atom names or numbers,
optionally only near the ligand.</p>
<h3>Pictures</h3>
<p><span class="ui">File &rsaquo; Export</span> saves the 3D view or the 2D map as PNG (lossless) or JPG. The 3D view is drawn again off
screen at the chosen size, without menus or tool windows: Best (3840&nbsp;&times;&nbsp;2160), High (2560&nbsp;&times;&nbsp;1440), Normal
(1920&nbsp;&times;&nbsp;1080), Medium (1280&nbsp;&times;&nbsp;720) or any custom size up to 8192 pixels a side. <span class="ui">Edit &rsaquo;
Copy 3D View Image</span> puts a picture at the window's size on the clipboard, to paste into a document or slide.</p>
${back}

<!-- ============================================================ PART II -->

${head('d-architecture')}
<p>QuarkSuit is written in C++ and consists of three parts that run on your computer.</p>
<dl>
  <dt>The application (<code>QuarkSuit.exe</code>)</dt><dd>The window, the workspaces, file reading, the 3D drawing (OpenGL 2), the
  docking engine, the interaction analysis and the 2D map. Long tasks run on background threads, so the interface stays responsive.</dd>
  <dt>The chemistry engine (<code>quarksuit_chem.exe</code>)</dt><dd>A separate program for every chemistry operation: format conversion,
  bond-order perception, hydrogens and pH protonation, 2D and 3D coordinates, Gasteiger charges, AutoDock typing and torsion trees, force-field
  minimisation, conformer search and descriptors. It is built on the open-source RDKit toolkit, linked into it. Running it as a separate process
  means a problem in one molecule can never take the application down, and any job can be cancelled at once. The application talks to it
  through files and short progress lines (each minimisation step's energy and coordinates, for example), which is how the live energy graphs
  and animations are drawn from the real calculation.</dd>
  <dt>The structure-repair helper</dt><dd>A small script run by the bundled Python, used only by <span class="ui">Rebuild missing heavy
  atoms</span> (${link('d-repair')}).</dd>
</dl>
<h3>Rules every calculation follows</h3>
<ul>
  <li><b>Work on a copy.</b> Preparation, minimisation and repair work on a private copy of the molecule. The result replaces the molecule only
  when every step succeeded and the molecule was not changed meanwhile; otherwise nothing is applied and the reason is reported.</li>
  <li><b>Check the result.</b> After hydrogens are added, every original heavy atom is matched back by its coordinates; its name, residue,
  chain and B-factor are restored exactly, and a step that moved or lost an atom is rejected. A minimisation must lower the energy and keep
  the atom order; charges must add up to the formal charge.</li>
  <li><b>Fail rather than guess.</b> An atom a force field or charge table does not cover stops the step with the atom named, instead of
  receiving an arbitrary value. Where a choice is a model rather than a fact (a pH state, a rebuilt side chain), the log says so.</li>
  <li><b>Reproducible.</b> Random choices (3D building, the docking search) use fixed seeds, so identical inputs give identical results.</li>
</ul>
${back}

${head('d-perception')}
<h3>Bonds</h3>
<p>PDB and PDBQT files list atoms but usually not their bonds. Two atoms are bonded when their distance is shorter than the sum of their
covalent radii plus 0.45&nbsp;&Aring; (and longer than 0.4&nbsp;&Aring;); radii include C 0.76, N 0.71, O 0.66, S 1.05, P 1.07, H 0.31,
F 0.57, Cl 1.02, Br 1.20, I 1.39&nbsp;&Aring;. CONECT records are read as well. In a PDBQT ligand, bonds are searched only inside each rigid
fragment of the torsion tree, plus the bond named by each BRANCH record, so a close contact across a rotatable bond is never mistaken for a
bond.</p>
<h3>Elements</h3>
<p>The element is read from the PDB element column (77&ndash;78). There, <code>CA</code> is calcium and <code>NA</code> sodium; QuarkSuit
stores them as <code>Ca</code> and <code>Na</code>, so they are never confused with an &alpha;-carbon or the AutoDock acceptor type NA.
Older files without that column are read from the atom name, using the standard names of amino-acid atoms (CB, OG, ND1 &hellip; are carbon,
oxygen, nitrogen) and treating a lone HETATM named after its residue (CA in residue CA) as the metal ion.</p>
<h3 id="bond-orders">Bond orders and formal charges from 3D geometry</h3>
<p>PDB and PDBQT ligands, and XYZ files, carry no bond orders, yet hydrogens, charges, protonation and the torsion tree all depend on them.
QuarkSuit derives them from the geometry with its own implementation of the classical method of Meng &amp; Lewis and Baber &amp; Hodgkin:</p>
<ol>
  <li><b>Hybridisation.</b> An atom with four neighbours is sp<sup>3</sup>. With three, it is sp<sup>2</sup> when the sum of its three
  bond angles exceeds 343&deg; (planar), otherwise sp<sup>3</sup>. With two: sp for a C or N at more than 160&deg;; sp<sup>2</sup> for a C or N
  above 125&deg;, or above 115&deg; with a bond at least 0.06&nbsp;&Aring; shorter than a single bond; otherwise sp<sup>3</sup>. A terminal atom
  is typed by its bond length against reference values (Allen <i>et al.</i>), for example C&ndash;O shorter than 1.30&nbsp;&Aring; is a carbonyl.</li>
  <li><b>Planar rings.</b> In a 5- to 7-membered ring that is flat (no atom more than 0.15&nbsp;&Aring; out of the mean plane) and whose bonds
  are all shorter than single bonds (on average by more than 0.07&nbsp;&Aring;), every carbon and nitrogen is sp<sup>2</sup>.</li>
  <li><b>Fixed groups.</b> Sulfones, sulfonamides and sulfates get S=O double bonds to their shortest terminal oxygens; phosphates P=O;
  a planar nitrogen with two terminal oxygens is a nitro group N<sup>+</sup>(=O)O<sup>&minus;</sup>, with one an N-oxide.</li>
  <li><b>How many &pi; bonds each atom wants.</b> An sp<sup>2</sup> carbon wants one, an sp carbon two, an sp<sup>2</sup> nitrogen with two
  neighbours one; a planar nitrogen with three neighbours may take one by becoming a cation (an iminium or pyridinium N<sup>+</sup>);
  terminal sp<sup>2</sup> oxygen and sulfur want one. Triple bonds are assigned first, between two linear atoms joined by a bond at least
  0.25&nbsp;&Aring; shorter than single.</li>
  <li><b>Double bonds.</b> Within each conjugated group, the double bonds are chosen by a branch-and-bound search that satisfies as many of
  these wishes as possible. Each candidate bond costs twice its excess length over a single bond (so short bonds are preferred), using an
  optional cationic nitrogen costs 3, and leaving a wish unmet costs 10 for carbon, 4 for nitrogen, 5 for oxygen and sulfur.</li>
  <li><b>Metals.</b> Bonds from N, O, S, P and halogens to a metal become dative bonds. A metal-bound O or S with no hydrogen and one single
  bond (thiolate, alkoxide, carboxylate oxygen), or a halide bound only to metals, is made an anion and the metal takes the balancing
  positive charge (at most +3).</li>
  <li><b>Valence charges.</b> Remaining four-connected nitrogens become ammonium (+1), three-connected oxygens oxonium (+1),
  four-connected borons borate (&minus;1). Charges stated in the file are always kept.</li>
</ol>
<p>Standard amino acids and nucleotides keep the bond orders of their residue templates; the method is applied to hetero groups and
unknown residues. Aromatic rings written without the hydrogen of a pyrrole-type nitrogen cannot be given alternating bonds; QuarkSuit then
tries giving that hydrogen to each candidate nitrogen (and then to pairs), starting with the nitrogen whose ring angle is widest, since a
pyrrolic N&ndash;H angle is a few degrees wider than a pyridinic one.</p>
<h3>Stereochemistry</h3>
<p>Stereocentres and double-bond geometry are read from the 3D coordinates, or, for a 2D drawing, from wedge and hash bonds and the
drawn double-bond geometry.</p>
${back}

${head('d-protonation')}
<h3>Adding hydrogens</h3>
<p>Hydrogens are added to every atom whose valence, formal charge and bonds leave room for them, at standard bond lengths and angles. Existing
atoms keep their coordinates and order; new hydrogens follow and inherit their parent atom's residue. They are named by the PDB convention:
<code>H</code> plus the parent's position label, numbered when there are several (Ser OG &rarr; HG, Lys NZ &rarr; HZ1&ndash;HZ3, Asn ND2
&rarr; HD21, HD22, backbone N &rarr; H). Isotope-labelled hydrogens (deuterium, tritium) are never removed. With
<span class="ui">Polar only</span>, hydrogens on carbon are removed after the charges are calculated and their charge added to the carbon.</p>
<h3>Protonation at a chosen pH</h3>
<p>Whether an acid has given up its proton, or a base taken one up, depends on the pH and on the group's acid dissociation constant. By the
Henderson&ndash;Hasselbalch equation, the fraction of an acid in its deprotonated form is</p>
${eq(2, `<msub><mi>f</mi><msup><mtext>A</mtext><mo>&#8722;</mo></msup></msub><mo>=</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><msup><mn>10</mn><mrow><mi>p</mi><msub><mi>K</mi><mi>a</mi></msub><mo>&#8722;</mo><mtext>pH</mtext></mrow></msup></mrow></mfrac>`)}
<p>QuarkSuit gives each group the majority state: an acid is deprotonated when pH &gt; p<i>K</i><sub>a</sub>, a base protonated when
pH &lt; p<i>K</i><sub>a</sub>. Groups are recognised from the bond graph and given representative aqueous p<i>K</i><sub>a</sub> values
(Perrin, Dempsey &amp; Serjeant; CRC Handbook):</p>
<div class="table-wrap"><table>
  <tr><th>Acids</th><th class="num">p<i>K</i><sub>a</sub></th><th>Bases</th><th class="num">p<i>K</i><sub>a</sub></th></tr>
  <tr><td>Sulfonic and sulfuric acids</td><td class="num">&minus;1.0</td><td>Primary amine (aliphatic)</td><td class="num">10.6</td></tr>
  <tr><td>Phosphate / phosphonate OH (1st, 2nd, 3rd)</td><td class="num">2.0, 6.8, 12.3</td><td>Secondary amine</td><td class="num">10.8</td></tr>
  <tr><td>Sulfinic acid</td><td class="num">2.0</td><td>Tertiary amine</td><td class="num">9.8</td></tr>
  <tr><td>&alpha;-Amino carboxylic acid</td><td class="num">2.3</td><td>Guanidine</td><td class="num">13.0</td></tr>
  <tr><td>Carboxylic acid</td><td class="num">4.4</td><td>Amidine</td><td class="num">12.0</td></tr>
  <tr><td>Acylsulfonamide</td><td class="num">4.5</td><td>Imidazole N (benzimidazole)</td><td class="num">6.9 (5.5)</td></tr>
  <tr><td>Tetrazole N&ndash;H</td><td class="num">4.9</td><td>Pyridine-type N (2- or 4-amino: 6.9, 9.2)</td><td class="num">5.2</td></tr>
  <tr><td>Thiophenol</td><td class="num">6.6</td><td>Aniline</td><td class="num">4.6</td></tr>
  <tr><td>Aryl sulfonamide N&ndash;H (alkyl)</td><td class="num">8.5 (10.0)</td><td>Pyrazole, oxazole, thiazole N</td><td class="num">2.5</td></tr>
  <tr><td>Hydroxamic acid</td><td class="num">8.8</td><td>Diazine N</td><td class="num">1.5</td></tr>
  <tr><td>Thiol, imide</td><td class="num">9.5</td><td>Triazole N</td><td class="num">1.2</td></tr>
  <tr><td>Phenol</td><td class="num">10.0</td><td></td><td></td></tr>
</table></div>
<p>An amine's p<i>K</i><sub>a</sub> is lowered by electron-withdrawing groups on its neighbouring carbons: &minus;1.8 for a carbonyl or
imine on the &alpha;-carbon, &minus;2.0 for an O or S on it, &minus;1.2 for a &beta;-oxygen or sulfur (morpholine, 8.4), &minus;0.5 for a
&beta;-nitrogen, and &minus;4.5 for a &beta;-CF<sub>3</sub> (2,2,2-trifluoroethylamine: 10.6 &minus; 4.5 = 6.1; measured 5.7).</p>
<h4>Neighbouring groups</h4>
<p>A charged group makes it harder for a nearby group of the same kind to ionise (like charges repel): piperazine's two nitrogens have
p<i>K</i><sub>a</sub> 9.7 and 5.4, malonic acid's two carboxyls 2.8 and 5.7. QuarkSuit decides the clearest groups first (those whose
p<i>K</i><sub>a</sub> is furthest from the pH), then shifts every later group by each already ionised group of the same kind:</p>
${eq(3, `<mi>p</mi><msub><mi>K</mi><mtext>a,eff</mtext></msub><mo>=</mo><mi>p</mi><msub><mi>K</mi><mi>a</mi></msub><mo>&#177;</mo><munder><mo>&#8721;</mo><mi>j</mi></munder><mi>s</mi><mo stretchy="false">(</mo><msub><mi>n</mi><mi>j</mi></msub><mo stretchy="false">)</mo><mo>,</mo><mspace width="1em"/><mi>s</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo><mo>=</mo><mrow><mo>{</mo><mtable columnalign="left"><mtr><mtd><mn>3.5</mn></mtd><mtd><mi>n</mi><mo>&#8804;</mo><mn>3</mn></mtd></mtr><mtr><mtd><mn>1.5</mn></mtd><mtd><mi>n</mi><mo>&#8804;</mo><mn>5</mn></mtd></mtr><mtr><mtd><mn>0.5</mn></mtd><mtd><mi>n</mi><mo>&#8804;</mo><mn>7</mn></mtd></mtr></mtable></mrow>`)}
<p>where <i>n<sub>j</sub></i> is the number of bonds to ionised group <i>j</i>; the shift raises an acid's p<i>K</i><sub>a</sub> (+) and
lowers a base's (&minus;).</p>
<div class="note"><b>Example: piperazine at pH 7.4.</b> Each nitrogen is a secondary amine (10.8) with two &beta;-nitrogen paths
(2&nbsp;&times;&nbsp;&minus;0.5), so p<i>K</i><sub>a</sub> = 9.8. The first nitrogen is protonated. The second is three bonds away, so its
p<i>K</i><sub>a</sub> becomes 9.8&nbsp;&minus;&nbsp;3.5 = 6.3, below 7.4: it stays neutral. Piperazine is a monocation, as measured.</div>
<p>Before the rules are applied to a ligand, every reversibly ionised group is returned to its neutral form, so the result does not depend on
the input's protonation. Quaternary ammonium ions and charge-separated groups that are neutral overall (nitro, N-oxides) keep their charges.
For a protein, every hydrogen is replaced, and the standard residues come out at pH 7.4 as Asp, Glu and the C-terminus deprotonated, Lys,
Arg and the N-terminus protonated, His, Cys and Tyr neutral. Every decision is written to the preparation log, for example
<i>carboxylic acid at atom 12 (O): pKa ~4.4 -&gt; deprotonated</i>.</p>
<div class="note warn"><b>Limits.</b> These are typical group values, not a prediction for each site in its environment, and not a tautomer or
microstate enumeration. A histidine or a cysteine in a binding site, or a group buried in a protein, can have a very different
p<i>K</i><sub>a</sub>. Check such groups before docking.</div>
${back}

${head('d-charges')}
<p>A partial charge describes how the electrons of a molecule are shared between its atoms. QuarkSuit's docking score does not use partial
charges (${link('d-score')}), but they are written to PDBQT files for programs that do (AutoDock 4-style scoring), are shown by the charge
colouring, and MMFF94 calculates its own during minimisation.</p>
<h3 id="gasteiger">Gasteiger&ndash;Marsili charges</h3>
<p>The method of partial equalisation of orbital electronegativity (Gasteiger &amp; Marsili, 1980) lets charge flow along each bond from the
less to the more electronegative atom, damping the flow at every iteration. The electronegativity of atom <i>i</i> depends on its own
charge:</p>
${eq(4, `<msub><mi>&#967;</mi><mi>i</mi></msub><mo stretchy="false">(</mo><msub><mi>q</mi><mi>i</mi></msub><mo stretchy="false">)</mo><mo>=</mo><msub><mi>a</mi><mi>i</mi></msub><mo>+</mo><msub><mi>b</mi><mi>i</mi></msub><msub><mi>q</mi><mi>i</mi></msub><mo>+</mo><msub><mi>c</mi><mi>i</mi></msub><msubsup><mi>q</mi><mi>i</mi><mn>2</mn></msubsup>`)}
<p>with parameters <i>a</i>, <i>b</i>, <i>c</i> for each element and hybridisation. In iteration <i>k</i> = 1, 2, &hellip; every bond moves
charge</p>
${eq(5, `<mi>&#916;</mi><msubsup><mi>q</mi><mrow><mi>i</mi><mo>&#8594;</mo><mi>j</mi></mrow><mrow><mo stretchy="false">(</mo><mi>k</mi><mo stretchy="false">)</mo></mrow></msubsup><mo>=</mo><mfrac><mrow><msub><mi>&#967;</mi><mi>j</mi></msub><mo>&#8722;</mo><msub><mi>&#967;</mi><mi>i</mi></msub></mrow><msubsup><mi>&#967;</mi><mi>i</mi><mo>+</mo></msubsup></mfrac><msup><mrow><mo stretchy="false">(</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><mo stretchy="false">)</mo></mrow><mi>k</mi></msup><mo>,</mo><mspace width="1em"/><msubsup><mi>&#967;</mi><mi>i</mi><mo>+</mo></msubsup><mo>=</mo><msub><mi>a</mi><mi>i</mi></msub><mo>+</mo><msub><mi>b</mi><mi>i</mi></msub><mo>+</mo><msub><mi>c</mi><mi>i</mi></msub>`)}
<p>from the less electronegative atom <i>i</i> to <i>j</i>, normalised by the electronegativity of the cation of <i>i</i>. The factor
(&frac12;)<sup><i>k</i></sup> makes the series converge; QuarkSuit runs 12 iterations. The calculation starts from the formal charges, so a
charged group keeps its charge, and the total always equals the molecule's formal charge &mdash; which QuarkSuit checks. The method needs
every hydrogen, so charges are always calculated on the complete hydrogen model, and it has parameters for H, B, C, N, O, F, Si, P, S, Cl,
Br and I only: an atom of another element (a metal ion, selenium) stops the calculation with that atom named, except for protein metal ions,
which are set aside and given charge 0 (${link('d-prep-protein', 'chapter 6')}).</p>
<h3>Kollman united-atom charges</h3>
<p>The legacy table of AutoDockTools gives fixed charges to the atoms of the standard amino acids in their polar-hydrogen (united-atom)
form, for example +0.526 and &minus;0.500&nbsp;<i>e</i> on the backbone C and O. QuarkSuit applies it strictly: every atom must match a table
entry by residue and atom name. The table has no entries for free N-termini, unusual residues, cofactors or metals, and any such atom stops
the step with the atoms listed, rather than mixing in another model. It is not an AMBER all-atom assignment.</p>
${back}

${head('d-types')}
<h3>AutoDock atom types</h3>
<p>The AutoDock 4 atom types describe each atom's role in binding. QuarkSuit assigns them in the chemistry engine:</p>
<div class="table-wrap"><table>
  <tr><th>Type</th><th>Atom</th></tr>
  <tr><td>C, A</td><td>Carbon; A when aromatic.</td></tr>
  <tr><td>NA</td><td>Nitrogen with a free lone pair: an acceptor (pyridine-type N, amine, nitrile).</td></tr>
  <tr><td>N</td><td>Nitrogen whose lone pair is not available: cationic, four-connected, or planar three-connected (amide, aniline, pyrrole, sulfonamide).</td></tr>
  <tr><td>OA</td><td>Oxygen (always an acceptor).</td></tr>
  <tr><td>SA, S</td><td>Sulfur: SA for a thioether, thiol or thiolate (two or fewer neighbours, no double bond, or negative); S otherwise (sulfone, sulfonamide).</td></tr>
  <tr><td>HD, H</td><td>Hydrogen on N, O or S (a polar hydrogen, a donor), or on carbon.</td></tr>
  <tr><td>P, F, Cl, Br, I, metals</td><td>The element symbol.</td></tr>
</table></div>
<h3 id="torsion-tree">The torsion tree</h3>
<p>A flexible ligand in PDBQT is written as a tree of rigid fragments joined by rotatable bonds. QuarkSuit's rules:</p>
<ul>
  <li>A bond is <b>rotatable</b> when it is single, not aromatic, not in a ring, not an amide-type bond (C(=O)&ndash;N, C(=S)&ndash;N or an
  amidine C(=N)&ndash;N, which are planar), both its atoms have another neighbour, and turning it moves more than hydrogens on carbon (so a
  methyl rotor is not a torsion, while a hydroxyl or amine rotor is).</li>
  <li>The rigid fragments between rotatable bonds are found, and the <b>root</b> is the fragment whose largest branch holds the fewest
  atoms &mdash; the most central one &mdash; so that no torsion near the middle swings half the molecule.</li>
  <li>The tree is written depth-first (ROOT, BRANCH, ENDBRANCH). <code>TORSDOF</code> counts the torsions with heavy atoms on both sides.</li>
  <li>A ligand of several disconnected fragments (a salt with its counter-ion) is refused: remove the counter-ion first.</li>
</ul>
<p>When the docked ligand is a PDBQT file that has not changed since it was loaded, its own tree is used. Otherwise the tree is built from
the current bonds; for PDB and PDBQT ligands the bond orders are re-derived from the geometry first (${link('d-perception', 'chapter 14')}),
so amide bonds are recognised and stay rigid.</p>
${back}

${head('d-forcefields')}
<p>A force field writes the energy of a molecule as a sum of simple terms over its bonds, angles, torsions and non-bonded pairs, each with
parameters that depend on the atom types:</p>
${eq(6, `<mi>E</mi><mo>=</mo><munder><mo>&#8721;</mo><mtext>bonds</mtext></munder><msub><mi>E</mi><mtext>s</mtext></msub><mo>+</mo><munder><mo>&#8721;</mo><mtext>angles</mtext></munder><msub><mi>E</mi><mtext>b</mtext></msub><mo>+</mo><munder><mo>&#8721;</mo><mtext>torsions</mtext></munder><msub><mi>E</mi><mtext>t</mtext></msub><mo>+</mo><munder><mo>&#8721;</mo><mtext>inversions</mtext></munder><msub><mi>E</mi><mtext>oop</mtext></msub><mo>+</mo><munder><mo>&#8721;</mo><mtext>pairs</mtext></munder><mo stretchy="false">(</mo><msub><mi>E</mi><mtext>vdW</mtext></msub><mo>+</mo><msub><mi>E</mi><mtext>el</mtext></msub><mo stretchy="false">)</mo>`)}
<p>The energy is in kcal/mol and is only meaningful as a difference between geometries of the same molecule in the same force field.
QuarkSuit uses RDKit's implementations of the three force fields below, with every atom typed before the calculation starts: an atom the
force field has no parameters for stops it (except in the molecule editor and ligand preparation, which then use UFF for that molecule
and say so).</p>

<h3>UFF</h3>
<p>The Universal Force Field (Rapp&eacute; <i>et al.</i>, 1992) has parameters for every element, derived from rules rather than fitted to
each compound, so it handles metals and unusual elements, at lower accuracy for organic molecules than MMFF94. Its terms:</p>
${eq(7, `<msub><mi>E</mi><mtext>s</mtext></msub><mo>=</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><msub><mi>k</mi><mrow><mi>i</mi><mi>j</mi></mrow></msub><msup><mrow><mo stretchy="false">(</mo><mi>r</mi><mo>&#8722;</mo><msub><mi>r</mi><mrow><mi>i</mi><mi>j</mi></mrow></msub><mo stretchy="false">)</mo></mrow><mn>2</mn></msup>`)}
${eq(8, `<msub><mi>E</mi><mtext>b</mtext></msub><mo>=</mo><msub><mi>K</mi><mrow><mi>i</mi><mi>j</mi><mi>k</mi></mrow></msub><mo stretchy="false">(</mo><msub><mi>C</mi><mn>0</mn></msub><mo>+</mo><msub><mi>C</mi><mn>1</mn></msub><mi>cos</mi><mi>&#952;</mi><mo>+</mo><msub><mi>C</mi><mn>2</mn></msub><mi>cos</mi><mn>2</mn><mi>&#952;</mi><mo stretchy="false">)</mo><mspace width="1.2em"/><mtext>or</mtext><mspace width="1.2em"/><mfrac><msub><mi>K</mi><mrow><mi>i</mi><mi>j</mi><mi>k</mi></mrow></msub><msup><mi>n</mi><mn>2</mn></msup></mfrac><mo stretchy="false">(</mo><mn>1</mn><mo>&#8722;</mo><mi>cos</mi><mi>n</mi><mi>&#952;</mi><mo stretchy="false">)</mo>`)}
${eq(9, `<msub><mi>E</mi><mtext>t</mtext></msub><mo>=</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>V</mi><mo stretchy="false">(</mo><mn>1</mn><mo>&#8722;</mo><mi>cos</mi><mi>n</mi><msub><mi>&#966;</mi><mn>0</mn></msub><mspace width="0.2em"/><mi>cos</mi><mi>n</mi><mi>&#966;</mi><mo stretchy="false">)</mo><mo>,</mo><mspace width="1.5em"/><msub><mi>E</mi><mtext>oop</mtext></msub><mo>=</mo><mi>K</mi><mo stretchy="false">(</mo><msub><mi>C</mi><mn>0</mn></msub><mo>+</mo><msub><mi>C</mi><mn>1</mn></msub><mi>cos</mi><mi>&#969;</mi><mo>+</mo><msub><mi>C</mi><mn>2</mn></msub><mi>cos</mi><mn>2</mn><mi>&#969;</mi><mo stretchy="false">)</mo>`)}
${eq(10, `<msub><mi>E</mi><mtext>vdW</mtext></msub><mo>=</mo><msub><mi>D</mi><mrow><mi>i</mi><mi>j</mi></mrow></msub><mrow><mo>[</mo><mo>&#8722;</mo><mn>2</mn><msup><mrow><mo>(</mo><mfrac><msub><mi>x</mi><mrow><mi>i</mi><mi>j</mi></mrow></msub><mi>r</mi></mfrac><mo>)</mo></mrow><mn>6</mn></msup><mo>+</mo><msup><mrow><mo>(</mo><mfrac><msub><mi>x</mi><mrow><mi>i</mi><mi>j</mi></mrow></msub><mi>r</mi></mfrac><mo>)</mo></mrow><mn>12</mn></msup><mo>]</mo></mrow>`)}
<p>The natural bond length <i>r<sub>ij</sub></i> is the sum of the atoms' radii with a bond-order correction and an electronegativity
correction; the force constants follow from Badger-like rules. The angle term's coefficients make its minimum fall at the natural angle
&theta;<sub>0</sub> (<i>C</i><sub>2</sub> = 1/(4&nbsp;sin<sup>2</sup>&theta;<sub>0</sub>), <i>C</i><sub>1</sub> = &minus;4<i>C</i><sub>2</sub>&nbsp;cos&theta;<sub>0</sub>).
Trigonal-planar, square-planar and octahedral centres use the second form, with <i>n</i> = 3 (minimum at 120&deg;) or <i>n</i> = 4
(minima at 90&deg; and 180&deg;); a linear centre uses <i>K</i>(1 + cos&nbsp;&theta;), with its minimum at 180&deg;.
The van der Waals term is a Lennard-Jones 12-6 potential with well depth <i>D<sub>ij</sub></i> at distance <i>x<sub>ij</sub></i>. This UFF
has no electrostatic term.</p>
<h4 id="uff-metals">Metals in UFF</h4>
<p>UFF's table gives each metal type one geometry &mdash; nickel only square-planar Ni4+2, gallium only tetrahedral Ga3+3 &mdash; so a
metal complex of another shape would be forced into the wrong one. QuarkSuit records each metal's coordination geometry first: measured
from the 3D structure (donor pairs at more than 150&deg; are <i>trans</i>), or, for a flat drawing, from the bonds and lone pairs of a
main-group metal (Al, Ga, In, Sn, Tl, Pb, Bi) or the usual UFF geometry of the element. It recognises linear, bent, trigonal, T-shaped,
pyramidal, tetrahedral, see-saw, square-planar, trigonal-bipyramidal, square-pyramidal and octahedral centres. The metal then takes its
bond lengths and size from the UFF type of its element closest to that geometry, and every donor&ndash;metal&ndash;donor angle gets UFF's
own angle form for that pair: 180&deg; (<i>n</i> = 1) for <i>trans</i> pairs, 90&deg; for <i>cis</i> pairs, 120&deg; (<i>n</i> = 3) for
trigonal and equatorial pairs, 109.47&deg; for tetrahedral sites, each force constant from UFF's formula at that angle. A trigonal-planar
metal also gets UFF's out-of-plane term for sp<sup>2</sup> carbon, so it stays planar in a strained ring. The force field therefore keeps
the shape the complex has. The minimisation log names each metal's geometry and the type used. A metal drawn as a separate ion, with no bonds
to its donors, cannot be held by a force field without electrostatics; the log says so.</p>

<h3>MMFF94 and MMFF94s</h3>
<p>The Merck Molecular Force Field (Halgren, 1996) was fitted to high-level quantum-chemical calculations and experimental data for organic
and drug-like molecules, and is usually the better choice for them. Its terms, with &Delta;<i>r</i> = <i>r</i> &minus; <i>r</i><sub>0</sub>
(&Aring;) and &Delta;&theta; = &theta; &minus; &theta;<sub>0</sub> (degrees):</p>
${eq(11, `<msub><mi>E</mi><mtext>s</mtext></msub><mo>=</mo><mn>143.9325</mn><mfrac><msub><mi>k</mi><mi>b</mi></msub><mn>2</mn></mfrac><mi>&#916;</mi><msup><mi>r</mi><mn>2</mn></msup><mrow><mo>(</mo><mn>1</mn><mo>+</mo><mi>c</mi><mi>s</mi><mspace width="0.1em"/><mi>&#916;</mi><mi>r</mi><mo>+</mo><mfrac><mn>7</mn><mn>12</mn></mfrac><mi>c</mi><msup><mi>s</mi><mn>2</mn></msup><mi>&#916;</mi><msup><mi>r</mi><mn>2</mn></msup><mo>)</mo></mrow><mo>,</mo><mspace width="1em"/><mi>c</mi><mi>s</mi><mo>=</mo><mo>&#8722;</mo><mn>2</mn><mspace width="0.2em"/><msup><mtext>&#197;</mtext><mrow><mo>&#8722;</mo><mn>1</mn></mrow></msup>`)}
${eq(12, `<msub><mi>E</mi><mtext>b</mtext></msub><mo>=</mo><mn>0.043844</mn><mfrac><msub><mi>k</mi><mi>&#952;</mi></msub><mn>2</mn></mfrac><mi>&#916;</mi><msup><mi>&#952;</mi><mn>2</mn></msup><mo stretchy="false">(</mo><mn>1</mn><mo>+</mo><mi>c</mi><mi>b</mi><mspace width="0.1em"/><mi>&#916;</mi><mi>&#952;</mi><mo stretchy="false">)</mo><mo>,</mo><mspace width="1em"/><mi>c</mi><mi>b</mi><mo>=</mo><mo>&#8722;</mo><mn>0.006981</mn><mspace width="0.2em"/><msup><mtext>deg</mtext><mrow><mo>&#8722;</mo><mn>1</mn></mrow></msup>`)}
${eq(13, `<msub><mi>E</mi><mtext>sb</mtext></msub><mo>=</mo><mn>2.51210</mn><mo stretchy="false">(</mo><msub><mi>k</mi><mrow><mi>i</mi><mi>j</mi><mi>k</mi></mrow></msub><mi>&#916;</mi><msub><mi>r</mi><mrow><mi>i</mi><mi>j</mi></mrow></msub><mo>+</mo><msub><mi>k</mi><mrow><mi>k</mi><mi>j</mi><mi>i</mi></mrow></msub><mi>&#916;</mi><msub><mi>r</mi><mrow><mi>k</mi><mi>j</mi></mrow></msub><mo stretchy="false">)</mo><mi>&#916;</mi><msub><mi>&#952;</mi><mrow><mi>i</mi><mi>j</mi><mi>k</mi></mrow></msub><mo>,</mo><mspace width="1em"/><msub><mi>E</mi><mtext>oop</mtext></msub><mo>=</mo><mn>0.043844</mn><mfrac><msub><mi>k</mi><mtext>oop</mtext></msub><mn>2</mn></mfrac><msup><mi>&#967;</mi><mn>2</mn></msup>`)}
${eq(14, `<msub><mi>E</mi><mtext>t</mtext></msub><mo>=</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><mrow><mo>[</mo><msub><mi>V</mi><mn>1</mn></msub><mo stretchy="false">(</mo><mn>1</mn><mo>+</mo><mi>cos</mi><mi>&#966;</mi><mo stretchy="false">)</mo><mo>+</mo><msub><mi>V</mi><mn>2</mn></msub><mo stretchy="false">(</mo><mn>1</mn><mo>&#8722;</mo><mi>cos</mi><mn>2</mn><mi>&#966;</mi><mo stretchy="false">)</mo><mo>+</mo><msub><mi>V</mi><mn>3</mn></msub><mo stretchy="false">(</mo><mn>1</mn><mo>+</mo><mi>cos</mi><mn>3</mn><mi>&#966;</mi><mo stretchy="false">)</mo><mo>]</mo></mrow>`)}
${eq(15, `<msub><mi>E</mi><mtext>vdW</mtext></msub><mo>=</mo><mi>&#949;</mi><msup><mrow><mo>(</mo><mfrac><mrow><mn>1.07</mn><msup><mi>R</mi><mo>*</mo></msup></mrow><mrow><mi>R</mi><mo>+</mo><mn>0.07</mn><msup><mi>R</mi><mo>*</mo></msup></mrow></mfrac><mo>)</mo></mrow><mn>7</mn></msup><mrow><mo>(</mo><mfrac><mrow><mn>1.12</mn><msup><mi>R</mi><mrow><mo>*</mo><mn>7</mn></mrow></msup></mrow><mrow><msup><mi>R</mi><mn>7</mn></msup><mo>+</mo><mn>0.12</mn><msup><mi>R</mi><mrow><mo>*</mo><mn>7</mn></mrow></msup></mrow></mfrac><mo>&#8722;</mo><mn>2</mn><mo>)</mo></mrow><mo>,</mo><mspace width="1em"/><msub><mi>E</mi><mtext>el</mtext></msub><mo>=</mo><mfrac><mrow><mn>332.0716</mn><mspace width="0.1em"/><msub><mi>q</mi><mi>i</mi></msub><msub><mi>q</mi><mi>j</mi></msub></mrow><mrow><mi>D</mi><mo stretchy="false">(</mo><mi>R</mi><mo>+</mo><mn>0.05</mn><mo stretchy="false">)</mo></mrow></mfrac>`)}
<p>The bond and angle terms are anharmonic (quartic and cubic); the stretch&ndash;bend term couples them; the van der Waals term is
Halgren's buffered 14-7 potential, softer at short range than a 12-6 potential; electrostatics use MMFF94's own bond-charge-increment
charges with a buffered Coulomb law (dielectric <i>D</i> = 1, 1-4 pairs scaled by 0.75). 1-2 and 1-3 pairs are excluded from the
non-bonded terms. <b>MMFF94s</b> differs only in its out-of-plane and torsion parameters for delocalised trivalent nitrogens (amides,
anilines), which it keeps planar, as in crystal structures; MMFF94 lets them pyramidalise as in gas-phase calculations. MMFF94 has no
parameters for most metals and for boron.</p>
<h4>Large molecules</h4>
<p>For more than 2500 atoms (a protein), non-bonded pairs are cut off: at 9&nbsp;&Aring; in MMFF, and at 2.5 times each pair's van der
Waals distance in UFF (10 times for smaller molecules). Setting up MMFF on a protein needs the bond-graph distance between every pair of
atoms; QuarkSuit computes these by breadth-first search instead of a cubic all-pairs algorithm, with identical results (checked by
<code>--selftest</code>), so a protein is set up in seconds.</p>
${back}

${head('d-minimisation')}
<p>Minimisation moves the atoms downhill on the force field's energy surface to the nearest local minimum. It does not search for the
global minimum (other conformations may be lower) and has no solvent: it removes strain, clashes and distorted bonds. QuarkSuit's minimiser
is its own implementation of the standard methods (Nocedal &amp; Wright, <i>Numerical Optimization</i>), driving the force field's analytical
energy and gradient.</p>
<h3>Convergence</h3>
<p>The run has converged when the root-mean-square force on the 3<i>N</i> coordinates falls below the tolerance:</p>
${eq(16, `<msub><mi>F</mi><mtext>rms</mtext></msub><mo>=</mo><msqrt><mrow><mfrac><mn>1</mn><mrow><mn>3</mn><mi>N</mi></mrow></mfrac><munderover><mo>&#8721;</mo><mrow><mi>k</mi><mo>=</mo><mn>1</mn></mrow><mrow><mn>3</mn><mi>N</mi></mrow></munderover><msup><mrow><mo>(</mo><mfrac><mrow><mo>&#8706;</mo><mi>E</mi></mrow><mrow><mo>&#8706;</mo><msub><mi>x</mi><mi>k</mi></msub></mrow></mfrac><mo>)</mo></mrow><mn>2</mn></msup></mrow></msqrt><mo>&lt;</mo><mtext>tolerance</mtext>`)}
<p>It also stops at the step limit, or when the energy has fallen by less than 10<sup>&minus;10</sup> (relative) over the last 50 steps, or
when no lower energy can be found along any direction. The result says which: <i>converged</i>, <i>energy no longer decreases</i>, or
<i>step limit reached; raise Max steps</i>.</p>
<h3>Search directions</h3>
<dl>
  <dt>Steepest descent</dt><dd>Straight down the gradient, <b>d</b> = &minus;<b>g</b>. Robust far from a minimum (a clashing structure),
  slow near one.</dd>
  <dt>Conjugate gradients (Polak&ndash;Ribi&egrave;re+)</dt><dd><b>d</b> = &minus;<b>g</b> + &beta;<b>d</b><sub>prev</sub>, with
  &beta; = max(0, <b>g</b><sup>T</sup>(<b>g</b> &minus; <b>g</b><sub>prev</sub>) / <b>g</b><sub>prev</sub><sup>T</sup><b>g</b><sub>prev</sub>),
  restarted from steepest descent every 3<i>N</i> steps.</dd>
  <dt>Steepest descent, then conjugate gradients</dt><dd>The first fifth of the steps by steepest descent, the rest by conjugate gradients.</dd>
  <dt>L-BFGS (recommended)</dt><dd>A quasi-Newton method that builds an estimate of the inverse Hessian from the last eight steps
  (<b>s</b> = &Delta;<b>x</b>, <b>y</b> = &Delta;<b>g</b>) with the two-loop recursion, scaled by &gamma; = <b>s</b><sup>T</sup><b>y</b> /
  <b>y</b><sup>T</sup><b>y</b>. A pair is stored only if <b>s</b><sup>T</sup><b>y</b> &gt; 0 (positive curvature). Usually the fastest.</dd>
</dl>
<h3>Step length</h3>
<p>Along each direction a backtracking line search accepts the first step that lowers the energy and satisfies the Armijo condition</p>
${eq(17, `<mi>E</mi><mo stretchy="false">(</mo><mi mathvariant="bold">x</mi><mo>+</mo><mi>&#945;</mi><mi mathvariant="bold">d</mi><mo stretchy="false">)</mo><mo>&#8804;</mo><mi>E</mi><mo stretchy="false">(</mo><mi mathvariant="bold">x</mi><mo stretchy="false">)</mo><mo>+</mo><msup><mn>10</mn><mrow><mo>&#8722;</mo><mn>4</mn></mrow></msup><mspace width="0.2em"/><mi>&#945;</mi><mspace width="0.2em"/><msup><mi mathvariant="bold">g</mi><mtext>T</mtext></msup><mi mathvariant="bold">d</mi>`)}
<p>and otherwise shrinks &alpha; to the minimum of a quadratic fitted to the energy along the line, kept between 0.1 and 0.5 times the
previous trial. The first step moves the fastest atom 0.05&nbsp;&Aring;; later steps start from &alpha; = 2&Delta;<i>E</i><sub>prev</sub> /
(&minus;<b>g</b><sup>T</sup><b>d</b>) (L-BFGS from &alpha; = 1), and no atom moves more than 0.3&nbsp;&Aring; in one step. If a remembered
direction finds no lower energy, the search restarts from steepest descent.</p>
<h3>What you see</h3>
<p>The chemistry engine reports the energy and RMS force after every step, and coordinates after selected steps (every one of the first 40,
then more sparsely, and always the last), which the application draws as the energy graph and the animation. These are the real
optimiser coordinates; the animation only replays them at a watchable pace (all frames in about 2.5&nbsp;s, at least 24 per second).
Energies of different force fields are on different scales and cannot be compared.</p>
${back}

${head('d-3d')}
<p>A structure that has no real 3D coordinates &mdash; a 2D drawing, a SMILES string, a 2D file (all atoms in one plane) &mdash; is built
into 3D before it is minimised (a flat structure would stay flat: a planar molecule has no out-of-plane forces). QuarkSuit uses
distance geometry with experimental torsion-angle preferences (ETKDG version 3; Wang <i>et al.</i>, 2020):</p>
<ol>
  <li>Every missing hydrogen is added and the metal geometries are recorded from the drawing.</li>
  <li>Several conformers are embedded: min(30, 8 + 2&nbsp;&times;&nbsp;rotatable bonds), fewer for very large molecules, whose
  embedding costs grow with the cube of the atom count (about 0.07&nbsp;s for ibuprofen, 6&nbsp;s for &beta;-cyclodextrin), so the total
  stays within about 30&nbsp;s on one core. Conformers within 0.1&nbsp;&Aring; RMSD of another are discarded. Stereocentres are enforced
  from the drawing's wedge and hash bonds.</li>
  <li>For a metal complex, the donor&ndash;donor distances are set from the recorded coordination geometry (by the law of cosines on the
  metal&ndash;donor bond lengths), since the default bounds assume one angle for every donor pair and cannot place <i>trans</i> donors.</li>
  <li>Disconnected fragments (a counter-ion, a separately drawn metal ion) would all land on the origin, on top of each other; they are set
  around the largest fragment, each 3.5&nbsp;&Aring; clear of what is already placed.</li>
  <li>Each conformer is relaxed with MMFF94 (UFF where MMFF94 has no parameters) and the lowest-energy one is kept, so rings come out in their
  low-energy form (a chair, not a twist-boat).</li>
</ol>
<p>The fixed random seed makes the result the same on every computer. The molecule editor's <span class="ui">Clean 2D</span> computes new
2D drawing coordinates only; it never changes the 3D structure.</p>
${back}

${head('d-repair')}
<p>Crystal structures often lack the outer atoms of flexible side chains. <span class="ui">Rebuild missing heavy atoms</span> completes the
20 standard amino acids (and their protonation-state names HID, HIE, HIP, ASH, GLH, CYX, CYM, LYN), one residue at a time:</p>
<ol>
  <li><b>Internal coordinates.</b> Each missing atom is placed from three atoms already present, using the bond length, bond angle and
  dihedral of the standard residue template (the NeRF construction; Parsons <i>et al.</i>, 2005). A missing backbone oxygen is placed in the
  peptide plane when the next residue's nitrogen is present.</li>
  <li><b>Side-chain dihedrals.</b> The free dihedrals &chi; take the staggered values 60&deg;, 180&deg; and 300&deg; (30&deg; steps for
  planar end groups: Asp and Asn &chi;<sub>2</sub>, Glu and Gln &chi;<sub>3</sub>, aromatic &chi;<sub>2</sub>, Arg &chi;<sub>4</sub>). The
  combination with the fewest heavy-atom contacts with the rest of the structure (and, in a second sweep, with other rebuilt residues) is
  kept and refined locally. No force field is used.</li>
  <li><b>Acceptance.</b> A residue is accepted only if its rebuilt bonds are within 0.12&nbsp;&Aring; of the template, angles within 25&deg;,
  the chirality of C&alpha; (and of Thr and Ile C&beta;) is right, and no rebuilt atom comes closer than 2.2&nbsp;&Aring; to another non-bonded
  heavy atom. Otherwise a superposition of the whole template on the residue's present atoms is tried; if that fails too, the residue is left
  as it was and the reason is reported. Every other residue is still completed.</li>
</ol>
<p>Existing atoms never move. Not rebuilt: residues without N, C&alpha; and C; residues within 4&nbsp;&Aring; of a metal ion; a cysteine sulfur
when another cysteine's C&beta; is within 4.6&nbsp;&Aring; (a possible disulfide); non-standard residues; whole missing residues and loops; the
terminal OXT. Tested by deleting 40 random side chains from complete crystal structures and rebuilding them: bond lengths came out within
0.07&nbsp;&Aring; of the crystal, no contact closer than 2.7&nbsp;&Aring;, and &chi;<sub>1</sub> within 40&deg; of the crystal for 31 of 40
(1HSG) and 34 of 37 (6LU7) residues. A rebuilt side chain is a plausible model, not an experimental conformation: check those that line
the binding site.</p>
${back}

${head('d-score')}
<p>A docking score estimates the binding free energy of a pose, fast enough to evaluate millions of times. QuarkSuit uses the empirical
scoring function of AutoDock Vina (Trott &amp; Olson, 2010; Eberhardt <i>et al.</i>, 2021): a sum of distance-dependent terms between atom
pairs, whose weights were fitted to experimental binding affinities of protein&ndash;ligand complexes. It uses atom types and geometry only;
partial charges are not part of it.</p>
<h3>Atom typing</h3>
<p>Every heavy atom is given a van der Waals radius and three flags from its AutoDock type (${link('d-types')}). Hydrogens are not scored;
polar hydrogens only decide which atoms donate.</p>
<div class="table-wrap"><table>
  <tr><th>Atom</th><th class="num">Radius <i>R</i> (&Aring;)</th><th>Hydrophobic</th><th>Donor</th><th>Acceptor</th></tr>
  <tr><td>C, A</td><td class="num">1.9</td><td>yes, unless bonded to N, O, P or S</td><td></td><td></td></tr>
  <tr><td>N, NA</td><td class="num">1.8</td><td></td><td>if bonded to an HD</td><td>NA</td></tr>
  <tr><td>O, OA</td><td class="num">1.7</td><td></td><td>if bonded to an HD</td><td>OA</td></tr>
  <tr><td>S, SA</td><td class="num">2.0</td><td></td><td></td><td>SA</td></tr>
  <tr><td>P</td><td class="num">2.1</td><td></td><td></td><td></td></tr>
  <tr><td>F, Cl, Br, I</td><td class="num">1.5, 1.8, 2.0, 2.2</td><td>yes</td><td></td><td></td></tr>
  <tr><td>Zn, Fe, Mg, Mn, Ca, Cu, Co, Ni, Na, K</td><td class="num">1.2</td><td></td><td>yes</td><td></td></tr>
</table></div>
<p>A metal counts as a hydrogen-bond donor, as in Vina, so a metal&ndash;acceptor contact is rewarded by the hydrogen-bond term; there is
no directional metal-coordination model.</p>
<h3>The pair terms</h3>
<p>For a ligand atom <i>i</i> and a receptor atom <i>j</i> at distance <i>r<sub>ij</sub></i> &lt; 8&nbsp;&Aring;, the terms depend on the
<i>surface distance</i></p>
${eq(18, `<msub><mi>d</mi><mrow><mi>i</mi><mi>j</mi></mrow></msub><mo>=</mo><msub><mi>r</mi><mrow><mi>i</mi><mi>j</mi></mrow></msub><mo>&#8722;</mo><msub><mi>R</mi><mi>i</mi></msub><mo>&#8722;</mo><msub><mi>R</mi><mi>j</mi></msub>`)}
<p>which is zero when the two atoms just touch. The pair energy is</p>
${eq(19, `<mi>e</mi><mo stretchy="false">(</mo><mi>d</mi><mo stretchy="false">)</mo><mo>=</mo><msub><mi>w</mi><mn>1</mn></msub><msup><mi>e</mi><mrow><mo>&#8722;</mo><msup><mrow><mo stretchy="false">(</mo><mi>d</mi><mo>/</mo><mn>0.5</mn><mo stretchy="false">)</mo></mrow><mn>2</mn></msup></mrow></msup><mo>+</mo><msub><mi>w</mi><mn>2</mn></msub><msup><mi>e</mi><mrow><mo>&#8722;</mo><msup><mrow><mo stretchy="false">(</mo><mo stretchy="false">(</mo><mi>d</mi><mo>&#8722;</mo><mn>3</mn><mo stretchy="false">)</mo><mo>/</mo><mn>2</mn><mo stretchy="false">)</mo></mrow><mn>2</mn></msup></mrow></msup><mo>+</mo><msub><mi>w</mi><mn>3</mn></msub><msup><mi>d</mi><mn>2</mn></msup><msub><mo>|</mo><mrow><mi>d</mi><mo>&lt;</mo><mn>0</mn></mrow></msub><mo>+</mo><msub><mi>w</mi><mn>4</mn></msub><msub><mi>h</mi><mtext>phob</mtext></msub><mo stretchy="false">(</mo><mi>d</mi><mo stretchy="false">)</mo><mo>+</mo><msub><mi>w</mi><mn>5</mn></msub><msub><mi>h</mi><mtext>hb</mtext></msub><mo stretchy="false">(</mo><mi>d</mi><mo stretchy="false">)</mo>`)}
<div class="table-wrap"><table>
  <tr><th>Term</th><th>Form</th><th class="num">Weight</th><th>Describes</th></tr>
  <tr><td>gauss 1</td><td>exp(&minus;(<i>d</i>/0.5&nbsp;&Aring;)<sup>2</sup>)</td><td class="num">&minus;0.0356</td><td>Close steric contact</td></tr>
  <tr><td>gauss 2</td><td>exp(&minus;((<i>d</i> &minus; 3&nbsp;&Aring;)/2&nbsp;&Aring;)<sup>2</sup>)</td><td class="num">&minus;0.00516</td><td>Longer-range steric contact</td></tr>
  <tr><td>repulsion</td><td><i>d</i><sup>2</sup> when <i>d</i> &lt; 0, else 0</td><td class="num">+0.840</td><td>Overlap</td></tr>
  <tr><td>hydrophobic</td><td>1 for <i>d</i> &lt; 0.5&nbsp;&Aring;, 0 for <i>d</i> &gt; 1.5&nbsp;&Aring;, linear between; both atoms hydrophobic</td><td class="num">&minus;0.0351</td><td>Hydrophobic contact</td></tr>
  <tr><td>hydrogen bond</td><td>1 for <i>d</i> &lt; &minus;0.7&nbsp;&Aring;, 0 for <i>d</i> &gt; 0, linear between; donor with acceptor</td><td class="num">&minus;0.587</td><td>Hydrogen bond</td></tr>
</table></div>
<div class="note"><b>Example.</b> A ligand carbonyl oxygen (OA, <i>R</i> = 1.7) 2.8&nbsp;&Aring; from a serine hydroxyl oxygen that carries
a polar hydrogen (a donor, <i>R</i> = 1.7): <i>d</i> = 2.8 &minus; 3.4 = &minus;0.6&nbsp;&Aring;. gauss&nbsp;1 = e<sup>&minus;1.44</sup> = 0.237,
gauss&nbsp;2 = e<sup>&minus;3.24</sup> = 0.039, repulsion = 0.36, hydrogen bond = 0.6/0.7 = 0.857. The pair energy is
&minus;0.0084 &minus; 0.0002 + 0.3025 &minus; 0.5035 = &minus;0.210&nbsp;kcal/mol. Two aromatic carbons 4.0&nbsp;&Aring; apart (<i>d</i> =
0.2&nbsp;&Aring;) give &minus;0.066; the same carbons at 3.0&nbsp;&Aring; (<i>d</i> = &minus;0.8&nbsp;&Aring;) give +0.500, a clash.</div>

<h3>The energy of a pose</h3>
<p>The intermolecular energy sums the pair energy over every ligand heavy atom and every receptor heavy atom within 8&nbsp;&Aring;. The search
also scores the ligand's internal energy with the same function, over pairs of ligand heavy atoms more than three bonds apart (pairs inside one
rigid fragment add a constant and are left out), and a penalty of 10<sup>6</sup>&nbsp;kcal&nbsp;mol<sup>&minus;1</sup>&nbsp;&Aring;<sup>&minus;1</sup>
times the distance by which any atom leaves the box. The result is divided by a term that grows with the ligand's flexibility, which
approximates the conformational entropy lost on binding:</p>
${eq(20, `<mi>D</mi><mo>=</mo><mn>1</mn><mo>+</mo><msub><mi>w</mi><mtext>rot</mtext></msub><msub><mi>N</mi><mtext>rot</mtext></msub><mo>,</mo><mspace width="1em"/><msub><mi>w</mi><mtext>rot</mtext></msub><mo>=</mo><mn>0.0585</mn><mo>,</mo><mspace width="1em"/><msub><mi>N</mi><mtext>rot</mtext></msub><mo>=</mo><munder><mo>&#8721;</mo><mtext>torsions</mtext></munder><mfrac><mn>1</mn><mn>2</mn></mfrac><mo stretchy="false">(</mo><mo stretchy="false">[</mo><msub><mi>h</mi><mi>a</mi></msub><mo>&gt;</mo><mn>1</mn><mo stretchy="false">]</mo><mo>+</mo><mo stretchy="false">[</mo><msub><mi>h</mi><mi>b</mi></msub><mo>&gt;</mo><mn>1</mn><mo stretchy="false">]</mo><mo stretchy="false">)</mo>`)}
<p>where <i>h<sub>a</sub></i> and <i>h<sub>b</sub></i> are the numbers of heavy neighbours of the torsion's two atoms: a torsion inside the
chain counts 1, one that only turns a terminal group (OH, NH<sub>2</sub>, SH, CH<sub>3</sub>) counts &frac12;, as in Vina. For example a ligand
with four internal torsions has <i>D</i> = 1.234, so an intermolecular energy of &minus;10 becomes &minus;8.10&nbsp;kcal/mol.</p>
<h3>The reported affinity</h3>
<p>The poses are ranked by their full energy <i>E<sub>k</sub></i> = (<i>I<sub>k</sub></i> + <i>J<sub>k</sub></i>) / <i>D</i>, where
<i>I</i> is the intermolecular and <i>J</i> the internal energy. The affinity reported for pose <i>k</i> is, as in Vina 1.2,</p>
${eq(21, `<msub><mi>A</mi><mi>k</mi></msub><mo>=</mo><mfrac><mrow><msub><mi>I</mi><mi>k</mi></msub><mo>+</mo><msub><mi>J</mi><mi>k</mi></msub><mo>&#8722;</mo><msub><mi>J</mi><mn>1</mn></msub></mrow><mi>D</mi></mfrac>`)}
<p>so pose 1 shows its intermolecular score, and every other pose also carries its internal strain relative to pose 1: a strained pose
cannot outrank a relaxed one, and the list stays in the order of the energy the search minimised. The final poses are scored with the exact
pair sums, not the grids.</p>
<div class="note"><b>Differences from AutoDock Vina 1.2's typing.</b> QuarkSuit also treats the AutoDock types SA, NS and OS as acceptors,
where Vina treats only OA and NA as acceptors; and it makes a carbon polar (not hydrophobic) only when it is bonded to N, O, P or S, where
Vina also counts halogens and metals. On poses without such atoms in contact, QuarkSuit gives the same affinity as Vina 1.2.</div>
${back}

${head('d-search')}
<p>Docking searches for the pose &mdash; position, orientation and torsion angles &mdash; with the lowest score. A pose has 6 +
<i>N</i><sub>tors</sub> degrees of freedom: a translation of the ligand's centre, a rotation (stored as a unit quaternion), and one angle per
rotatable bond. QuarkSuit's search follows the Monte Carlo method of AutoDock Vina.</p>
<h3>1. The receptor's energy grids</h3>
<p>The receptor's contribution to the energy of a ligand atom depends only on the atom's position and on its four properties (radius,
hydrophobic, donor, acceptor). For every distinct combination present in the ligand, QuarkSuit precomputes that energy on a cubic lattice
of 0.375&nbsp;&Aring; spacing covering the box plus 2&nbsp;&Aring; on every side. A ligand atom's receptor energy, and its gradient, then come
from trilinear interpolation between the eight surrounding lattice points instead of a sum over receptor atoms. Filling a lattice point sums
the pair energy over the receptor atoms within 8&nbsp;&Aring;, found through cells 8&nbsp;&Aring; wide; only receptor atoms within 8&nbsp;&Aring;
of the box are used at all. The grids are built on all processor cores, or on the graphics card (${link('d-gpu')}). A 22&nbsp;&Aring; box
gives 71&nbsp;&times;&nbsp;71&nbsp;&times;&nbsp;71 points per atom type.</p>
<h3>2. Independent searches</h3>
<p>The thoroughness <i>N</i> sets the number of independent Monte Carlo searches; they run in parallel on all processor cores and share
nothing but the results. Search 0 starts with the ligand at the box centre in its input orientation; the others start at a random point in the
box with a random orientation. All start with random torsion angles. Each search has its own random number generator with a fixed seed.</p>
<h3>3. Monte Carlo steps</h3>
<p>Each step changes the current pose in one way, chosen at random:</p>
<ul>
  <li>move it by a random vector inside a sphere of radius 2&nbsp;&Aring; (kept inside the box);</li>
  <li>turn it about a random axis by up to 2/<i>R</i><sub>g</sub> radians, where <i>R</i><sub>g</sub> is the ligand's radius of gyration;</li>
  <li>or give one torsion a new random angle between &minus;&pi; and &pi;.</li>
</ul>
<p>The changed pose is then minimised locally (below), and accepted by the Metropolis criterion at temperature <i>T</i> = 1.2:</p>
${eq(22, `<msub><mi>P</mi><mtext>accept</mtext></msub><mo>=</mo><mi>min</mi><mrow><mo>(</mo><mn>1</mn><mo>,</mo><msup><mi>e</mi><mrow><mo>&#8722;</mo><mo stretchy="false">(</mo><msub><mi>E</mi><mtext>new</mtext></msub><mo>&#8722;</mo><msub><mi>E</mi><mtext>current</mtext></msub><mo stretchy="false">)</mo><mo>/</mo><mi>T</mi></mrow></msup><mo>)</mo></mrow>`)}
<p>so the search always goes downhill and sometimes uphill, which lets it leave a local minimum. Each search runs</p>
${eq(23, `<mi>S</mi><mo>=</mo><mi>max</mi><mrow><mo>(</mo><mn>2000</mn><mo>,</mo><mo>&#8970;</mo><mfrac><mrow><mn>70</mn><mo>&#183;</mo><mn>3</mn><mo>&#183;</mo><mo stretchy="false">(</mo><mn>50</mn><mo>+</mo><mi>M</mi><mo>+</mo><mn>10</mn><mo stretchy="false">(</mo><mn>6</mn><mo>+</mo><msub><mi>N</mi><mtext>tors</mtext></msub><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mrow><mn>2</mn></mfrac><mo>&#8971;</mo><mo>)</mo></mrow>`)}
<p>steps, where <i>M</i> is the number of movable atoms (heavy atoms and polar hydrogens), as in Vina. For a ligand with 24 heavy atoms, 2 polar
hydrogens and 6 torsions, <i>S</i> = 20&nbsp;580; with thoroughness 8 the run makes about 165&nbsp;000 Monte Carlo steps, each followed by a
local minimisation.</p>
<h3>4. Local minimisation</h3>
<p>Every pose is minimised with BFGS in the 6 + <i>N</i><sub>tors</sub> pose coordinates, with analytical gradients. The derivative of the
energy with respect to the translation is the sum of the atomic gradients; with respect to the rotation, the torque about the rotation centre;
and with respect to torsion <i>k</i>, the torque about its bond axis <b>&acirc;</b><sub><i>k</i></sub> of the atoms it moves:</p>
${eq(24, `<mfrac><mrow><mo>&#8706;</mo><mi>E</mi></mrow><mrow><mo>&#8706;</mo><msub><mi>&#952;</mi><mi>k</mi></msub></mrow></mfrac><mo>=</mo><munder><mo>&#8721;</mo><mrow><mi>i</mi><mo>&#8712;</mo><mtext>moved</mtext><mo stretchy="false">(</mo><mi>k</mi><mo stretchy="false">)</mo></mrow></munder><msub><mover><mi mathvariant="bold">a</mi><mo>^</mo></mover><mi>k</mi></msub><mo>&#183;</mo><mrow><mo>(</mo><mo stretchy="false">(</mo><msub><mi mathvariant="bold">x</mi><mi>i</mi></msub><mo>&#8722;</mo><msub><mi mathvariant="bold">o</mi><mi>k</mi></msub><mo stretchy="false">)</mo><mo>&#215;</mo><msub><mo>&#8711;</mo><mi>i</mi></msub><mi>E</mi><mo>)</mo></mrow>`)}
<p>The BFGS step uses a backtracking line search (Armijo constant 10<sup>&minus;4</sup>, up to ten halvings of the step), the standard
inverse-Hessian update, and stops when |<b>g</b>| &lt; 10<sup>&minus;5</sup> or after max(8, &lfloor;(25 + <i>M</i>)/3&rfloor;) steps. While a
changed pose is minimised, large energies are softened (Vina's &ldquo;hunt cap&rdquo;): a positive atom or pair energy <i>e</i> becomes
<i>e</i>&middot;<i>v</i>/(<i>v</i> + <i>e</i>) with <i>v</i> = 10, so one bad clash cannot dominate the direction. A pose worth keeping is
minimised again with the true energies.</p>
<h3>5. Keeping the minima</h3>
<p>Each search keeps as many distinct low minima as poses are requested. A new minimum within 1&nbsp;&Aring; (heavy-atom RMSD) of a kept one
replaces it only if lower; otherwise it is added, or replaces the highest once the store is full. When all searches have finished, their
minima are pooled and sorted, the best max(3&nbsp;&times;&nbsp;poses, 20) are minimised once more with exact receptor sums instead of the grids,
and all are scored exactly.</p>
<h3>6. Selecting the poses</h3>
<ol>
  <li>Poses scoring worse than the best plus the score tolerance are dropped.</li>
  <li>The rest are clustered by heavy-atom RMSD: a pose is kept only if it differs from every pose already kept. The threshold starts at
  2.0&nbsp;&Aring;, so the reported poses are genuinely different binding modes; when that yields fewer poses than requested it is tightened step by
  step (1.5, 1.0, 0.7, 0.5, 0.3, 0.15, 0.05&nbsp;&Aring;), so a narrow energy window still gives the requested number of closely related poses.</li>
  <li>The affinities are calculated by equation (21) and the poses listed best first.</li>
</ol>
${back}

${head('d-gpu')}
<p>Building the energy grids is the part of a docking run that suits a graphics card: millions of lattice points, each an independent sum
over nearby receptor atoms. In <span class="ui">GPU</span> mode QuarkSuit builds them with OpenCL, the compute interface every NVIDIA, AMD
and Intel driver provides, one lattice layer of one atom type at a time; in <span class="ui">Hybrid</span> mode the graphics card and the
processor cores fill the layers together, each taking the next unfinished one, so neither waits for the other. The kernel evaluates exactly
the same pair energy as the processor code. The Monte Carlo search itself always runs on the processor cores.</p>
<p>QuarkSuit first checks the GPU driver in a separate helper process, because a faulty OpenCL driver can crash the program that loads it.
If the card cannot be used, or fails during the build, the processor cores take over and the terminal says why; the docking still
completes. <span class="ui">Settings &rsaquo; Test GPU</span> builds a real grid on the card and compares every value with the processor's,
reporting the largest difference.</p>
${back}

${head('d-rmsd')}
<h3>RMSD from a reference ligand</h3>
<p>The root-mean-square deviation between a docked pose <b>x</b> and the reference <b>y</b> over <i>N</i> heavy atoms is measured in the
receptor frame, without superposing the two (superposition would hide a pose in the wrong place), and minimised over every
correspondence &sigma; of the molecular graph:</p>
${eq(25, `<mtext>RMSD</mtext><mo>=</mo><munder><mi>min</mi><mi>&#963;</mi></munder><msqrt><mrow><mfrac><mn>1</mn><mi>N</mi></mfrac><munderover><mo>&#8721;</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>N</mi></munderover><msup><mrow><mo>&#8214;</mo><msub><mi mathvariant="bold">x</mi><mi>i</mi></msub><mo>&#8722;</mo><msub><mi mathvariant="bold">y</mi><mrow><mi>&#963;</mi><mo stretchy="false">(</mo><mi>i</mi><mo stretchy="false">)</mo></mrow></msub><mo>&#8214;</mo></mrow><mn>2</mn></msup></mrow></msqrt>`)}
<p>Atoms are paired by chemistry, not file order: both molecules' bonds are read from their coordinates, each atom is described by its element
and number of heavy neighbours, and a depth-first branch-and-bound search tries every correspondence that preserves all bonds, nearest
candidates first, pruning any partial assignment whose summed squared distance already exceeds the best found. Symmetric groups &mdash; a
flipped phenyl ring, a rotated carboxylate or CF<sub>3</sub> &mdash; are therefore not counted as errors (as in DockRMSD and spyrmsd). If the
two molecules differ in heavy-atom count or bonding, no value is given and the reason is reported.</p>
<h3>rmsd l.b. and rmsd u.b.</h3>
<p>The report compares every pose with pose 1, as Vina's output does. <b>rmsd u.b.</b> pairs heavy atoms one to one in atom order;
<b>rmsd l.b.</b> pairs each atom with the nearest atom of the same type in the other pose, and takes the larger of the two directions:</p>
${eq(26, `<msub><mtext>RMSD</mtext><mtext>l.b.</mtext></msub><mo>=</mo><mi>max</mi><mrow><mo>(</mo><msqrt><mrow><mfrac><mn>1</mn><mi>N</mi></mfrac><munder><mo>&#8721;</mo><mi>i</mi></munder><munder><mi>min</mi><mrow><mi>j</mi><mo>:</mo><mspace width="0.2em"/><msub><mi>t</mi><mi>j</mi></msub><mo>=</mo><msub><mi>t</mi><mi>i</mi></msub></mrow></munder><msup><mrow><mo>&#8214;</mo><msub><mi mathvariant="bold">x</mi><mi>i</mi></msub><mo>&#8722;</mo><msub><mi mathvariant="bold">y</mi><mi>j</mi></msub><mo>&#8214;</mo></mrow><mn>2</mn></msup></mrow></msqrt><mo>,</mo><mspace width="0.4em"/><mtext>same with </mtext><mi mathvariant="bold">x</mi><mo>&#8596;</mo><mi mathvariant="bold">y</mi><mo>)</mo></mrow>`)}
<p>so a flipped symmetric ring counts as the same pose in l.b. but not in u.b.</p>
${back}

${head('d-interactions')}
<p>Find Interactions (and Show interactions in Visualization) tests every heavy atom of the ligand against every heavy atom of the receptor
closer than the radius (default 4&nbsp;&Aring;), gives each pair the first type below that applies, then keeps the closest pair of each type per
residue.</p>
<h3>Donors and acceptors</h3>
<p>A hydrogen bond needs a donor and an acceptor, not just two polar atoms close together: a ligand carbonyl oxygen 3.3&nbsp;&Aring; from an
aspartate oxygen is not a bond. A ligand N or O donates when it carries a hydrogen. For amino acids, the donors and acceptors come from the
standard atom names:</p>
<div class="table-wrap"><table>
  <tr><th></th><th>Atoms</th></tr>
  <tr><td>Donors</td><td>Backbone N (not Pro); Arg NE, NH1, NH2; Lys NZ; Asn ND2; Gln NE2; His ND1, NE2; Trp NE1; Ser OG; Thr OG1; Tyr OH; Cys SG</td></tr>
  <tr><td>Acceptors</td><td>Backbone O and OXT; Asp OD1, OD2; Glu OE1, OE2; Asn OD1; Gln OE1; His ND1, NE2; Ser OG; Thr OG1; Tyr OH; Met SD</td></tr>
</table></div>
<p>A partner that is not an amino acid (a cofactor, another molecule) is typed like the ligand: an N or O carrying a hydrogen donates, an O (or
an N without hydrogen) accepts. Water oxygen both donates and accepts. Where hydrogen positions are fixed by the molecule (an N&ndash;H), the
geometry is checked too: some hydrogen of the donor must lie within 2.7&nbsp;&Aring; of the acceptor with a donor&ndash;H&middot;&middot;&middot;acceptor
angle of at least 110&deg;. Hydrogens that turn freely about their bond (hydroxyl, thiol, ammonium, water) are placed at arbitrary angles by
preparation programs, so for those donors the heavy-atom criteria decide. When neither molecule has any hydrogens, two N or O atoms within
3.5&nbsp;&Aring; count as a hydrogen bond.</p>
<h3>The types, in order of precedence</h3>
<div class="table-wrap"><table>
  <tr><th>Type</th><th>Rule</th></tr>
  <tr><td>Metal Coord</td><td>A metal atom (Zn, Mg, Fe, Ca, Mn, Cu, Co, Ni) on either side, closer than 2.8&nbsp;&Aring;.</td></tr>
  <tr><td>Unfavorable Bump</td><td>Two atoms that are not both N or O, closer than the sum of their Bondi van der Waals radii minus 0.85&nbsp;&Aring;.</td></tr>
  <tr><td>Conventional H-Bond</td><td>N or O on both sides within 3.5&nbsp;&Aring;, a donor with an acceptor, passing the geometric test above.</td></tr>
  <tr><td>Salt Bridge</td><td>A ligand N with an Asp or Glu side-chain atom, or a ligand O with an Arg, Lys or His side-chain atom, within 4.0&nbsp;&Aring;.</td></tr>
  <tr><td>Attractive Charge</td><td>The same pairs within 5.0&nbsp;&Aring;.</td></tr>
  <tr><td>Pi-Cation</td><td>An aromatic ligand atom and an Arg, Lys or His side-chain atom within 5.5&nbsp;&Aring;.</td></tr>
  <tr><td>Pi-Pi Stacked</td><td>An aromatic ligand atom and an aromatic side-chain atom (Phe, Tyr, Trp, His; aromatic carbons of another molecule) within 5.5&nbsp;&Aring;.</td></tr>
  <tr><td>Pi-Sigma</td><td>An aromatic ligand atom and an N or O within 5.0&nbsp;&Aring;.</td></tr>
  <tr><td>Carbon H-Bond</td><td>A ligand carbon and an N or O within 3.8&nbsp;&Aring; (with hydrogens present, one of the carbon's hydrogens must pass the geometric test).</td></tr>
  <tr><td>Pi-Alkyl</td><td>An aromatic ligand atom and a non-aromatic carbon within 5.0&nbsp;&Aring;.</td></tr>
  <tr><td>Alkyl</td><td>A ligand carbon and a carbon of Ala, Ile, Leu, Val, Phe, Trp, Met, Pro, Gly, Tyr or Cys within 5.0&nbsp;&Aring;.</td></tr>
  <tr><td>van der Waals</td><td>Any other pair within the radius.</td></tr>
</table></div>
<div class="note warn"><b>Simplifications.</b> The charged types take a ligand nitrogen as possibly cationic and a ligand oxygen as possibly
anionic, without checking the formal charge. The &pi; interactions are measured between atoms, not ring centroids and normals, so they answer
&ldquo;is this aromatic group near that one&rdquo; rather than testing a full stacking geometry. Backbone atoms take part only in hydrogen bonds and
contacts, never in the charged or &pi; types.</div>
<h3>One representative per residue</h3>
<p>A residue near the ligand produces many atom pairs; only the closest pair of each type is kept. In the 2D map each residue is shown by its
most significant contact: the highest type in the table, and among equals the shortest. The list is sorted the same way.</p>
<h3 id="map-layout">The 2D map layout</h3>
<p>The ligand is drawn from its own coordinates (or a clean 2D layout after <span class="ui">Fix Layout</span>, made by RDKit's CoordGen
layout from the ligand's SDF or perceived bonds). Each residue card starts on a ring around the ligand, in the direction of the atom it
contacts, outside the ligand's extent; cards on the same side fan out around that direction. Overlapping cards are then pushed apart along the
axis that frees them soonest, and off the ligand's atoms, while a weak pull holds each near its start; the last passes only separate. Every card
stays inside the canvas, so a long distance or a large ligand lines cards up along the edge. The same input always gives the same layout.</p>
${back}

${head('d-rendering')}
<h3>Secondary structure</h3>
<p>The cartoon needs to know which residues form helices and strands. PDBQT files have no HELIX or SHEET records, so QuarkSuit assigns secondary
structure itself from the backbone hydrogen bonds, as DSSP does (Kabsch &amp; Sander, 1983). The amide hydrogen is placed 1&nbsp;&Aring; from N,
opposite the previous residue's C=O, and a hydrogen bond from N&ndash;H of residue <i>d</i> to C=O of residue <i>a</i> exists when the
electrostatic energy</p>
${eq(27, `<msub><mi>E</mi><mtext>hb</mtext></msub><mo>=</mo><mn>0.084</mn><mo>&#183;</mo><mn>332</mn><mrow><mo>(</mo><mfrac><mn>1</mn><msub><mi>r</mi><mtext>ON</mtext></msub></mfrac><mo>+</mo><mfrac><mn>1</mn><msub><mi>r</mi><mtext>CH</mtext></msub></mfrac><mo>&#8722;</mo><mfrac><mn>1</mn><msub><mi>r</mi><mtext>OH</mtext></msub></mfrac><mo>&#8722;</mo><mfrac><mn>1</mn><msub><mi>r</mi><mtext>CN</mtext></msub></mfrac><mo>)</mo></mrow><mspace width="0.3em"/><mtext>kcal/mol</mtext>`)}
<p>is below &minus;0.5&nbsp;kcal/mol. Two consecutive <i>i</i>&nbsp;&rarr;&nbsp;<i>i</i>+4 turns make an &alpha;-helix; parallel or antiparallel
bridges between strands make a &beta;-strand (one-residue bulges are closed; strands shorter than three residues are drawn as loop).</p>
<h3>Surfaces</h3>
<p>The surface styles are a Gaussian molecular envelope: each atom adds a Gaussian density with width &sigma; = 0.72&nbsp;<i>R</i>&nbsp;&times;&nbsp;softness,
where <i>R</i> is its van der Waals radius,</p>
${eq(28, `<mi>&#961;</mi><mo stretchy="false">(</mo><mi mathvariant="bold">x</mi><mo stretchy="false">)</mo><mo>=</mo><munder><mo>&#8721;</mo><mi>i</mi></munder><msup><mi>e</mi><mrow><mo>&#8722;</mo><msup><mrow><mo>&#8214;</mo><mi mathvariant="bold">x</mi><mo>&#8722;</mo><msub><mi mathvariant="bold">x</mi><mi>i</mi></msub><mo>&#8214;</mo></mrow><mn>2</mn></msup><mo>/</mo><mn>2</mn><msubsup><mi>&#963;</mi><mi>i</mi><mn>2</mn></msubsup></mrow></msup><mo>,</mo><mspace width="1em"/><mtext>surface:</mtext><mspace width="0.3em"/><mi>&#961;</mi><mo>=</mo><mn>0.5</mn>`)}
<p>sampled on a lattice (0.5&ndash;0.7&nbsp;&Aring;, coarser for very large proteins) and triangulated by marching tetrahedra. Colours blend the atoms'
colours by their density, and crevices are darkened by sampling the density a short way out from each vertex. The surface is for display only
and plays no part in docking.</p>
<h3>Prototype (QuarkSuit) sticks</h3>
<p>Each element has a size that grows with its atomic number <i>Z</i> on a logarithmic scale, carbon being 1:</p>
${eq(29, `<mi>s</mi><mo stretchy="false">(</mo><mi>Z</mi><mo stretchy="false">)</mo><mo>=</mo><mn>1</mn><mo>+</mo><mi>c</mi><mspace width="0.2em"/><mi>ln</mi><mfrac><mrow><mi>clamp</mi><mo stretchy="false">(</mo><mi>Z</mi><mo>,</mo><mn>4</mn><mo>,</mo><mn>36</mn><mo stretchy="false">)</mo></mrow><mn>6</mn></mfrac>`)}
<p>with <i>c</i> = 0.75 by default (<span class="ui">Size by element</span>): nitrogen 1.12, oxygen 1.22, sulfur 1.74, chlorine 1.78, bromine 2.32.
A bond's radius is 0.15&nbsp;&Aring; times the larger of its two atoms' sizes, times <span class="ui">Stick thickness</span> (default 1.68); a bond to
hydrogen is 0.4 times a carbon&ndash;carbon bond. Every atom is a rounded joint as wide as its widest bond. Carbons in their default colour are
drawn pale diamond-blue with a glass shader: bright along the middle of each stick, darker towards the edges, with a thin bright rim and a crisp
highlight.</p>
${back}

<!-- ============================================================ PART III -->

${head('d-validation')}
<p>Redocking a co-crystal ligand into its own receptor is the standard check of a docking setup; the top pose should lie within 2&nbsp;&Aring; of
the crystal position. Results measured with QuarkSuit v1 are on the <a href="#home">home page</a>, and the <a href="#tutorial">tutorial</a>
reproduces the first of them. On the same pose and inputs, QuarkSuit's affinities agree with AutoDock Vina 1.2 (see the note in
${link('d-score')}); on a 4-thread laptop processor its search was faster than Vina's on the two systems timed (33 against 51&nbsp;s and 56 against
93&nbsp;s), which is not a general benchmark.</p>
<h3>Limits to keep in mind</h3>
<ul>
  <li><b>Affinities are estimates.</b> The scoring function has an error of a few kcal/mol; rankings between very different ligands are less
  reliable than poses.</li>
  <li><b>The receptor is rigid.</b> Side chains that move when the ligand binds are not modelled. Dock into a structure solved with a similar
  ligand where you can.</li>
  <li><b>No electrostatics or desolvation.</b> Partial charges are not part of the score, and solvent is not modelled; water molecules kept in the
  receptor are treated as fixed atoms.</li>
  <li><b>Metals are described roughly.</b> A metal is a hydrogen-bond donor without directional coordination. Ligands that bind through a metal
  may not be reproduced: for example the galactofuranoside of 4WMY, whose hydroxyl groups coordinate a calcium ion, docks about 2.8&nbsp;&Aring; from
  its crystal pose, because the crystal pose's minimum scores about 1.2&nbsp;kcal/mol above the best pose &mdash; a limit of the scoring function,
  not of the search.</li>
  <li><b>Protonation</b> at a chosen pH uses typical group p<i>K</i><sub>a</sub> values, not predictions for each site.</li>
  <li><b>The search is stochastic.</b> A run can miss the best pose; raise the thoroughness for flexible ligands and large boxes, and compare
  runs.</li>
</ul>
${back}

${head('d-trouble')}
<dl>
  <dt>The window does not open, or a graphics error appears</dt>
  <dd>QuarkSuit needs OpenGL 2.0. Without a working driver it starts with its software renderer and says so in the terminal; otherwise it
  explains the problem and offers the driver download page. <code>--gl-info</code> shows the renderer.</dd>
  <dt>"Check input file, non-protein residue." or "protein residue."</dt>
  <dd>The file was loaded with the wrong button (${link('d-loading')}). For a complex, Load Ligand offers the ligands inside it.</dd>
  <dt>The best pose scores poorly and lies far from the known site</dt>
  <dd>Check that the co-crystal ligand was deleted from the receptor, that the box covers the pocket, and that both molecules were prepared
  (polar hydrogens, PDBQT).</dd>
  <dt>Results change when the settings change slightly</dt>
  <dd>Double the thoroughness. Check that the box is not much larger than needed.</dd>
  <dt>The best pose sits at the edge of the box</dt>
  <dd>The box does not contain the whole pocket: enlarge it or move its centre.</dd>
  <dt>Docking is slow</dt>
  <dd>Make the box fit the pocket (large boxes raise the thoroughness), remove chains you do not need, or choose GPU or Hybrid grids.</dd>
  <dt>GPU grids fall back to the processor</dt>
  <dd>The terminal gives the reason. Install the graphics driver from the card's maker; the Windows basic display driver has no OpenCL. The
  docking still completes.</dd>
  <dt>Preparation stops with an error</dt>
  <dd>The summary window and the terminal give the reason, for example Kollman charges on an atom the table does not cover, or minimisation of a
  protein with a metal. Nothing was changed; choose other options and run again.</dd>
  <dt>"Atom ... has an impossible valence"</dt>
  <dd>The file's bonds or hydrogens do not fit the element (often unlabelled alternate positions, or a hydrogen too many). The message names the
  atom and residue.</dd>
  <dt>QuarkSuit closed unexpectedly</dt>
  <dd>A crash report is written to <code>%APPDATA%\\QuarkSuit\\crashes</code>. Please send it to the developers with a short description of what you
  were doing.</dd>
</dl>
${back}

${head('d-glossary')}
<dl>
  <dt>Affinity</dt><dd>The predicted binding free energy of a pose, in kcal/mol; more negative is stronger.</dd>
  <dt>Co-crystal ligand</dt><dd>A ligand bound in an experimental structure; its position is the reference for redocking.</dd>
  <dt>Force field</dt><dd>A function giving a molecule's energy from its atom positions, as a sum of bond, angle, torsion and non-bonded terms.</dd>
  <dt>Formal charge</dt><dd>The charge assigned to an atom by its bonding, for example &minus;1 on a carboxylate oxygen.</dd>
  <dt>Gasteiger charges</dt><dd>Partial charges computed from connectivity by partial equalisation of electronegativity.</dd>
  <dt>Grid box</dt><dd>The rectangular region in which the ligand is docked.</dd>
  <dt>Heavy atom</dt><dd>Any atom other than hydrogen.</dd>
  <dt>Minimisation</dt><dd>Moving atoms downhill on a force field's energy surface to the nearest local minimum.</dd>
  <dt>PDBQT</dt><dd>AutoDock's format: PDB coordinates with partial charge (Q) and atom type (T), and a torsion tree for ligands.</dd>
  <dt>p<i>K</i><sub>a</sub></dt><dd>The pH at which a group is half ionised.</dd>
  <dt>Polar hydrogen</dt><dd>A hydrogen on N, O or S, which can take part in hydrogen bonds.</dd>
  <dt>Pose</dt><dd>One predicted position, orientation and conformation of the ligand.</dd>
  <dt>Redocking</dt><dd>Docking a co-crystal ligand back into its receptor to test a setup.</dd>
  <dt>RMS force</dt><dd>The root-mean-square of the energy gradient over all coordinates; zero at a minimum.</dd>
  <dt>RMSD</dt><dd>Root-mean-square deviation between the atom positions of two structures, in &Aring;.</dd>
  <dt>Thoroughness (exhaustiveness)</dt><dd>The number of independent searches in a docking run.</dd>
  <dt>Torsion (rotatable bond)</dt><dd>A single, non-ring bond that the docking search may turn.</dd>
  <dt>United atom</dt><dd>A carbon with its non-polar hydrogens merged into it, their charge added to its own.</dd>
</dl>
${back}

${head('d-refs')}
<h3>Methods</h3>
<ol>
  <li>O. Trott, A. J. Olson. AutoDock Vina: improving the speed and accuracy of docking with a new scoring function, efficient optimization, and multithreading. <i>J. Comput. Chem.</i> 31, 455&ndash;461 (2010).</li>
  <li>J. Eberhardt, D. Santos-Martins, A. F. Tillack, S. Forli. AutoDock Vina 1.2.0: new docking methods, expanded force field, and Python bindings. <i>J. Chem. Inf. Model.</i> 61, 3891&ndash;3898 (2021).</li>
  <li>J. Gasteiger, M. Marsili. Iterative partial equalization of orbital electronegativity: a rapid access to atomic charges. <i>Tetrahedron</i> 36, 3219&ndash;3228 (1980).</li>
  <li>A. K. Rapp&eacute;, C. J. Casewit, K. S. Colwell, W. A. Goddard III, W. M. Skiff. UFF, a full periodic table force field for molecular mechanics and molecular dynamics simulations. <i>J. Am. Chem. Soc.</i> 114, 10024&ndash;10035 (1992).</li>
  <li>T. A. Halgren. Merck molecular force field. I. Basis, form, scope, parameterization, and performance of MMFF94. <i>J. Comput. Chem.</i> 17, 490&ndash;519 (1996).</li>
  <li>T. A. Halgren. MMFF VI. MMFF94s option for energy minimization studies. <i>J. Comput. Chem.</i> 20, 720&ndash;729 (1999).</li>
  <li>S. Wang, J. Witek, G. A. Landrum, S. Riniker. Improving conformer generation for small rings and macrocycles based on distance geometry and experimental torsional-angle preferences. <i>J. Chem. Inf. Model.</i> 60, 2044&ndash;2058 (2020).</li>
  <li>J. Nocedal, S. J. Wright. <i>Numerical Optimization</i>, 2nd ed. Springer (2006). D. C. Liu, J. Nocedal. On the limited memory BFGS method for large scale optimization. <i>Math. Program.</i> 45, 503&ndash;528 (1989).</li>
  <li>E. C. Meng, R. A. Lewis. Determination of molecular topology and atomic hybridization states from heavy atom coordinates. <i>J. Comput. Chem.</i> 12, 891&ndash;898 (1991). J. C. Baber, E. E. Hodgkin. Automatic assignment of chemical connectivity to organic molecules in the Cambridge Structural Database. <i>J. Chem. Inf. Comput. Sci.</i> 32, 401&ndash;406 (1992).</li>
  <li>F. H. Allen <i>et al.</i> Tables of bond lengths determined by X-ray and neutron diffraction. <i>J. Chem. Soc., Perkin Trans. 2</i>, S1&ndash;S19 (1987).</li>
  <li>D. D. Perrin, B. Dempsey, E. P. Serjeant. <i>pK<sub>a</sub> Prediction for Organic Acids and Bases.</i> Chapman &amp; Hall (1981).</li>
  <li>J. Parsons, J. B. Holmes, J. M. Rojas, J. Tsai, C. E. M. Strauss. Practical conversion from torsion space to Cartesian space for in silico protein synthesis. <i>J. Comput. Chem.</i> 26, 1063&ndash;1068 (2005).</li>
  <li>W. Kabsch, C. Sander. Dictionary of protein secondary structure: pattern recognition of hydrogen-bonded and geometrical features. <i>Biopolymers</i> 22, 2577&ndash;2637 (1983).</li>
  <li>C. A. Lipinski, F. Lombardo, B. W. Dominy, P. J. Feeney. Experimental and computational approaches to estimate solubility and permeability in drug discovery and development settings. <i>Adv. Drug Deliv. Rev.</i> 23, 3&ndash;25 (1997).</li>
  <li>D. F. Veber <i>et al.</i> Molecular properties that influence the oral bioavailability of drug candidates. <i>J. Med. Chem.</i> 45, 2615&ndash;2623 (2002).</li>
  <li>RDKit: open-source cheminformatics. <a href="https://www.rdkit.org">https://www.rdkit.org</a></li>
</ol>
<h3>Credits</h3>
<p>QuarkSuit is developed at the TCCG Center, University of Zakho (<a href="#people">People</a>). The third-party components it includes and
their licences are listed on the <a href="#download/licence">Download</a> page.</p>
${back}
`,
};
