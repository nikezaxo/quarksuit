// The QuarkSuit v1 user manual. Chapter ids are linked as #manual/<id>.
const chapters = [
  ['m-intro', 'Introduction'],
  ['m-install', 'Installation'],
  ['m-start', 'Getting started'],
  ['m-settings', 'Settings'],
  ['m-loading', 'Loading structures'],
  ['m-properties', 'The Molecule Properties window'],
  ['m-prep', 'Preparing structures'],
  ['m-view', 'The 3D view and display options'],
  ['m-docking', 'Running a docking'],
  ['m-analysis', 'Analysing results'],
  ['m-diagram', 'The 2D interaction diagram'],
  ['m-saving', 'Saving and exporting'],
  ['m-report', 'The docking report'],
  ['m-vis', 'The Visualization workspace'],
  ['m-editor', 'The ligand editor'],
  ['m-validation', 'Validation and limits'],
  ['m-trouble', 'Troubleshooting'],
  ['m-glossary', 'Glossary'],
  ['m-refs', 'References and credits'],
];
const head = (id) => {
  const n = chapters.findIndex(c => c[0] === id) + 1;
  return `<h2 id="${id}">${n}. ${chapters[n - 1][1]}</h2>`;
};
const back = '<p class="back"><a href="#manual/contents">Contents</a></p>';

