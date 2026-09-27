const qa = (id, q, a) => `<h3 id="${id}">${q}</h3>${a}`;

export const faq = {
  title: 'FAQ',
  render: () => `
<h1>Frequently asked questions</h1>

${qa('free', 'Is QuarkSuit free?', `<p>Yes, for research, teaching and personal use. It is closed-source
software; the terms are summarised on the <a href="#download/licence">Download</a> page.</p>`)}

${qa('needs', 'Do I need AutoDock Vina, AutoDockTools, Open Babel or Python?', `<p>No. The docking engine and the
chemistry toolkit are part of QuarkSuit, and the installer brings everything else it uses.</p>`)}

${qa('platforms', 'Does it run on macOS or Linux?', `<p>No. QuarkSuit v1 is for 64-bit Windows 10 (version 1903
or later) and Windows 11.</p>`)}

${qa('vina', 'How does QuarkSuit relate to AutoDock Vina?', `<p>QuarkSuit's docking engine uses the Vina scoring
function; the parts adapted from AutoDock Vina are used under its Apache 2.0 licence. For the same pose QuarkSuit
reports the same affinity as Vina 1.2. The search is QuarkSuit's own implementation of the same kind of Monte Carlo
search, so a run does not reproduce Vina's poses exactly, but the results are of the same kind and the files are
interchangeable: PDBQT files written by QuarkSuit dock in Vina, and files prepared for Vina dock in QuarkSuit.</p>`)}

${qa('adt', 'Can I use PDBQT files prepared with AutoDockTools or Meeko?', `<p>Yes. A ligand's torsion tree is
taken from the file as long as the ligand is not changed in QuarkSuit, and the Molecule Properties window reports
what the file contains, including which charge model its charges most likely come from.</p>`)}

${qa('noh', 'My ligand has no hydrogens. Can I still dock it?', `<p>Yes; the run starts, and a note above
<span class="ui">START DOCKING</span> says so. Without hydrogens, however, the ligand's N&ndash;H and O&ndash;H groups
cannot donate hydrogen bonds in the score, which changes poses and energies. Add polar hydrogens in the Preparation
workspace first.</p>`)}

${qa('refused', 'Why does Load Protein (or Load Ligand) refuse my file?', `<p>Load Protein takes a receptor built of
residues, and Load Ligand any molecule that is not a protein. <i>Check input file, non-protein residue</i> means a
small molecule was opened as the protein; <i>protein residue</i> means a protein was opened as the ligand. For a
protein&ndash;ligand complex, Load Ligand lists the ligands inside the file so you can take one. See
<a href="#manual/m-loading">Manual, chapter 5</a>.</p>`)}

${qa('charges', 'Which partial charges should I choose?', `<p>For docking in QuarkSuit or AutoDock Vina it does not
matter: the score does not use partial charges. They are written to PDBQT files for programs that do use them, such
as AutoDock4. Gasteiger charges suit ligands and are a safe choice for receptors; Kollman charges are the classic
AutoDock choice for standard protein residues.</p>`)}

${qa('ph', 'Which pH should I use?', `<p>7.4 unless your system works at another pH (the stomach, lysosomes, an enzyme
with an acidic optimum). QuarkSuit uses the typical p<i>K</i><sub>a</sub> of each kind of group; it does not predict
shifted p<i>K</i><sub>a</sub> values in a particular binding site, so check histidines and other groups near the
ligand yourself.</p>`)}

${qa('affinity', 'My affinity differs from a published Vina result. Why?', `<p>Most often the inputs differ: another
protonation state, hydrogens, a box of a different size, or a different number of torsions. Compare the prepared
files and the torsion count in the terminal. With identical inputs, two searches can still end in different poses;
rescoring the same pose gives the same value in both programs.</p>`)}

${qa('repeat', 'Why do repeated runs give different results?', `<p>The search did not converge: raise the
exhaustiveness (double it and compare) and make the box no larger than needed. With the same settings on the same
computer, repeated runs of the tutorial gave identical results.</p>`)}

${qa('screening', 'Can I dock many ligands at once?', `<p>Not in version 1: each docking run takes one ligand.</p>`)}

${qa('flex', 'Can receptor side chains move?', `<p>No. The receptor is rigid in version 1; only the ligand is
flexible.</p>`)}

${qa('gpu', 'Does docking use the graphics card?', `<p>Optionally, for building the receptor energy grids (OpenCL);
the search runs on the processor cores. See <a href="#manual/engine">Manual, section 9.6</a>.</p>`)}

${qa('metal', 'Can I dock to a metalloprotein?', `<p>Yes. Metal ions are kept during preparation, metal-bound
cysteines and histidines get suitable protonation, and the score treats metals as it does in Vina. Ligands that bind
mainly through a metal are, as in Vina, predicted less reliably.</p>`)}

${qa('script', 'Is there a command line or scripting interface?', `<p>No. QuarkSuit is used through its window; the
command line only offers diagnostics (<code>--selftest</code>, <code>--gl-info</code>).</p>`)}

${qa('bug', 'How do I report a problem?', `<p>If QuarkSuit closed unexpectedly, a crash report is waiting in
<code>%APPDATA%\\QuarkSuit\\crashes</code>. Send it, or a description of the problem with the input files if you can
share them, to the TCCG Center (see <a href="#people/contact">People</a>).</p>`)}
`,
};
