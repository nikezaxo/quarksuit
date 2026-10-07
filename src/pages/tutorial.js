const fig = (n, file, caption, alt) => `
<figure id="fig${n}">
  <img src="tutorial/${file}" loading="lazy" alt="${alt || caption.replace(/<[^>]+>/g, '')}">
  <figcaption><b>Figure ${n}.</b> ${caption}</figcaption>
</figure>`;

export const tutorial = {
  title: 'Tutorial',
  render: () => `
<h1>Tutorial: redocking biotin into streptavidin</h1>

<p>This tutorial takes one crystal structure from the Protein Data Bank through the whole
workflow: preparing the receptor, taking the ligand out of the same file, docking it back and
checking the result against the crystal. Streptavidin&ndash;biotin (PDB <a href="https://www.rcsb.org/structure/1STP">1STP</a>;
Weber <i>et al.</i>, <i>Science</i> 243, 85&ndash;88, 1989) is a good first system: the complex is
tight, the ligand small, and a correct pose is easy to recognise.</p>

<p>Every figure below is a screenshot of QuarkSuit v1 taken during an actual run of these
steps. Allow about fifteen minutes.</p>

<div class="toc">
  <p class="toc-title">Contents</p>
  <ol>
    <li><a href="#tutorial/t-files">Files</a></li>
    <li><a href="#tutorial/t-open">Opening the receptor</a></li>
    <li><a href="#tutorial/t-cocrystal">Removing the co-crystal ligand</a></li>
    <li><a href="#tutorial/t-prepare">Preparing the receptor</a></li>
    <li><a href="#tutorial/t-ligand">Taking the ligand from the complex</a></li>
    <li><a href="#tutorial/t-ligprep">Preparing the ligand</a></li>
    <li><a href="#tutorial/t-dock">Setting up the docking</a></li>
    <li><a href="#tutorial/t-results">Results and RMSD</a></li>
    <li><a href="#tutorial/t-contacts">Interactions and the 2D diagram</a></li>
    <li><a href="#tutorial/t-save">Saving the work</a></li>
    <li><a href="#tutorial/t-vis">The Visualization workspace</a></li>
    <li><a href="#tutorial/t-editor">The ligand editor</a></li>
  </ol>
</div>

<h2 id="t-files">1. Files</h2>
<p>You need only <a href="tutorial/files/1STP.pdb">1STP.pdb</a>, as downloaded from the Protein
Data Bank. Make a folder for the tutorial and put the file in it; the screenshots use
<code>C:\\Users\\Nihad\\Desktop\\docking\\tutorial</code>. The files you will create are also
available on the <a href="#download/tutorial-files">Download</a> page, so you can compare yours.</p>
${fig(1, '01-home.png', 'The home screen. Each of the four buttons opens a workspace and starts a fresh session.')}

<h2 id="t-open">2. Opening the receptor</h2>
<p>Click <span class="ui">PREPARE STRUCTURES</span>, then <span class="ui">Load Protein (PDB/PDBQT)</span>
in <span class="ui">1. Molecular Inputs</span>, and choose <code>1STP.pdb</code>. The protein
appears in the 3D view and the <span class="ui">Molecule Properties</span> window opens with a
report on the file (figure 2).</p>
${fig(2, '02-prep-properties.png', 'After opening 1STP.pdb. The Molecule Properties window reports what the file contains before anything is changed.')}
<p>Read the report before you change anything. For 1STP it says:</p>
<ul>
  <li><b>No hydrogens</b> and <b>no partial charges</b>: normal for a crystal structure; both are added below.</li>
  <li><b>38 missing residues</b>: residues 1&ndash;12 and 134&ndash;159 were not seen in the experiment (REMARK 465).
  They are the flexible ends of the chain, far from the biotin site, so they do not matter here.</li>
  <li><b>84 waters</b> and one hetero group, <b>BTN A300</b>: the biotin.</li>
  <li>X-ray structure at 2.60&nbsp;&Aring;, one chain of 121 residues, no missing side-chain atoms.</li>
</ul>
<p>Close the window when you have read it; <span class="ui">View &rsaquo; Molecule Properties</span>
opens it again.</p>

<h2 id="t-cocrystal">3. Removing the co-crystal ligand</h2>
<p>The receptor must not contain the ligand you are going to dock. Scroll the panel down to
<span class="ui">Co-Crystal / Water / Ions</span>: biotin is listed as <span class="ui">[L] BTN</span>.
Click the waste-bin icon at the end of its row. The terminal confirms
<i>Removed BTN (16 atoms)</i>.</p>
${fig(3, '03b-prep-hetero.png', 'The Co-Crystal / Water / Ions list. [W] marks water, [L] a ligand; the eye icon only hides a group, the waste-bin icon deletes it.')}
<div class="note warn"><b>Do not skip this.</b> When we left the biotin in the receptor by
mistake, the pocket was already filled: the best pose scored only &minus;4.3 kcal/mol and landed
7&nbsp;&Aring; away from the crystal position.</div>

<h2 id="t-prepare">4. Preparing the receptor</h2>
<p>Scroll back up to <span class="ui">Prepare Structures</span> and set the options as in figure 4:</p>
<ol>
  <li><span class="ui">1. Remove waters</span> &ndash; ticked. There is no metal ion here, so
  <span class="ui">Keep waters bound to metal ions</span> makes no difference.</li>
  <li><span class="ui">2. Add hydrogens</span> &ndash; ticked, <span class="ui">Hydrogen type</span>
  <span class="ui">Polar only (docking)</span>.</li>
  <li><span class="ui">Use selected pH</span> &ndash; ticked, pH 7.40. Asp and Glu become charged,
  Lys and Arg protonated, and the chain ends charged.</li>
  <li><span class="ui">3. Minimize geometry</span> &ndash; not needed for a crystal structure.</li>
  <li><span class="ui">4. Partial charges</span> &ndash; ticked, <span class="ui">Charge model</span> <span class="ui">Gasteiger</span>.</li>
</ol>
${fig(4, '03-prep-options.png', 'Preparation options for the receptor. The explanation under each option changes with the choice.')}
<p>Click <span class="ui">Proceed</span> at the end of the options. A progress window follows the
steps (figure 5); the work runs in the background and <span class="ui">Cancel</span> stops it
without changing the protein.</p>
<figure id="fig5">
  <img src="tutorial/prep-progress.gif" loading="lazy" width="396" height="304" alt="Protein preparation progress window">
  <figcaption><b>Figure 5.</b> The protein preparation window during the run (recorded, shown at real speed).</figcaption>
</figure>
<p>When it finishes, the report updates (figure 6): <b>Polar hydrogens only</b>, <b>Gasteiger
charges</b>, 213 polar hydrogens and no waters. Save the receptor with
<span class="ui">Save prepared protein &rsaquo; PDBQT</span> as <code>1stp_receptor.pdbqt</code>.
PDBQT keeps the partial charges and AutoDock atom types; PDB would not.</p>
${fig(6, '05-prep-checked.png', 'The prepared receptor. The Molecule Properties window checks the structure again after preparation.')}

<h2 id="t-ligand">5. Taking the ligand from the complex</h2>
<p>The same PDB file also holds the ligand. Click <span class="ui">Load Ligand (PDB/SDF/PDBQT)</span>
and choose <code>1STP.pdb</code> again. Because the file contains a protein, QuarkSuit does not
load it as a ligand; instead it lists the ligands inside it (figure 7). Select
<span class="ui">BTN A300</span> and click <span class="ui">Load ligand</span>. Only the 16 biotin
atoms are loaded.</p>
${fig(7, '06-ligand-from-complex.png', 'Load Ligand on a protein file: the ligands in the file can be taken out one at a time.')}
<p>Before changing anything, save this crystal ligand once with <span class="ui">Save prepared ligand &rsaquo; PDB</span>
as <code>btn_crystal.pdb</code>. It is the experimental position the docked poses will be compared with.</p>

<h2 id="t-ligprep">6. Preparing the ligand</h2>
<p>In the <span class="ui">Ligand</span> part of <span class="ui">Prepare Structures</span>:
<span class="ui">1. Add hydrogens</span> with <span class="ui">Polar only (docking)</span>,
<span class="ui">Use selected pH</span> at 7.40, and <span class="ui">3. Assign Gasteiger charges</span>.
Click <span class="ui">Proceed</span>.</p>
${fig(8, '07-ligand-prepared.png', 'The ligand after preparation. Biotin\'s carboxylic acid is ionised at pH 7.4, so the ligand has a net charge of -1 and two polar hydrogens, on the ureido nitrogens.')}
<p>Save it with <span class="ui">Save prepared ligand &rsaquo; PDBQT</span> as <code>btn_ligand.pdbqt</code>.
The PDBQT file also holds the torsion tree: biotin has 5 rotatable bonds.</p>

<h2 id="t-dock">7. Setting up the docking</h2>
<p>Click <span class="ui">&laquo; HOME</span>. QuarkSuit asks whether to close the preparation
session; you have saved both files, so answer <span class="ui">Yes</span>. Then click
<span class="ui">NEW DOCKING PROJECT</span>. Load <code>1stp_receptor.pdbqt</code> with
<span class="ui">Load Protein</span> and <code>btn_ligand.pdbqt</code> with
<span class="ui">Load Ligand</span>.</p>
<p>The search box goes over the binding site. The ligand is still in its crystal position, so
its centre is the right place: the Molecule Properties window of the ligand gives it as
(11.3, 1.4, &minus;10.5)&nbsp;&Aring;. In <span class="ui">2. Grid Box</span> enter this as
<span class="ui">Center</span> and 20&nbsp;&Aring; for each <span class="ui">Size</span>.
Double-click a field to type a value.</p>
${fig(9, '08-docking-setup.png', 'Receptor, ligand and the 20 &times; 20 &times; 20 &Aring; box. The ligand lies inside the box.')}
<p>Leave <span class="ui">4. Docking Configuration</span> at its defaults: Exhaustiveness 8,
Num Poses 9, Energy Range 3.0&nbsp;kcal/mol. Click <span class="ui">START DOCKING</span>. The panel
is locked during the run, and a progress window shows the stage (figure 10).</p>
${fig(10, '09-docking-running.png', 'Docking in progress. The terminal reports the number of rotatable bonds and, later, how the energy grids were built.')}

<h2 id="t-results">8. Results and RMSD</h2>
<p>When the run ends, the <span class="ui">Docking Analysis</span> window lists the poses from the
best score down. Click <span class="ui">Load Reference Ligand (co-crystal)</span> and choose
<code>btn_crystal.pdb</code>: every pose gets its RMSD from the crystal position, coloured green
below 2&nbsp;&Aring;, yellow to 3.5&nbsp;&Aring;, red above.</p>
${fig(11, '10-docking-results.png', 'Docking results with the crystal ligand as reference. Pose 1 scores -7.75 kcal/mol and lies 0.67 &Aring; from the crystal pose.')}
<p>Pose 1 reproduces the crystal binding mode (0.67&nbsp;&Aring;). That is the purpose of a
redocking: it shows that the preparation, the box and the settings work for this receptor,
before you dock compounds whose binding mode you do not know. Repeating the run with the same
settings on the same computer gave identical results in our tests.</p>

<h2 id="t-contacts">9. Interactions and the 2D diagram</h2>
<p>With pose 1 selected, click <span class="ui">Find Interactions</span>. The contacts are listed
and drawn in the 3D view (figure 12); <span class="ui">Radius (A)</span> sets how far to look.</p>
${fig(12, '11-interactions.png', 'Contacts of pose 1 drawn in the 3D view, coloured by type.')}
<p><span class="ui">Generate 2D Map</span> draws the same contacts as a diagram (figure 13). The
hydrogen bonds to Asn23, Ser27, Tyr43, Ser45, Asn49, Ser88 and Asp128, and the tryptophans around
the ring system, are those described for the crystal structure. Use <span class="ui">Canvas</span>
to set a white background and <span class="ui">Save Image&hellip;</span> for a figure.</p>
${fig(13, '12-interaction-map.png', 'The 2D interaction diagram of pose 1. Green: hydrogen bonds; pink: hydrophobic contacts; grey: van der Waals.')}

<h2 id="t-save">10. Saving the work</h2>
<ul>
  <li><span class="ui">File &rsaquo; Save Docking Result&hellip;</span> writes a text report: inputs, box,
  settings, run time, and every pose with its affinity and RMSD values.</li>
  <li><span class="ui">File &rsaquo; Save Complex As&hellip;</span> writes the receptor with a chosen pose as
  PDB, mmCIF, MOL2, SDF or PDBQT for PyMOL, Chimera or Discovery Studio.</li>
  <li><span class="ui">File &rsaquo; Save Project</span> keeps everything, including the results, in a
  <code>.qs</code> file that opens again later.</li>
</ul>

<h2 id="t-vis">11. The Visualization workspace</h2>
<p>From the home screen, <span class="ui">VISUALIZATION</span> opens a viewer for any number of
structures. Drag files onto the window or use <span class="ui">Open files&hellip;</span>. Each file is
split into its chains, ligands, ions and waters, which can be shown, hidden, selected or deleted
(figure 14). Select a ligand and a chain and click <span class="ui">Show interactions</span> to see
their contacts.</p>
${fig(14, '13-visualization.png', '1STP.pdb in the Visualization workspace: one chain, the biotin and 84 waters, each listed separately.')}

<h2 id="t-editor">12. The ligand editor</h2>
<p><span class="ui">DESIGN SMALL MOLECULES</span> opens the molecule editor: a 2D drawing and a 3D view of
the same molecule. Open <a href="tutorial/files/imatinib.sdf">imatinib.sdf</a> with
<span class="ui">File &rsaquo; Open molecule&hellip;</span>; <span class="ui">Edit &rsaquo; Clean 2D</span>
tidies the drawing without moving the 3D atoms (figure 15).</p>
${fig(15, '14-ligand-editor.png', 'Imatinib in the ligand editor. Edits in either view update the other.')}
<p><span class="ui">Minimization &rsaquo; Minimize</span> relaxes the 3D structure with the chosen force
field. The window shows the energy of every step and replays the structure as it moved
(figure 16).</p>
${fig(16, '15-minimization.png', 'Minimisation of imatinib with MMFF94 and L-BFGS: 688 steps, from 137.3 to 89.0 kcal/mol, stopped when the RMS force fell below 0.01 kcal/mol/&Aring;.')}
<figure id="fig17">
  <img src="tutorial/minimize.gif" loading="lazy" width="300" height="260" alt="Imatinib moving during minimisation">
  <figcaption><b>Figure 17.</b> The replay of the same minimisation.</figcaption>
</figure>

<p class="back"><a href="#tutorial">Back to the top</a> &middot; <a href="#documentation">Documentation</a></p>
`,
};
