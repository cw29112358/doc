/**
 * 二叉树的栗子
 */
const treenode = {
  value: 'A',
  left: {
    value: 'B',
    left: {
      value: 'D',
    },
    right: {
      value: 'E',
      left: {
        value: 'G',
      },
      right: {
        value: 'H',
      },
    },
  },
  right: {
    value: 'C',
    right: {
      value: 'F',
    },
  },
}

const treenodeB = {
  value: 'A',
  left: {
    value: 'C',
    left: {
      value: 'F',
    },
  },
  right: {
    value: 'B',
    left: {
      value: 'E',
      left: {
        value: 'H',
      },
      right: {
        value: 'G',
      },
    },
    right: {
      value: 'D',
    },
  },
}

/**
 * 二叉树前序遍历
 */
const preorderTraversal = (root) => {
  const nodestack = []
  const res = []
  nodestack.push(root)
  if (!root) return []
  while (nodestack.length > 0) {
    let node = nodestack.pop()
    res.push(node.value)
    if (node.right) {
      nodestack.push(node.right)
    }
    if (node.left) {
      nodestack.push(node.left)
    }
  }
  return res
}

/**
 * 二叉树中序遍历
 */
const inorderTraversal = (root) => {
  const nodestack = []
  const res = []
  if (!root) return []
  while (!!root || nodestack.length > 0) {
    while (!!root) {
      nodestack.push(root)
      root = root.left
    }
    root = nodestack.pop()
    res.push(root.value)
    root = root.right
  }
  return res
}

/**
 * 二叉树后序遍历
 */
const postorderTraversal = (root) => {
  const nodestack = []
  const res = []
  nodestack.push(root)
  if (!root) return []
  while (nodestack.length > 0) {
    const node = nodestack.pop()
    res.unshift(node.value)
    if (node.left) {
      nodestack.push(node.left)
    }
    if (node.right) {
      nodestack.push(node.right)
    }
  }
  return res
}

/**
 * 二叉树层次遍历
 */
const levelOrderTraversal = (root) => {
  let nodestack = []
  const res = []
  if (!root) return []
  nodestack.push(root)
  while (nodestack.length > 0) {
    const newNodestack = []
    for (let i = 0; i < nodestack.length; i++) {
      res.push(nodestack[i].value)
      if (nodestack[i].left) {
        newNodestack.push(nodestack[i].left)
      }
      if (nodestack[i].right) {
        newNodestack.push(nodestack[i].right)
      }
    }
    nodestack = newNodestack
  }
  return res
}

/**
 * 对称二叉树判断
 */
const isSymmetrical = (treenodeA, treenodeB) => {
  if (!treenodeA && !treenodeB) {
    return true
  }
  if (!treenodeA || !treenodeB) {
    return false
  }
  if (treenodeA.value !== treenodeB.value) {
    return false
  }
  return isSymmetrical(treenodeA.left, treenodeB.right) && isSymmetrical(treenodeA.right, treenodeB.left)
}