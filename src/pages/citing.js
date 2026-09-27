export const citing = {
  title: 'Citing',
  render: () => `
<h1>Citing QuarkSuit</h1>

<p>QuarkSuit has not yet been described in a journal article. Until it is, please cite it as
software, together with the papers describing the methods it uses.</p>

<h2>The program</h2>
<p class="note">TCCG Center, University of Zakho. <i>QuarkSuit</i>, version 1.0 [computer software].
2026.</p>
<pre>@misc{quarksuit2026,
  author = {{TCCG Center, University of Zakho}},
  title  = {QuarkSuit, version 1.0},
  year   = {2026},
  note   = {Software for molecular docking, structure preparation and ligand design}
}</pre>
<p class="small muted">Add the address you downloaded QuarkSuit from, if your journal asks for one.</p>

<h2>The methods</h2>
<p>For docking, cite the AutoDock Vina papers, whose scoring function QuarkSuit uses:</p>
<ol>
  <li>O. Trott, A. J. Olson. AutoDock Vina: improving the speed and accuracy of docking with a new
  scoring function, efficient optimization, and multithreading. <i>J. Comput. Chem.</i> 31, 455&ndash;461 (2010).</li>
  <li>J. Eberhardt, D. Santos-Martins, A. F. Tillack, S. Forli. AutoDock Vina 1.2.0: new docking methods,
  expanded force field, and Python bindings. <i>J. Chem. Inf. Model.</i> 61, 3891&ndash;3898 (2021).</li>
</ol>
<p>If you report partial charges or minimised structures, also cite the method: Gasteiger and Marsili,
<i>Tetrahedron</i> 36, 3219 (1980) for Gasteiger charges; Rapp&eacute; <i>et al.</i>, <i>J. Am. Chem. Soc.</i>
114, 10024 (1992) for UFF; Halgren, <i>J. Comput. Chem.</i> 17, 490 (1996) for MMFF94.</p>

<h2>What to report in a methods section</h2>
<p>A docking can only be repeated if the paper gives its settings. With QuarkSuit these are:</p>
<ul>
  <li>the QuarkSuit version;</li>
  <li>the source of the receptor (PDB code, chain) and what was removed (waters, ligands, chains);</li>
  <li>the preparation options: hydrogens (polar only or all), pH, charge model, minimisation if used;</li>
  <li>how the ligand was built or obtained, and its protonation;</li>
  <li>the box centre and size, the exhaustiveness, the number of poses and the energy range;</li>
  <li>for validation, the RMSD of the redocked co-crystal ligand.</li>
</ul>
<p>For example, for the <a href="#tutorial">tutorial</a>:</p>
<blockquote class="note">Docking was carried out with QuarkSuit 1.0 (TCCG Center, University of Zakho), which
uses the AutoDock Vina scoring function [1, 2]. Streptavidin (PDB 1STP) was prepared by removing the crystal
waters and the co-crystallised biotin, adding polar hydrogens for pH 7.4 and assigning Gasteiger charges [3];
biotin was prepared in the same way. A 20 &times; 20 &times; 20 &Aring; box was centred on the crystal ligand
(exhaustiveness 8, 9 poses, energy range 3 kcal/mol). Redocking reproduced the crystal pose with an RMSD of
0.67 &Aring; (&minus;7.75 kcal/mol).</blockquote>
`,
};
