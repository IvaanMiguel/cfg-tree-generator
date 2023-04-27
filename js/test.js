(() => {
  let string = 'i*i+(i+i)'.replace(/\s/g,'').split('');

  function parseE(tokens) {
    const nodeE = new Node('E');
    const nodeT = parseT(tokens);
    const nodeE_ = parseE_(tokens);

    nodeT.parentNode = nodeE;
    nodeE_.parentNode = nodeE;

    nodeE.children = [nodeT, nodeE_];

    return nodeE;
  }

  function parseE_(tokens) {
    const primaryNodeE_ = new Node("E'");

    if (tokens[0] === '+') {
      tokens.shift();

      const nodeTerminal = new Node('+');
      const nodeT = parseT(tokens);
      const secondaryNodeE_ = parseE_(tokens);

      nodeTerminal.parentNode = primaryNodeE_;
      nodeT.parentNode = primaryNodeE_;
      secondaryNodeE_.parentNode = primaryNodeE_;

      primaryNodeE_.children = [nodeTerminal, nodeT, secondaryNodeE_];

      return primaryNodeE_;
    }

    const nodeEpsilon = new Node('ε');
    nodeEpsilon.parentNode = primaryNodeE_;
    primaryNodeE_.children = [nodeEpsilon];

    return primaryNodeE_;
  }

  function parseT(tokens) {
    const nodeT = new Node('T');
    const nodeF = parseF(tokens);
    const nodeT_ = parseT_(tokens);

    nodeF.parentNode = nodeT;
    nodeT_.parentNode = nodeT;

    nodeT.children = [nodeF, nodeT_];

    return nodeT;
  }

  function parseT_(tokens) {
    const primaryNodeT_ = new Node("T'");

    if (tokens[0] === '*') {
      tokens.shift();

      const nodeTerminal = new Node('*');
      const nodeF = parseF(tokens);
      const secondaryNodeT_ = parseT_(tokens);

      nodeTerminal.parentNode = primaryNodeT_;
      nodeF.parentNode = primaryNodeT_;
      secondaryNodeT_.parentNode = primaryNodeT_;

      primaryNodeT_.children = [nodeTerminal, nodeF, secondaryNodeT_];

      return primaryNodeT_;
    }

    const nodeEpsilon = new Node('ε');
    nodeEpsilon.parentNode = primaryNodeT_;
    primaryNodeT_.children = [nodeEpsilon];

    return primaryNodeT_;
  }

  function parseF(tokens) {
    const nodeF = new Node('F');

    if (tokens[0] === '(') {
      tokens.shift();

      const nodeE = parseE(tokens);
      tokens.shift();

      const LPTerminalNode = new Node('(');
      const RPTerminalNode = new Node(')');

      LPTerminalNode.parentNode = nodeF;
      nodeE.parentNode = nodeF;
      RPTerminalNode.parentNode = nodeF;

      nodeF.children = [LPTerminalNode, nodeE, RPTerminalNode];

      return nodeF;
    } else if (tokens[0] === 'i') {
      tokens.shift();

      const terminalNode = new Node('i');
      terminalNode.parentNode = nodeF;
      nodeF.children = [terminalNode];

      return nodeF;
    }

    throw new Error('Unexpected token: ' + tokens[0]);
  }

  const root  = parseE(string);

  function generateCoords () {
    const details = document.createElement('details');
    details.innerHTML = /*html*/`
      <summary>Nodo raíz</summary>
    `;
    document.body.appendChild(details);
    nodeCoords(root, details);
  }

  function nodeCoords (node, parentDetails) {
    const details = document.createElement('details');
    const text = node.children.length === 0
      ? `<b>Nodo ${node.value}</b>`
      : `Nodo ${node.value}`

    details.innerHTML = `
      <summary>${text}</summary>
    `;

    parentDetails.appendChild(details);

    node.children.forEach((child) => nodeCoords(child, details));
  }

  function setPositionRelativeToParent (node) {
    const parentNode = node.parentNode;
    const parentChildren = parentNode.children.length;
    const centerIndex = Math.floor(parentChildren / 2);
    const childIndex = parentNode.children.indexOf(node);

    if (parentChildren % 2 === 0) {
      node.positionRelativeToParent = childIndex < centerIndex ? 'left' : 'right';
      return;
    }

    if (childIndex < centerIndex) {
      node.positionRelativeToParent = 'left';
      return;
    } else if (childIndex > centerIndex) {
      node.positionRelativeToParent = 'right';
      return;
    }

    node.positionRelativeToParent = 'middle';
  }

  function countLeafs (node) {
    let leafs = 0;
    const positionRelativeToParent = getPositionRelativeToParent(node);
    if (node.children.length === 0) {
      leafs = 1;
    } else {

    }
  }

  generateCoords();
  console.log(root);
})();
