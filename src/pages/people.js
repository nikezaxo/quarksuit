const person = (photo, name, role) => `
<div><img src="team/${photo}" alt="${name}" loading="lazy"><b>${name}</b>${role}</div>`;

export const people = {
  title: 'People',
  render: () => `
<h1>People</h1>

<p>QuarkSuit is developed at the TCCG Center, University of Zakho, Kurdistan Region of Iraq, a
computational chemistry and molecular modelling group of the Department of Chemistry.</p>

<div class="people">
  ${person('hyder.jpeg', 'Dr. Haydar A Mohammad-salim', 'Ph.D. in Computational Chemistry')}
  ${person('shinwar.jpeg', 'Dr. Shinwar A Idrees', 'Ph.D. in Physical Chemistry')}
  ${person('Dlzhar.png', 'Mr. Dilzhar S Mohammed', 'M.Sc. in Physical Chemistry')}
  ${person('nihad.jpeg', 'Mr. Nihad R.', 'Research Assistant; develops and maintains QuarkSuit')}
  ${person('ahmad.jpeg', 'Ahmad KH', 'Research Assistant')}
</div>

<h2 id="contact">Contact</h2>
<p>Questions about QuarkSuit, bug reports and crash reports:
<a href="mailto:nihad.ali@staff.uoz.edu.krd">nihad.ali@staff.uoz.edu.krd</a>.<br>
The TCCG Center: <a href="https://tccglab.com">tccglab.com</a>.</p>
<p class="small muted">When reporting a problem, please give the QuarkSuit version, what you did, the text in
the terminal, and the input files if you can share them.</p>
`,
};
