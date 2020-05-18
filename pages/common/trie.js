/**
 * Implement a trie with insert, search, and startsWith methods. 使用insert、search和startsWith方法实现trie
 *
 * Note:
 * You may assume that all inputs are consist of lowercase letters a-z.您可以假设所有的输入都是由小写字母a-z组成的
 *
 * The following picture explains construction of trie using keys given in the example below,下面的图片解释了如何使用下面示例中给出的键来构建trie
 *
 *                        root
 *                     /   \    \
 *                     t   a     b
 *                     |   |     |
 *                     h   n     y
 *                     |   |  \  |
 *                     e   s  y  e
 *                  /  |   |
 *                  i  r   w
 *                  |  |   |
 *                  r  e   e
 *                         |
 *                         r
 *
 * Trie is an efficient information reTrieval data structure. Using Trie,Trie是一种高效的信息检索数据结构。使用单词查找树
 * search complexities can be brought to optimal limit (key length).搜索复杂度可达到最优限制(键长)
 *
 * If we store keys in binary search tree, a well balanced BST will need time proportional to M * log N,如果我们将密钥存储在二叉搜索树中，一个平衡良好的BST将需要与M * log N成比例的时间
 * where M is maximum string length and N is number of keys in tree. Using Trie, we can search the key in O(M) time.其中M为最大字符串长度，N为树中的键数。使用Trie，我们可以在O(M)时间内搜索密钥
 *
 * However the penalty is on Trie storage requirements.然而，penalty是在Trie存储需求上
 */

class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

export default class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let current = this.root;

    for (let i = 0; i < word.length; i++) {
      if (!(word[i] in current.children)) {
        current.children[word[i]] = new TrieNode();
      }

      current = current.children[word[i]];
    }

    current.isEnd = true;
  }

  search(word) {
    let current = this.root;

    for (let i = 0; i < word.length; i++) {
      if (!(word[i] in current.children)) {
        return false;
      }

      current = current.children[word[i]];
    }

    return current.isEnd;
  }

  startsWith(prefix) {
    let current = this.root;

    for (let i = 0; i < prefix.length; i++) {
      if (!(prefix[i] in current.children)) {
        return false;
      }

      current = current.children[prefix[i]];
    }

    return true;
  }
}
