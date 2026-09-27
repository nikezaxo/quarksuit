export const home = {
  title: 'Home',
  render: () => `
<figure class="float-right">
  <img src="tutorial/complex-rotate.gif" width="440" height="300" alt="Streptavidin (PDB 1STP) turning in the QuarkSuit 3D view">
  <figcaption>Streptavidin with its crystal waters (PDB 1STP) in the Visualization workspace.</figcaption>
</figure>

<p class="lead">QuarkSuit is a Windows program for structure-based drug design. It prepares a
protein receptor and a ligand, docks the ligand into a binding site with a built-in engine
that uses the AutoDock Vina scoring function, and helps you study and report the result.</p>

<p>Everything runs on your own computer. QuarkSuit needs no internet connection, no
administrator rights and no other programs: the docking engine and the chemistry toolkit
are part of the installation.</p>

<p><b>Current version:</b> QuarkSuit v1 (1.0) for Windows 10 and 11, 64-bit.
&nbsp;<a href="#download">Download</a> &middot; <a href="#tutorial">Tutorial</a> &middot; <a href="#manual">Manual</a></p>

<h2>What it does</h2>
<dl>
  <dt>Structure preparation</dt>
  <dd>Remove waters (optionally keeping those bound to metal ions), add polar or all hydrogens,
  set protonation states for a chosen pH, relax the geometry with UFF, MMFF94 or MMFF94s, and
  assign Gasteiger or Kollman partial charges. Proteins and ligands are saved as PDB, PDBQT or SDF.</dd>
  <dt>Molecule properties</dt>
  <dd>Each molecule you open is checked: hydrogens (none, polar only or all), partial charges and
  their model, net charge, missing atoms and residues, chain breaks, metals and hetero groups.
  For a ligand also its formal charge, torsion tree, descriptors and drug-likeness rules.</dd>
  <dt>Docking</dt>
  <dd>Flexible-ligand docking in a box you place over the binding site. Poses are scored with the
  Vina function and searched by Monte Carlo with local optimisation on all processor cores.
  Receptor energy grids can be built on the graphics card (OpenCL).</dd>
  <dt>Analysis</dt>
  <dd>Ranked poses, RMSD against a co-crystal ligand, twelve kinds of protein&ndash;ligand contact,
  a 2D interaction diagram and a plain-text report of the run.</dd>
  <dt>Visualization</dt>
  <dd>Open several structures at once, show or hide chains, ligands, ions and waters, draw
  interactions, and export images up to 3840&nbsp;&times;&nbsp;2160 pixels.</dd>
  <dt>Ligand editor</dt>
  <dd>A 2D sketcher linked to a 3D view, with templates, hydrogen tools and energy minimisation
  that shows its energy curve and the moving structure.</dd>
</dl>

<h2 class="clear">Redocking results</h2>
<p>Redocking puts a crystal ligand back into its own receptor; the top pose should lie within
2&nbsp;&Aring; of the crystal position. Results measured with QuarkSuit v1 (exhaustiveness 8,
box of 20&ndash;24&nbsp;&Aring; centred on the ligand):</p>
<div class="table-wrap"><table>
  <tr><th>Structure</th><th>Ligand</th><th class="num">Best affinity</th><th class="num">RMSD of pose 1</th><th>Notes</th></tr>
  <tr><td>1STP streptavidin</td><td>biotin</td><td class="num">&minus;7.75 kcal/mol</td><td class="num">0.67 &Aring;</td><td>Prepared entirely in QuarkSuit, as in the <a href="#tutorial">tutorial</a>.</td></tr>
  <tr><td>1STP streptavidin</td><td>biotin</td><td class="num">&minus;7.52 kcal/mol</td><td class="num">0.58 &Aring;</td><td>Receptor and ligand prepared with AutoDockTools (AutoDock-GPU test set).</td></tr>
  <tr><td>4ASD VEGFR2</td><td>sorafenib</td><td class="num">&ndash;</td><td class="num">0.55 &Aring;</td><td>AutoDock Vina 1.2 gives 0.59 &Aring; on the same input.</td></tr>
  <tr><td>4WMY intelectin-1</td><td>allyl galactofuranoside</td><td class="num">&ndash;</td><td class="num">about 2.8 &Aring;</td><td>Not reproduced. The ligand's hydroxyl groups coordinate a calcium ion, which the Vina function describes only roughly, so the crystal pose does not score best. A limit of the scoring function, not of the search.</td></tr>
</table></div>
<p class="small muted">On the same pose QuarkSuit gives the same affinity as AutoDock Vina 1.2. Docking is
a prediction: check your own system by redocking a known ligand before screening new ones.</p>

<h2>Citing</h2>
<p>If you publish results obtained with QuarkSuit, please cite the program and the papers that
describe its scoring function. See <a href="#citing">Citing</a>.</p>
`,
};
