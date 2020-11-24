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
// 递归实现
function preOrderTraversal(root) {
  const result = []
  function preOrderTraversalNode(node) {
    if (node) {
      result.push(node.value)
      if (node.left) {
        preOrderTraversalNode(node.left)
      }
      if (node.right) {
        preOrderTraversalNode(node.right)
      }
    }
  }
  preOrderTraversalNode(root)
  return result
}

// 迭代实现
function preOrderTraversal(root) {
  const list = []
  const stack = []
  if (root) {
    stack.push(root)
  }
  while (stack.length > 0) {
    const curNode = stack.pop()
    list.push(curNode.value)
    if (curNode.right) {
      stack.push(curNode.right)
    }
    if (curNode.left) {
      stack.push(curNode.left)
    }
  }
  return list
}

/**
 * 二叉树中序遍历
 */
// 递归实现
function inorderTraversal(root) {
  const result = []
  function inOrderTraversalNode(node) {
    if (node) {
      if (node.left) {
        inOrderTraversalNode(node.left)
      }
      result.push(node.value)
      if (node.right) {
        inOrderTraversalNode(node.right)
      }
    }
  }
  inOrderTraversalNode(root)
  return result
}

// 迭代实现
function inorderTraversal(root) {
  const list = []
  const stack = []
  while (root || stack.length > 0) {
    while (root) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    list.push(root.value)
    root = root.right
  }
  return list
}

/**
 * 二叉树后序遍历
 */
// 递归实现
function postorderTraversal(root) {
  const result = []
  function postorderTraversalNode(node) {
    if (node) {
      if (node.left) {
        postorderTraversalNode(node.left)
      }
      if (node.right) {
        postorderTraversalNode(node.right)
      }
      result.push(node.value)
    }
  }
  postorderTraversalNode(root)
  return result
}

// 迭代实现
function postorderTraversal(root) {
  const list = []
  const stack = []
  if (root) {
    stack.push(root)
  }
  while (stack.length > 0) {
    const curNode = stack.pop()
    list.unshift(curNode.value)
    if (curNode.left) {
      stack.push(curNode.left)
    }
    if (curNode.right) {
      stack.push(curNode.right)
    }
  }
  return list
}

/**
 * 二叉树层次遍历
 */
function levelorderTraversal(root) {
  const list = []
  let stack = []
  if (root) {
    stack.push(root)
  }
  while (stack.length > 0) {
    const newStack = []
    for (let i = 0; i < stack.length; i++) {
      const curNode = stack[i]
      list.push(curNode.value)
      if (curNode.left) {
        newStack.push(curNode.left)
      }
      if (curNode.right) {
        newStack.push(curNode.right)
      }
    }
    stack = newStack
  }
  return list
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
  return (
    isSymmetrical(treenodeA.left, treenodeB.right) &&
    isSymmetrical(treenodeA.right, treenodeB.left)
  )
}

/**
 * 二叉树路径总和
 * 给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和
 */
function hasPathSum(root, sum) {
  if (!root) {
    return false
  }
  if (!root.left && !root.right) {
    return root.value === sum
  }
  return (
    hasPathSum(root.left, sum - root.value) ||
    hasPathSum(root.right, sum - root.value)
  )
}