export const manual = {
  title: 'Manual',
  render: () => `
<h1>QuarkSuit v1 user manual</h1>
<p>This manual describes every part of QuarkSuit v1. For a first run through the program, the
<a href="#tutorial">tutorial</a> is quicker. Inside the program, <kbd>F1</kbd> opens the
<span class="ui">Command Guide</span>, which lists each menu command with its icon, shortcut and
purpose, and most settings have a <span class="ui">(?)</span> marker that explains them when you
point at it.</p>

<div class="toc" id="contents">
  <p class="toc-title">Contents</p>
  <ol>${chapters.map(([id, t]) => `<li><a href="#manual/${id}">${t}</a></li>`).join('')}</ol>
</div>

${head('m-intro')}
<p>QuarkSuit is a desktop program for structure-based drug design. It takes a protein receptor
and a ligand, prepares both for docking, predicts how the ligand binds in a region you define,
and helps you examine and report the result. The docking engine is built in; AutoDock Vina or
other programs are not needed.</p>

<h3>The four workspaces</h3>
<div class="table-wrap"><table>
  <tr><th>Home screen button</th><th>Use it to</th><th>Chapters</th></tr>
  <tr><td><span class="ui">NEW DOCKING PROJECT</span></td><td>Load a receptor and a ligand, place the search box, dock, and analyse the poses.</td><td><a href="#manual/m-docking">9</a>&ndash;<a href="#manual/m-report">13</a></td></tr>
  <tr><td><span class="ui">PREPARE STRUCTURES</span></td><td>Add hydrogens and charges, remove waters, chains or ligands, and save docking-ready files.</td><td><a href="#manual/m-prep">7</a></td></tr>
  <tr><td><span class="ui">VISUALIZATION</span></td><td>View several structures together, split into chains, ligands, ions and waters.</td><td><a href="#manual/m-vis">14</a></td></tr>
  <tr><td><span class="ui">LIGAND OPTIMIZATION</span></td><td>Draw, edit and minimise ligands in a linked 2D/3D editor.</td><td><a href="#manual/m-editor">15</a></td></tr>
</table></div>

<h3 id="formats">File formats</h3>
<div class="table-wrap"><table>
  <tr><th>Format</th><th>Extensions</th><th>Read</th><th>Written by</th><th>Notes</th></tr>
  <tr><td>Protein Data Bank</td><td><code>.pdb</code>, <code>.ent</code></td><td>yes</td><td>preparation, complex export, editor</td><td>No bond orders and no partial charges.</td></tr>
  <tr><td>AutoDock PDBQT</td><td><code>.pdbqt</code></td><td>yes</td><td>preparation, complex export, editor</td><td>Partial charges, AutoDock atom types and, for a ligand, the torsion tree. The usual docking input.</td></tr>
  <tr><td>MDL molfile / SD file</td><td><code>.sdf</code>, <code>.sd</code>, <code>.mol</code></td><td>yes</td><td>preparation, complex export, editor</td><td>Bond orders and formal charges. The best master copy of a ligand.</td></tr>
  <tr><td>Tripos MOL2</td><td><code>.mol2</code></td><td>yes</td><td>complex export, editor</td><td>Its header states the charge model, which the Molecule Properties window reports.</td></tr>
  <tr><td>mmCIF</td><td><code>.cif</code>, <code>.mmcif</code></td><td>yes</td><td>complex export</td><td>Macromolecular structures from the PDB.</td></tr>
  <tr><td>XYZ</td><td><code>.xyz</code></td><td>yes</td><td>editor</td><td>Coordinates only; bonds are guessed from distances.</td></tr>
  <tr><td>Gaussian input</td><td><code>.gjf</code></td><td>yes</td><td>&ndash;</td><td>Coordinates and connectivity.</td></tr>
  <tr><td>SMILES, CML</td><td><code>.smi</code>, <code>.cml</code></td><td>editor</td><td>editor</td><td>SMILES has no coordinates.</td></tr>
  <tr><td>QuarkSuit project</td><td><code>.qs</code></td><td>yes</td><td>File menu</td><td>Molecules, settings and docking results together.</td></tr>
  <tr><td>Report, images</td><td><code>.txt</code>, <code>.png</code>, <code>.jpg</code></td><td>&ndash;</td><td>File menu</td><td>The editor also writes BMP and SVG graphs and CSV step data.</td></tr>
</table></div>
${back}

${head('m-install')}
<p>Requirements, installation and the files QuarkSuit installs are listed on the
<a href="#download/requirements">Download</a> page. QuarkSuit also registers <code>.qs</code> project
files, so double-clicking one in Explorer opens it.</p>
<h3>Where QuarkSuit keeps its files</h3>
<div class="table-wrap"><table>
  <tr><th>Item</th><th>Location</th></tr>
  <tr><td>Settings (theme, GPU choices, window style, the Molecule Properties option)</td><td><code>%APPDATA%\\QuarkSuit\\settings.ini</code></td></tr>
  <tr><td>Crash reports</td><td><code>%APPDATA%\\QuarkSuit\\crashes</code></td></tr>
  <tr><td>Temporary chemistry files</td><td>A work folder under your temporary directory, removed after each job</td></tr>
</table></div>
<h3>Checking an installation</h3>
<p>From a command prompt in the installation folder, <code>QuarkSuit.exe --selftest</code> checks the
chemistry tools, including folder names in non-Latin scripts, without opening the window, and
prints the result. <code>QuarkSuit.exe --gl-info</code> prints the OpenGL renderer in use.</p>
${back}

${head('m-start')}
<h3>The home screen</h3>
<p><span class="ui">Settings</span> and <span class="ui">About</span> are at the top left, the four
workspace buttons at the right. Opening a workspace starts a fresh session.</p>
<h3>Sessions and Home</h3>
<p><span class="ui">&laquo; HOME</span> at the top of the parameters panel, or
<span class="ui">File &rsaquo; Home</span>, closes the session: molecules, results, preparation windows
and property tabs are cleared, so a workspace opened afterwards starts empty. If there is
unsaved work QuarkSuit asks first. A preparation that is still running is cancelled and its result
discarded. A docking or minimisation that is still running keeps the workspace open instead.</p>
<h3>The docking and preparation workspaces</h3>
<dl>
  <dt>Menu bar</dt><dd><span class="ui">File</span>, <span class="ui">Edit</span>, <span class="ui">View</span>, <span class="ui">Tools</span> and <span class="ui">Help</span>. Each command has an icon and explains itself when you rest the pointer on it.</dd>
  <dt>Parameters panel</dt><dd>Numbered sections worked through from the top. Click a section header to fold it.</dd>
  <dt>3D view</dt><dd>Molecules and the search box (<a href="#manual/m-view">chapter 8</a>).</dd>
  <dt>Terminal Output</dt><dd>A log of what QuarkSuit does: files read with atom and bond counts, preparation steps, warnings and docking results. Look here first when something is unexpected.</dd>
  <dt>Tool windows</dt><dd>Docking Analysis, the 2D diagram, Molecule Properties and others. Each has its own minimise button; a minimised window waits as a button at the bottom right of the screen until you click it.</dd>
</dl>
<h3>Menus</h3>
<div class="table-wrap"><table>
  <tr><th>Menu</th><th>Commands</th></tr>
  <tr><td>File</td><td>New Project <kbd>Ctrl+N</kbd>, Open Project <kbd>Ctrl+O</kbd>, Save Project <kbd>Ctrl+S</kbd>, Save Project As <kbd>Ctrl+Shift+S</kbd>, Load Protein, Load Ligand, Save Complex As, Save Docking Result, Export (3D view screenshot, 2D map; PNG or JPG), Home, Exit. In Visualization: Open Files, Close All.</td></tr>
  <tr><td>Edit</td><td>Undo <kbd>Ctrl+Z</kbd>, Redo <kbd>Ctrl+Y</kbd>, Colors (background, protein, ligand, grid box).</td></tr>
  <tr><td>View</td><td>Protein Style, Style Options, Protein Color, Ligand Style, Ligand Color, Water Display, Modern Shader, Black Outlines, Show Box Faces, Parameters Panel, Terminal Output, Docking Analysis, 2D Interaction Map, Molecule Properties, Reset Camera View.</td></tr>
  <tr><td>Tools</td><td>Lighting, Background Blur, Interactions (line style and colours), Labels.</td></tr>
  <tr><td>Help</td><td>Command Guide <kbd>F1</kbd>, Settings, About QuarkSuit.</td></tr>
</table></div>
<h3>Projects and undo</h3>
<p>A project file (<code>.qs</code>) stores the protein, ligand, reference ligand, docking results and
all settings. The window title shows the project name, with <code>*</code> while there are unsaved
changes. <span class="ui">Undo</span> and <span class="ui">Redo</span> cover changes to molecules,
results and settings (not the camera); a slider drag or box move counts as one step.</p>
${back}

${head('m-settings')}
<p><span class="ui">Help &rsaquo; Settings</span>, or the button on the home screen. Changes are saved at once.</p>
<div class="table-wrap"><table>
  <tr><th>Setting</th><th>Choices</th><th>Effect</th></tr>
  <tr><td>Language</td><td>English, Kurdish (Sorani), Arabic</td><td>Menus, panel headers and buttons. Kurdish and Arabic are shown right to left.</td></tr>
  <tr><td>Theme</td><td>Dark Modern, Light Clean, Classic (ImGui), Windows Normal, Windows Classic</td><td>Colours of the whole interface. Windows Classic imitates the grey Windows 95&ndash;2000 look with navy title bars.</td></tr>
  <tr><td>Window controls</td><td>Classic, Modern</td><td>Style of the minimise, maximise and close buttons.</td></tr>
  <tr><td>Graphics GPU</td><td>Automatic, or a named graphics card</td><td>On laptops with two GPUs, choose the high-performance one for smooth rotation of large structures. Takes effect after a restart.</td></tr>
  <tr><td>Docking engine</td><td>CPU only; GPU (graphics chip); Hybrid (GPU + CPU)</td><td>What builds the receptor energy grids. The search itself always runs on the processor cores (<a href="#manual/engine">section 9.6</a>).</td></tr>
  <tr><td>GPU device</td><td>First available GPU, or a named device</td><td>The OpenCL device used in GPU and Hybrid modes.</td></tr>
</table></div>
${back}

${head('m-loading')}
<p><span class="ui">Load Protein</span> and <span class="ui">Load Ligand</span> in
<span class="ui">1. Molecular Inputs</span> (and in the File menu) check what a file contains before they
load it.</p>
<dl>
  <dt>Load Protein</dt>
  <dd>Accepts a receptor: a structure built of amino-acid or nucleotide residues. A whole protein, a
  binding-site extract and a DNA or RNA receptor are all accepted. A file holding only a small
  molecule is refused with the message <i>Check input file, non-protein residue.</i></dd>
  <dt>Load Ligand</dt>
  <dd>Accepts any molecule that is not a protein: drug-like molecules, peptides, sugars,
  macrocycles and other large molecules. A chain of 30 or more amino acids counts as a protein and
  is refused with <i>Check input file, protein residue.</i> If the file is a protein&ndash;ligand
  complex, the message lists the ligands in it (hetero groups, with covalently linked residues such
  as sugar chains kept together, and short peptide chains) and <span class="ui">Load ligand</span>
  takes the selected one. For files without residue names, such as a protein saved as SDF, the
  peptide backbone is recognised from the bonds.</dd>
</dl>
<p>PDB, PDBQT, SDF and GJF files are read directly; MOL2, mmCIF, MOL and XYZ through the chemistry
engine (a ligand as SDF, so bond orders are kept; a receptor as PDB, so residues are kept). From a
docking output file with several models, the first pose is taken. A file that cannot be read gives
<i>Check input file, it cannot be read.</i>, with the reason in the terminal.</p>
<div class="note"><b>Note.</b> PDB and PDBQT files store no bond orders and PDBQT no formal charges.
For such ligands QuarkSuit derives both from the 3D geometry and the hydrogens present whenever
chemistry is done on them (preparation, torsion tree, properties).</div>
${back}

${head('m-properties')}
<p>When a protein or ligand is opened in any workspace, the <span class="ui">Molecule Properties</span>
window opens with one tab per molecule. Coloured labels at the top summarise the findings (green:
fine, orange: needs attention, red: a problem for docking); the sections below give the details,
and pointing at a row explains it. <span class="ui">Copy report</span> copies everything as text.
In the docking and preparation workspaces the tabs follow the loaded molecules: after a
preparation they are checked again automatically, or with <span class="ui">Check again</span>. Clear
<span class="ui">Show when a molecule is opened</span> to stop the window opening by itself;
<span class="ui">View &rsaquo; Molecule Properties</span> opens it at any time.</p>

<h3>For a protein</h3>
<dl>
  <dt>Overview</dt><dd>PDB entry, title, experimental method and resolution (from the PDB header), atom counts, chains with residue ranges, modified residues (MSE, SEP, TPO, PTR), waters, metal and other ions, hetero groups, multiple models, mean B-factor, zero-occupancy atoms, and the centre and size of the structure.</dd>
  <dt>Hydrogens</dt><dd>None, polar hydrogens only, or all hydrogens, with counts. When the structure has hydrogens, every backbone N&ndash;H and side-chain donor (Ser, Thr, Tyr, Trp, Asn, Gln, Arg, Lys, His) is checked, and sites missing hydrogens are listed.</dd>
  <dt>Charges</dt><dd>Whether partial charges are present, which model they come from, the total charge, the net charge of the protonation states and disulfide bonds (see below).</dd>
  <dt>Missing atoms and residues</dt><dd>Missing heavy atoms in standard residues, residues not modelled (REMARK 465), sequence coverage against SEQRES, chain breaks with the chain and gap length, and alternate positions.</dd>
  <dt>Hetero groups</dt><dd>Each ligand or cofactor with its centre, a convenient place for a docking box.</dd>
  <dt>AutoDock atom types</dt><dd>For PDBQT files: the types present, and any the docking score has no parameters for.</dd>
</dl>

<h3>For a ligand</h3>
<dl>
  <dt>Overview</dt><dd>Formula and molecular weight of the complete molecule, fragments (a salt or counter-ion gives several; docking needs one), 2D or 3D coordinates, overlapping atoms, poses or molecules in the file, elements without scoring parameters, centre and size.</dd>
  <dt>Hydrogens</dt><dd>The state and counts, and how many polar and non-polar hydrogens are missing: the ones that adding hydrogens would place.</dd>
  <dt>Charges</dt><dd>Formal charge (stated by the file, or derived from the 3D structure for PDBQT), partial charges and their model, and whether their total is a whole number.</dd>
  <dt>Torsion tree</dt><dd>The tree written in a PDBQT file (branches, TORSDOF, inactive torsions), the number of torsions QuarkSuit's docking will turn, and RDKit's count of rotatable bonds.</dd>
  <dt>Drug-likeness</dt><dd>Crippen logP, TPSA, hydrogen-bond donors and acceptors, rings, stereocentres, and Lipinski's and Veber's rules.</dd>
</dl>

<h3 id="charge-model">How the charge model is recognised</h3>
<p>Structure files do not record which charge model produced their charges, so QuarkSuit uses the
values themselves and says what the evidence was.</p>
<ul>
  <li>A MOL2 file states the model in its header; a PubChem SDF has an MMFF94 data field. These are reported as stated.</li>
  <li>Protein: the charges of the peptide C=O group differ between models. Gasteiger gives about +0.24 / &minus;0.27&nbsp;e,
  AutoDock's Kollman united-atom table +0.526 / &minus;0.500, AMBER (ff94 to ff14SB) +0.5973 / &minus;0.5679 and
  CHARMM +0.51 / &minus;0.51. Kollman is also checked atom by atom against the table.</li>
  <li>Ligand: the charges are compared with a Gasteiger&ndash;Marsili recalculation of the same structure. A mean
  difference below 0.01&nbsp;e is reported as Gasteiger; up to 0.03&nbsp;e as Gasteiger from another program. If the
  file's charges add up to a different total than the structure's formal charge, they belong to another protonation
  state and no model is claimed.</li>
</ul>

<h3>Net charge of a protein</h3>
<p>Counted from the protonation states. With hydrogens present they are read from the hydrogens
(for example Lys with three H on N&zeta;, His with H on both ring nitrogens, Asp without H on either
oxygen). Without hydrogens the usual states at pH 7 are assumed: Lys and Arg +1, Asp and Glu &minus;1,
His neutral, charged termini. Cysteines in disulfides are neutral. Metal ions and hetero groups are
not included. Disulfides are cysteine pairs whose sulfurs are within 2.5&nbsp;&Aring;; SSBOND records that
join symmetry copies in the crystal are noted separately.</p>
${back}

${head('m-prep')}
<p>The <span class="ui">PREPARE STRUCTURES</span> workspace uses QuarkSuit's chemistry engine, built on
RDKit. Preparation always works on a copy: the loaded molecule changes only when a job finishes
successfully, and a failed or cancelled job leaves it untouched.</p>

<h3>Protein options</h3>
<dl>
  <dt>Check structure</dt><dd>Lists missing heavy atoms, repeated atom names, alternate positions, metals, chain breaks and atoms without charges, without changing anything.</dd>
  <dt>1. Remove waters</dt><dd>Deletes crystal waters. <span class="ui">Keep waters bound to metal ions</span> keeps waters within 3&nbsp;&Aring; of a metal ion, which complete its coordination as in the crystal.</dd>
  <dt>2. Add hydrogens</dt><dd><span class="ui">Polar only (docking)</span> keeps hydrogens on N, O and S and merges the others into their carbons, the form AutoDock expects; <span class="ui">All hydrogens</span> keeps every hydrogen. Heavy atoms never move.</dd>
  <dt>Use selected pH</dt><dd>Each ionisable group (Asp, Glu, Lys, Arg, His, Cys, Tyr, chain ends) gets the state its typical p<i>K</i><sub>a</sub> gives at this pH, and existing hydrogens are replaced. Recommended for crystal structures. It is a rule-based model, not a site-specific p<i>K</i><sub>a</sub> prediction; check histidines in the binding site. Without it, existing hydrogens are kept and the rest completed.</dd>
  <dt>3. Minimize geometry</dt><dd>Local relaxation with all hydrogens, with UFF, MMFF94 or MMFF94s, up to a maximum number of steps (10&ndash;2000), by conjugate gradients, steepest descent, steepest descent then CG, or L-BFGS. It stops at the step limit or when the RMS force falls below 0.01&nbsp;kcal/mol/&Aring;. Every atom must be covered by the force field; there is no fallback and no solvent model.</dd>
  <dt>4. Partial charges</dt><dd><span class="ui">Gasteiger</span> (Gasteiger&ndash;Marsili, works on any organic structure); <span class="ui">Kollman (legacy table; strict)</span>, the united-atom table for polar-hydrogen receptors, which stops with an error on atoms it does not cover (unusual residues, cofactors, free termini) instead of mixing models; or <span class="ui">Keep externally assigned charges</span> for a receptor prepared elsewhere.</dd>
</dl>
<p>Click <span class="ui">Proceed</span> to run the selected steps. A window shows their progress and
can be minimised; <span class="ui">Cancel</span> stops the job and leaves the protein as it was. The
terminal records each step with counts, and a summary window reports the result.</p>

<h3 id="metals">Metal ions</h3>
<p>Metal ions (single-atom residues such as Zn, Ca, Mg, Fe) are kept unchanged and written with charge
0, as AutoDockTools does; the score treats them as metal donors. A cysteine bound to a metal becomes a
thiolate, and a histidine binds through a nitrogen without hydrogen (the residue becomes HID or HIE).
Minimisation and Kollman charges are not available when metals are present. A metal inside a cofactor
(haem, iron&ndash;sulfur cluster) needs a model prepared elsewhere.</p>

<h3>Structural problems</h3>
<ul>
  <li><b>Alternate positions:</b> the one with the higher occupancy is kept (A when equal).</li>
  <li><b>Missing heavy atoms and loops</b> are not rebuilt. If they line the binding site, complete them in modelling software first.</li>
  <li><b>Repeated atom names</b> without alternate-position labels stop preparation; reload the original file.</li>
</ul>

<h3>Protein chains and hetero groups</h3>
<p><span class="ui">Protein Chains</span> lists each chain with its residues; the waste-bin icon removes
a chain (with its ligands and waters) or a single residue. <span class="ui">Co-Crystal / Water / Ions</span>
lists the hetero groups tagged [L] ligand, [W] water or [I] ion: the eye icon hides a group in the view,
the waste-bin icon deletes it, and the colour box sets its colour. A co-crystal ligand must be deleted from
a receptor before docking; save it separately first if you want it as the reference for RMSD.</p>
<p>For waters, <span class="ui">Water display</span> sets their drawing, and in ball-and-stick or stick
style <span class="ui">Preview missing water hydrogens</span> draws hydrogens for waters that have none
(display only).</p>

<h3>Ligand options</h3>
<p><span class="ui">1. Add hydrogens</span> (polar only or all), <span class="ui">Use selected pH</span>,
<span class="ui">2. Minimize geometry</span> (UFF, MMFF94 or MMFF94s) and <span class="ui">3. Assign
Gasteiger charges</span>, then <span class="ui">Proceed</span>. Formal charges and bond orders come from
the input; for PDB and PDBQT they are derived from the 3D structure. <span class="ui">Analyse Ligand</span>
writes the formula, weight, rotatable bonds, rings and logP to the terminal.</p>

<h3>Saving prepared structures</h3>
<div class="table-wrap"><table>
  <tr><th>Format</th><th>Keeps</th><th>Use for</th></tr>
  <tr><td>PDBQT</td><td>Partial charges, AutoDock atom types; the torsion tree of a ligand</td><td>Docking in QuarkSuit, AutoDock Vina or AutoDock4</td></tr>
  <tr><td>SDF</td><td>Bonds, formal charges, and QuarkSuit's record of partial charges and residue names</td><td>A master copy that QuarkSuit reads back completely</td></tr>
  <tr><td>PDB</td><td>Coordinates, names and B-factors; no partial charges</td><td>Other programs</td></tr>
</table></div>

<h3>Recommended order</h3>
<ol>
  <li>Load the protein and read its Molecule Properties report.</li>
  <li>Save the co-crystal ligand if you want it as a reference, then delete it and any chains you do not need.</li>
  <li>Remove waters (keep metal-bound ones if the ligand should meet a metal as in the crystal), add polar hydrogens at pH 7.4, and assign Gasteiger charges. Save as PDBQT.</li>
  <li>Load the ligand, preferably from SDF or MOL2, which keep bond orders. Add polar hydrogens at the pH of interest, assign Gasteiger charges and save as PDBQT.</li>
</ol>
${back}

${head('m-view')}
<h3>Mouse</h3>
<div class="table-wrap"><table>
  <tr><th>Action</th><th>Control</th></tr>
  <tr><td>Rotate</td><td>Left-drag</td></tr>
  <tr><td>Pan</td><td>Right-drag, or <kbd>Ctrl</kbd> + left-drag</td></tr>
  <tr><td>Zoom</td><td>Mouse wheel</td></tr>
  <tr><td>Move the docking box</td><td><kbd>Shift</kbd> + left-drag (docking workspace; locked during a run)</td></tr>
  <tr><td>Reset the camera</td><td><span class="ui">View &rsaquo; Reset Camera View</span></td></tr>
</table></div>
<h3>View menu</h3>
<div class="table-wrap"><table>
  <tr><th>Protein style</th><th>Suited to</th></tr>
  <tr><td>Rubber Ribbon (Cartoon)</td><td>Secondary structure; the default.</td></tr>
  <tr><td>Spheres (CPK)</td><td>The shape of the pocket.</td></tr>
  <tr><td>Sticks, Ball &amp; Stick</td><td>Residues around the ligand.</td></tr>
  <tr><td>Sausage (Intestine)</td><td>A smooth backbone trace.</td></tr>
  <tr><td>Rough Surface (Blender)</td><td>A matte molecular surface, with options for chain colours, detail, softness, sheen, crevice shading and a water coating.</td></tr>
  <tr><td>Translucent Surface</td><td>Seeing the ligand through the surface.</td></tr>
  <tr><td>Gel Surface (Rubber + Ocean)</td><td>Coloured residues inside a clear shell.</td></tr>
  <tr><td>Ligand Editor (Glossy Atoms)</td><td>The glossy look of the ligand editor.</td></tr>
</table></div>
<p>Surfaces are computed in the background the first time they are chosen. <span class="ui">Style Options</span>
holds the settings of the current style.</p>
<ul>
  <li><b>Protein Color:</b> CPK Atom Type, Solid Color, B-Factor Heat, Residue Type.</li>
  <li><b>Ligand Style:</b> Ribbon, Spheres (CPK), Sticks, Ball &amp; Stick, Ligand Editor (Glossy Atoms). <b>Ligand Color:</b> CPK Atom Type, Solid Color, Charge Heat (partial charges from red through white to blue; grey where unassigned).</li>
  <li><b>Water Display:</b> Hidden, Spheres, Ball &amp; stick, Sticks.</li>
  <li><b>Modern Shader (Glossy)</b>, <b>Black Outlines</b>, and <b>Show Box Faces</b> (fills the sides of the docking box).</li>
</ul>
<h3>Tools menu</h3>
<p><span class="ui">Lighting</span> (direction, brightness, ambient light, highlights, softness and colours),
<span class="ui">Background Blur</span> (depth of field), <span class="ui">Interactions</span> (which contact
types are drawn, line width, dashed or solid, glow, outline and colours) and <span class="ui">Labels</span>
(residue names and atom names or numbers, optionally only near the ligand).</p>
${back}

${head('m-docking')}
<p>Open <span class="ui">NEW DOCKING PROJECT</span> and work down the parameters panel.</p>
<h3>9.1 Inputs</h3>
<p>Load the receptor and the ligand (<a href="#manual/m-loading">chapter 5</a>). Prepared PDBQT files are the
usual inputs, but any supported format can be docked. Before the run QuarkSuit warns, above the start button,
when the ligand or protein has no hydrogens (docking still runs, but N&ndash;H and O&ndash;H donors are then
not recognised) or when residues inside the box are missing heavy atoms.</p>
<h3>9.2 Grid box</h3>
<p>The box is the region searched; every pose lies inside it. <span class="ui">Center</span> and
<span class="ui">Size</span> are in &aring;ngstr&ouml;ms (1&ndash;200&nbsp;&Aring; per side). Drag a field sideways to
change it, double-click it to type a value, or hold <kbd>Shift</kbd> and drag in the 3D view. The ligand's
centre is shown in its Molecule Properties tab.</p>
<div class="table-wrap"><table>
  <tr><th>Situation</th><th>Size per side</th></tr>
  <tr><td>Known pocket, drug-sized ligand</td><td>18&ndash;22 &Aring;</td></tr>
  <tr><td>Known pocket, large or flexible ligand</td><td>22&ndash;30 &Aring;</td></tr>
  <tr><td>Uncertain pocket, a region of the protein</td><td>30&ndash;50 &Aring;</td></tr>
  <tr><td>Blind docking over a small protein</td><td>50&ndash;90 &Aring;; expect long runs</td></tr>
</table></div>
<h3>9.3 Parameters</h3>
<div class="table-wrap"><table>
  <tr><th>Parameter</th><th class="num">Range</th><th class="num">Default</th><th>Meaning</th></tr>
  <tr><td>Exhaustiveness</td><td class="num">1&ndash;200</td><td class="num">8</td><td>Number of independent searches. Run time grows about in proportion.</td></tr>
  <tr><td>Num Poses</td><td class="num">1&ndash;100</td><td class="num">9</td><td>Most distinct poses to report.</td></tr>
  <tr><td>Energy Range</td><td class="num">1&ndash;10 kcal/mol</td><td class="num">3.0</td><td>How much worse than the best a reported pose may score.</td></tr>
</table></div>
<p>Exhaustiveness 8 suits most drug-like ligands with fewer than about ten rotatable bonds; use 16&ndash;32 for
flexible ligands or results you will publish. If two runs of the same job give clearly different poses, the
exhaustiveness is too low.</p>
<h3>9.4 Exhaustiveness for large boxes</h3>
<p>A box larger than 30&nbsp;&times;&nbsp;30&nbsp;&times;&nbsp;30&nbsp;&Aring; (27&nbsp;000&nbsp;&Aring;&sup3;) needs more searching. QuarkSuit
then raises the exhaustiveness to 8 per 27&nbsp;000&nbsp;&Aring;&sup3; of box, rounded up, at most 200, and notes it
under the slider. You can still set any value; a value below the recommendation is marked. A value you chose
is never lowered, and shrinking the box lowers an automatic value again.</p>
<div class="table-wrap"><table class="plain">
  <tr><th>Cubic box</th><th class="num">Volume (&Aring;&sup3;)</th><th class="num">Exhaustiveness</th></tr>
  <tr><td>30 &Aring; or smaller</td><td class="num">&le; 27 000</td><td class="num">your value</td></tr>
  <tr><td>40 &Aring;</td><td class="num">64 000</td><td class="num">19</td></tr>
  <tr><td>50 &Aring;</td><td class="num">125 000</td><td class="num">38</td></tr>
  <tr><td>60 &Aring;</td><td class="num">216 000</td><td class="num">64</td></tr>
  <tr><td>80 &Aring;</td><td class="num">512 000</td><td class="num">152</td></tr>
  <tr><td>90 &Aring; and above</td><td class="num">&ge; 729 000</td><td class="num">200</td></tr>
</table></div>
<h3>9.5 Running</h3>
<p><span class="ui">START DOCKING</span> starts the run. A progress window shows the stages (preparing receptor,
preparing ligand, generating search space, running docking, analysing poses, calculating RMSD, finalising)
with elapsed time. The panel is locked during the run so that it always shows what is being docked; the view
can still be rotated. <span class="ui">Cancel Docking</span> stops the run and keeps the best poses found so far.
At the end the terminal reports the best affinity and the <span class="ui">Docking Analysis</span> window opens.</p>
<h3 id="engine">9.6 How the engine works</h3>
<p>The engine follows AutoDock Vina. Poses are scored with the Vina empirical function: steric gauss and
repulsion terms, hydrophobic and hydrogen-bond terms, a penalty outside the box, and a division by a term in
the number of active torsions. For the same pose it gives the same affinity as AutoDock Vina 1.2.</p>
<p>The receptor's contribution is precomputed on grids around the box, one per ligand atom type, by the
processor cores, the graphics card or both (Settings). Each of the <i>exhaustiveness</i> searches is an
independent Monte Carlo run in which every step is refined by BFGS optimisation of position, orientation and
torsion angles; the searches share all processor cores. The final poses are refined and scored exactly, not on
the grids, then clustered so that reported poses are distinct, ranked, and filtered by the energy range.</p>
<p>The torsions come from the ligand's PDBQT torsion tree when the file is used unchanged; otherwise QuarkSuit
builds the tree from the bonds, keeping amide C&ndash;N bonds and ring bonds rigid. Ligands from every format
are therefore docked flexibly. The number of torsions is written in the terminal at the start of the run.</p>
${back}

${head('m-analysis')}
<h3>Poses</h3>
<p>The <span class="ui">Docking Analysis</span> window lists the poses from best to worst, for example
<i>Pose 1 | Final Affinity: -7.75 kcal/mol</i>. Clicking a pose shows it in the 3D view. A more negative
affinity is a stronger predicted binding.</p>
<h3>RMSD against a reference ligand</h3>
<p><span class="ui">Load Reference Ligand (co-crystal)</span> takes the experimental position of the ligand
(PDB or PDBQT). Each pose's heavy-atom RMSD from it is shown, without superposition. Atoms are paired by
chemical structure, not file order, so a reference written in a different atom order or without hydrogens is
measured correctly, and symmetric groups are matched the best way.</p>
<div class="table-wrap"><table class="plain">
  <tr><th>Colour</th><th>RMSD</th><th>Meaning</th></tr>
  <tr><td>green</td><td>below 2.0 &Aring;</td><td>The pose reproduces the experimental binding mode.</td></tr>
  <tr><td>yellow</td><td>2.0&ndash;3.5 &Aring;</td><td>Similar placement with differences.</td></tr>
  <tr><td>red</td><td>3.5 &Aring; or more</td><td>A different binding mode.</td></tr>
</table></div>
<h3 id="interactions">Interactions</h3>
<p><span class="ui">Radius (A)</span> (1&ndash;10&nbsp;&Aring;, default 4) and <span class="ui">Find Interactions</span>
list every contact between heavy atoms of the selected pose and the protein within the radius, nearest first,
and draw them in the 3D view. Each contact gets the first type in this list that applies:</p>
<div class="table-wrap"><table>
  <tr><th>Type</th><th>Rule</th></tr>
  <tr><td>Metal Coord</td><td>A metal atom on either side, closer than 2.8 &Aring;.</td></tr>
  <tr><td>Unfavorable Bump</td><td>Non-polar atoms overlapping more than 0.85 &Aring; inside the sum of their van der Waals radii.</td></tr>
  <tr><td>Conventional H-Bond</td><td>N or O on both sides within 3.5 &Aring;, one able to donate and the other to accept; where hydrogen positions are fixed, their angle is checked too.</td></tr>
  <tr><td>Salt Bridge</td><td>A charged ligand N or O and an oppositely charged side chain within 4.0 &Aring;.</td></tr>
  <tr><td>Attractive Charge</td><td>The same pair within 5.0 &Aring;.</td></tr>
  <tr><td>Pi-Cation</td><td>Aromatic ligand atom and a basic side chain within 5.5 &Aring;.</td></tr>
  <tr><td>Pi-Pi Stacked</td><td>Aromatic ligand atom and an aromatic side chain within 5.5 &Aring;.</td></tr>
  <tr><td>Pi-Sigma</td><td>Aromatic ligand atom and a protein N or O within 5.0 &Aring;.</td></tr>
  <tr><td>Carbon H-Bond</td><td>Ligand carbon and protein N or O within 3.8 &Aring;.</td></tr>
  <tr><td>Pi-Alkyl</td><td>Aromatic ligand atom and a non-aromatic protein carbon within 5.0 &Aring;.</td></tr>
  <tr><td>Alkyl</td><td>Ligand carbon and a carbon of a hydrophobic residue within 5.0 &Aring;.</td></tr>
  <tr><td>van der Waals</td><td>Any other contact within the radius.</td></tr>
</table></div>
<p>The default radius finds hydrogen bonds and close contacts; raise it to 5.5&nbsp;&Aring; to include
&pi;-stacking and &pi;-cation contacts. <span class="ui">Interaction line style&hellip;</span> opens
<span class="ui">Tools &rsaquo; Interactions</span>.</p>
${back}

${head('m-diagram')}
<p><span class="ui">Generate 2D Map</span> draws the selected pose in two dimensions, surrounded by the residues
it touches, with lines coloured by contact type and a legend. The tabs along the top set:</p>
<dl>
  <dt>Residues</dt><dd>Size, shape (circle, diamond, capsule, hexagon), distance from the ligand, label size, font, style, text colour and outline.</dd>
  <dt>Ligand</dt><dd>Size, rotation, font and style, atom labels, ball-and-stick drawing.</dd>
  <dt>Interactions</dt><dd>Line width, dashed, dotted or solid lines, colour by type or one colour.</dd>
  <dt>Canvas</dt><dd>Background colour, with a one-click white background for figures.</dd>
  <dt>Fix Layout</dt><dd>Redraws the ligand as a clean 2D structure with RDKit. Best when the ligand came from SDF or MOL2, which keep bond orders.</dd>
  <dt>Save Image&hellip;</dt><dd>Saves the diagram and legend as PNG or JPG. For a set resolution use <span class="ui">File &rsaquo; Export &rsaquo; 2D Schematic Map</span>.</dd>
</dl>
${back}

${head('m-saving')}
<dl>
  <dt>File &rsaquo; Save Complex As&hellip;</dt><dd>The protein together with a ligand pose, chosen in a list, as PDB, mmCIF, MOL2, SDF or PDBQT, for PyMOL, Chimera or Discovery Studio.</dd>
  <dt>File &rsaquo; Save Docking Result&hellip;</dt><dd>A text report of the last run (<a href="#manual/m-report">chapter 13</a>).</dd>
  <dt>File &rsaquo; Save Project</dt><dd>Everything in a <code>.qs</code> file.</dd>
  <dt>File &rsaquo; Export</dt><dd>The 3D view or the 2D diagram as PNG (lossless) or JPG. The menus and tool windows are left out of the image.</dd>
</dl>
<div class="table-wrap"><table class="plain">
  <tr><th>Export quality</th><th class="num">Pixels</th></tr>
  <tr><td>Best (4K)</td><td class="num">3840 &times; 2160</td></tr>
  <tr><td>High (2K)</td><td class="num">2560 &times; 1440</td></tr>
  <tr><td>Normal (1080p)</td><td class="num">1920 &times; 1080</td></tr>
  <tr><td>Medium (720p)</td><td class="num">1280 &times; 720</td></tr>
  <tr><td>Custom</td><td class="num">any width &times; height</td></tr>
</table></div>
${back}

${head('m-report')}
<p><span class="ui">File &rsaquo; Save Docking Result&hellip;</span> writes a plain UTF-8 text record of the run, for a
lab notebook or supplementary material. It records the values in force when the docking started.</p>
<dl>
  <dt>Input structures</dt><dd>Receptor and ligand files, atom and heavy-atom counts, rotatable bonds, reference ligand.</dd>
  <dt>Search space</dt><dd>Box centre, size and volume.</dd>
  <dt>Parameters</dt><dd>Exhaustiveness (and whether it was raised automatically), poses requested and returned, energy range, scoring function, search algorithm, compute mode.</dd>
  <dt>Run time</dt><dd>Start and end, elapsed time, processor, threads, total CPU time.</dd>
  <dt>Results</dt><dd>Every pose with its affinity, rmsd l.b. and rmsd u.b. from pose 1, and the RMSD from the reference ligand when one is loaded.</dd>
</dl>
<p>As in AutoDock Vina's output, both RMSD columns compare each pose with pose 1 on heavy atoms: <b>rmsd u.b.</b>
pairs atoms one to one in file order; <b>rmsd l.b.</b> pairs each atom with the nearest atom of the same type, so
a flipped symmetric ring counts as the same pose.</p>
<pre>  mode |   affinity | rmsd l.b. | rmsd u.b. | RMSD vs ref
       | (kcal/mol) |    (&Aring;)    |    (&Aring;)    |     (&Aring;)
     1 |     -7.750 |     0.000 |     0.000 |       0.674</pre>
${back}

${head('m-vis')}
<p>The Visualization workspace shows any number of structures together. Drag files onto the window or use
<span class="ui">Open files&hellip;</span> (PDB, PDBQT, mmCIF, SDF, MOL2, MOL, XYZ, GJF). A file with several
models opens as one object per model.</p>
<ul>
  <li>Each object is split into chains, ligands, ions and water, each with an eye icon to show or hide it; the waste-bin icon removes an object.</li>
  <li>Click items to select them (<kbd>Ctrl</kbd>+click for several); double-click to zoom to one. <span class="ui">Zoom to selection</span>, <span class="ui">Show only selected</span>, <span class="ui">Hide</span>, <span class="ui">Show</span>, <span class="ui">Delete selected</span>, <span class="ui">Clear selection</span> and <span class="ui">Show all</span> act on the selection.</li>
  <li>Select a ligand, and optionally chains, set <span class="ui">Contact distance</span> and click <span class="ui">Show interactions</span>.</li>
  <li>The View and Tools menus and image export work as in the docking workspace. Visualization keeps its own undo history.</li>
</ul>
${back}

${head('m-editor')}
<p><span class="ui">LIGAND OPTIMIZATION</span> opens the editor: a molecule library on the left, the 2D drawing
and the 3D view side by side, and status and log lines below. Both views show the same molecule; an edit in
one appears in the other.</p>
<h3>Menus</h3>
<div class="table-wrap"><table>
  <tr><td>File</td><td>New molecule, Open molecule, Molecule format, Add H on save, Save molecule, Export 2D image, Export 3D image, Image scale, Image format and size, Home.</td></tr>
  <tr><td>Edit</td><td>Undo, Redo, Delete selection, Deselect, Clean 2D, Hydrogens (add all, add polar, remove, show), Fit views, Reset 3D view, Atom labels, Atom colors, Background.</td></tr>
  <tr><td>Minimization</td><td>Force field, algorithm, steps and tolerance; Rebuild 3D from the drawing first; Minimize; Cancel operation; Show last energy graph.</td></tr>
  <tr><td>Help</td><td>Command Guide (<kbd>F1</kbd>).</td></tr>
</table></div>
<h3>Drawing</h3>
<p>2D tools: <span class="ui">Select / move</span>, <span class="ui">Draw bonds</span>, <span class="ui">Change atom</span>,
<span class="ui">Erase</span> and <span class="ui">Stretch bond</span>. Click empty space to place an atom of the chosen
element and drag from an atom to add a bonded one; bond angles snap to 30&deg; steps, <kbd>Alt</kbd> places freely.
Bonds can be single, double, triple or aromatic, and wedge or hashed. The library holds rings, aromatic systems,
functional groups, reference drugs and the 20 amino acids; SMILES can be pasted. Valence errors are reported
and must be fixed before 3D work, minimisation or export.</p>
<h3>Editing in 3D</h3>
<p>3D tools: <span class="ui">Orbit / select</span>, <span class="ui">Move atom</span> (<kbd>Shift</kbd> moves in depth),
<span class="ui">Change atom</span>, <span class="ui">Change bond</span>, <span class="ui">Rotate bond</span> (drag a single
bond's handle sideways) and <span class="ui">Stretch bond</span>. Ring and multiple bonds cannot be twisted. The 3D view
keeps your coordinates; Clean 2D, Rebuild 3D and Minimize run only when chosen, and Undo reverses them.</p>
<h3>Minimisation</h3>
<div class="table-wrap"><table>
  <tr><th>Force field</th><th>Choose it for</th></tr>
  <tr><td>MMFF94</td><td>Typical drug-like organic molecules. No metals.</td></tr>
  <tr><td>MMFF94s</td><td>As MMFF94 with planar nitrogens; closer to crystal geometries.</td></tr>
  <tr><td>UFF</td><td>Molecules with metals or unusual elements; covers the whole periodic table.</td></tr>
</table></div>
<p>Algorithms: conjugate gradients, steepest descent, steepest descent then conjugate gradients, and L-BFGS
(recommended). The run stops at the step limit or when the RMS force falls below the tolerance. A window shows
the energy of every step, the initial and final energy, the RMS force, the atom movement and an animation of the
structure, which <span class="ui">Replay animation</span> plays again. The graph can be saved as PNG, JPEG, BMP or
SVG and the steps as CSV. If the force field has no parameters for an atom, minimisation stops with an error and
the molecule is unchanged; energies from different force fields cannot be compared.</p>
<h3>Saving</h3>
<p>Choose the format under <span class="ui">File &rsaquo; Molecule format</span> (SDF, PDB, PDBQT, MOL2, MOL, XYZ,
SMILES, CML), then <span class="ui">Save molecule</span>. PDBQT is written with Gasteiger charges and a torsion tree,
ready for docking. Keep an SDF copy as the master: it keeps bond orders, charges and stereochemistry.</p>
${back}

${head('m-validation')}
<p>Redocking a co-crystal ligand into its own receptor is the standard check of a docking setup. Results with
QuarkSuit v1 are on the <a href="#home">home page</a>; the tutorial reproduces the first of them.</p>
<ul>
  <li>The scoring function is AutoDock Vina's, so QuarkSuit shares its strengths and its limits. Affinities are
  estimates with an error of a few kcal/mol; rankings between very different ligands are less reliable than poses.</li>
  <li>Partial charges are not part of the score. They are written to PDBQT files for AutoDock4-style programs.</li>
  <li>Metal coordination is described only roughly, as in Vina. Ligands that bind through a metal (for example 4WMY)
  may not be reproduced.</li>
  <li>The receptor is rigid. Side chains that move when the ligand binds are not modelled.</li>
  <li>Protonation at a chosen pH uses typical group p<i>K</i><sub>a</sub> values, not predictions for each site.</li>
</ul>
${back}

${head('m-trouble')}
<dl>
  <dt>The window does not open, or a graphics error appears</dt>
  <dd>QuarkSuit needs OpenGL 2.0. Without a working driver it restarts with its software renderer and says so in the
  terminal; otherwise it explains the problem and offers the driver download page. <code>--gl-info</code> shows the renderer.</dd>
  <dt>"Check input file, non-protein residue." or "protein residue."</dt>
  <dd>The file was loaded with the wrong button (<a href="#manual/m-loading">chapter 5</a>). For a complex, Load Ligand
  offers the ligands inside it.</dd>
  <dt>The best pose scores poorly and lies far from the known site</dt>
  <dd>Check that the co-crystal ligand was deleted from the receptor, that the box covers the pocket, and that
  the receptor has polar hydrogens.</dd>
  <dt>Results change between repeated runs</dt>
  <dd>Double the exhaustiveness. Check that the box is not much larger than needed.</dd>
  <dt>The best pose sits at the edge of the box</dt>
  <dd>The box does not contain the whole pocket: enlarge it or move its centre.</dd>
  <dt>Docking is slow</dt>
  <dd>Make the box fit the pocket (large boxes raise the exhaustiveness), remove chains you do not need, or choose
  GPU or Hybrid grids in Settings.</dd>
  <dt>GPU grids fall back to the processor</dt>
  <dd>The terminal gives the reason. Install the graphics driver from the card's maker; the Windows basic display
  driver has no OpenCL. The docking still completes.</dd>
  <dt>Preparation stops with an error</dt>
  <dd>The summary window and the terminal give the reason, for example Kollman charges on an atom the table does not
  cover, or minimisation of a structure with a metal. Nothing was changed; choose other options and run again.</dd>
  <dt>Fix Layout does not change the diagram</dt>
  <dd>The bundled Python could not run; the terminal shows why. Reinstalling restores it.</dd>
  <dt>QuarkSuit closed unexpectedly</dt>
  <dd>A crash report is written to <code>%APPDATA%\\QuarkSuit\\crashes</code>. Please send it to the developers with a short
  description of what you were doing.</dd>
</dl>
${back}

${head('m-glossary')}
<dl>
  <dt>&Aring;ngstr&ouml;m (&Aring;)</dt><dd>10<sup>&minus;10</sup>&nbsp;m. A C&ndash;C bond is about 1.5&nbsp;&Aring;.</dd>
  <dt>Affinity</dt><dd>The predicted binding free energy of a pose in kcal/mol; more negative is stronger.</dd>
  <dt>Co-crystal ligand</dt><dd>A ligand bound in an experimental structure; its position is the reference for redocking.</dd>
  <dt>Exhaustiveness</dt><dd>The number of independent searches in a docking run.</dd>
  <dt>Formal charge</dt><dd>The charge assigned to an atom by its bonding (for example &minus;1 on a carboxylate oxygen).</dd>
  <dt>Gasteiger charges</dt><dd>Partial charges computed from connectivity by equalising electronegativity (Gasteiger&ndash;Marsili).</dd>
  <dt>Grid box</dt><dd>The rectangular region in which the ligand is docked.</dd>
  <dt>Heavy atom</dt><dd>Any atom other than hydrogen.</dd>
  <dt>Kollman charges</dt><dd>Tabulated united-atom charges for standard amino acids, used with polar-hydrogen receptors in AutoDock.</dd>
  <dt>PDBQT</dt><dd>AutoDock's format: PDB coordinates with partial charge (Q) and atom type (T), and a torsion tree for ligands.</dd>
  <dt>Polar hydrogens</dt><dd>Hydrogens on N, O or S, which can take part in hydrogen bonds.</dd>
  <dt>Pose</dt><dd>One predicted position, orientation and conformation of the ligand.</dd>
  <dt>Redocking</dt><dd>Docking a co-crystal ligand back into its receptor to test a setup.</dd>
  <dt>RMSD</dt><dd>Root-mean-square deviation between the atom positions of two poses, in &Aring;.</dd>
  <dt>Torsion (rotatable bond)</dt><dd>A single, non-ring bond that the search may turn.</dd>
</dl>
${back}

${head('m-refs')}
<h3>Methods used by QuarkSuit</h3>
<ol>
  <li>O. Trott, A. J. Olson. AutoDock Vina: improving the speed and accuracy of docking with a new scoring function, efficient optimization, and multithreading. <i>J. Comput. Chem.</i> 31, 455&ndash;461 (2010).</li>
  <li>J. Eberhardt, D. Santos-Martins, A. F. Tillack, S. Forli. AutoDock Vina 1.2.0: new docking methods, expanded force field, and Python bindings. <i>J. Chem. Inf. Model.</i> 61, 3891&ndash;3898 (2021).</li>
  <li>J. Gasteiger, M. Marsili. Iterative partial equalization of orbital electronegativity: a rapid access to atomic charges. <i>Tetrahedron</i> 36, 3219&ndash;3228 (1980).</li>
  <li>A. K. Rapp&eacute; <i>et al.</i> UFF, a full periodic table force field for molecular mechanics and molecular dynamics simulations. <i>J. Am. Chem. Soc.</i> 114, 10024&ndash;10035 (1992).</li>
  <li>T. A. Halgren. Merck molecular force field. I. Basis, form, scope, parameterization, and performance of MMFF94. <i>J. Comput. Chem.</i> 17, 490&ndash;519 (1996).</li>
  <li>RDKit: open-source cheminformatics. <a href="https://www.rdkit.org">https://www.rdkit.org</a></li>
</ol>
<h3>Credits</h3>
<p>QuarkSuit is developed at the TCCG Center, University of Zakho (<a href="#people">People</a>). The third-party
components it includes and their licences are listed on the <a href="#download/licence">Download</a> page.</p>
${back}
`,
};
