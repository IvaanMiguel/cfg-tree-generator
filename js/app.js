import { parseE, generateTree } from './tree-generator.js';

(() => {
  const input = document.querySelector('.input-string input');
  const expandColapseButton = document.getElementById('expand-colapse-tree');
  const treeDiv = document.querySelector('.tree');

  document.getElementById('generate-tree').addEventListener('click', () => {
    if (!input.value) return;

    expandColapseButton.innerText = 'Expandir árbol';
    treeDiv.replaceChildren();

    const string = input.value.replace(/\s/g,'').split('');
    const tree = parseE(string);

    generateTree(tree);
    console.log(tree);
  });

  expandColapseButton.addEventListener('click', function () {
    if (!treeDiv.childElementCount) return;

    const summaries = document.querySelectorAll('summary');

    if (this.innerText === 'Expandir árbol') {
      this.innerText = 'Colapsar árbol';

      summaries.forEach((summary) => {
        if (!summary.parentElement.hasAttribute('open')) summary.click()
      });
      return;
    }

    this.innerText = 'Expandir árbol';

    summaries.forEach((summary) => {
      if (summary.parentElement.hasAttribute('open')) summary.click()
    });
  });
})()
