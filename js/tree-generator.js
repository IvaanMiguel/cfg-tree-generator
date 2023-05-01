import Node from './Node.class.js';

// let string = 'i*i+(i+i)'.replace(/\s/g,'').split('');

export function parseE(tokens) {
  const nodeE = new Node('E');
  const nodeT = parseT(tokens);
  const nodeE_ = parseE_(tokens);

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

    primaryNodeE_.children = [nodeTerminal, nodeT, secondaryNodeE_];

    return primaryNodeE_;
  }

  const nodeEpsilon = new Node('ε');
  primaryNodeE_.children = [nodeEpsilon];

  return primaryNodeE_;
}

function parseT(tokens) {
  const nodeT = new Node('T');
  const nodeF = parseF(tokens);
  const nodeT_ = parseT_(tokens);

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

    primaryNodeT_.children = [nodeTerminal, nodeF, secondaryNodeT_];

    return primaryNodeT_;
  }

  const nodeEpsilon = new Node('ε');
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

    nodeF.children = [LPTerminalNode, nodeE, RPTerminalNode];

    return nodeF;
  } else if (tokens[0] === 'i') {
    tokens.shift();

    const terminalNode = new Node('i');
    nodeF.children = [terminalNode];

    return nodeF;
  }

  throw new Error('Unexpected token: ' + tokens[0]);
}

// const root  = parseE(string);

export function generateTree (tree) {
  const details = document.createElement('details');
  details.innerHTML = `<summary>Nodo raíz</summary>`;

  document.querySelector('.tree').appendChild(details);
  generateSubtree(tree, details);
}

function generateSubtree (node, parentDetails) {
  const details = document.createElement('details');
  const text = node.children.length === 0
    ? `<b>Nodo ${node.value}</b>`
    : `Nodo ${node.value}`

  details.innerHTML = `<summary>${text}</summary>`;

  parentDetails.appendChild(details);
  node.children.forEach((child) => generateSubtree(child, details));
}
