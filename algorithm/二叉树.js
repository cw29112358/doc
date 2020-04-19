/**
 * 二叉树的栗子
 */
const treenode = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4,
    },
    right: {
      value: 5,
      left: {
        value: 7,
      },
      right: {
        value: 8,
      },
    },
  },
  right: {
    value: 3,
    right: {
      value: 6,
    },
  },
}

const treenodeB = {
  value: 1,
  left: {
    value: 3,
    left: {
      value: 6,
    },
  },
  right: {
    value: 2,
    left: {
      value: 5,
      left: {
        value: 8,
      },
      right: {
        value: 7,
      },
    },
    right: {
      value: 4,
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
const levelorderTraversal = (root) => {
  let nodestack = []
  const res = []
  if (!root) return []
  nodestack.push(root)
  while (nodestack.length > 0) {
    const newNodestack = []
    for (let i = 0; i < nodestack.length; i++) {
      const node = nodestack[i]
      res.push(node.value)
      if (node.left) {
        newNodestack.push(node.left)
      }
      if (node.right) {
        newNodestack.push(node.right)
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