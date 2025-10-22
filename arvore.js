
class BSTNode {
    int key;
    BSTNode left, right;
    BSTNode(int k) { key = k; left = right = null; }
}

class BST {
    BSTNode root;
    BST() { root = null; }

    public void insert(int key) { root = insertRec(root, key); }

    private BSTNode insertRec(BSTNode node, int key) {
        if (node == null) return new BSTNode(key);
        if (key < node.key) node.left = insertRec(node.left, key);
        else node.right = insertRec(node.right, key);
        return node;
    }

    public void printTree() { printRec(root, 0); }

    private void printRec(BSTNode node, int depth) {
        if (node == null) return;
        for (int i = 0; i < depth; i++) System.out.print("   ");
        System.out.println(node.key);
        printRec(node.left, depth + 1);
        printRec(node.right, depth + 1);
    }

    public void inorder() { inorderRec(root); System.out.println(); }
    private void inorderRec(BSTNode node) {
        if (node == null) return;
        inorderRec(node.left);
        System.out.print(node.key + " ");
        inorderRec(node.right);
    }
}

class AVLNode {
    int key, height;
    AVLNode left, right;
    AVLNode(int k) { key = k; height = 1; left = right = null; }
}

class AVL {
    AVLNode root;
    AVL() { root = null; }

    private int height(AVLNode n) { return n == null ? 0 : n.height; }

    private int getBalance(AVLNode n) { return n == null ? 0 : height(n.left) - height(n.right); }

    private AVLNode rightRotate(AVLNode y) {
        AVLNode x = y.left;
        AVLNode T2 = x.right;
        x.right = y;
        y.left = T2;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        return x;
    }

    private AVLNode leftRotate(AVLNode x) {
        AVLNode y = x.right;
        AVLNode T2 = y.left;
        y.left = x;
        x.right = T2;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        return y;
    }

    public void insert(int key) { root = insertRec(root, key); }

    private AVLNode insertRec(AVLNode node, int key) {
        if (node == null) return new AVLNode(key);
        if (key < node.key) node.left = insertRec(node.left, key);
        else if (key > node.key) node.right = insertRec(node.right, key);
        else return node; // no duplicates

        node.height = 1 + Math.max(height(node.left), height(node.right));
        int balance = getBalance(node);
        if (balance > 1 && key < node.left.key) return rightRotate(node);
        if (balance < -1 && key > node.right.key) return leftRotate(node);
        if (balance > 1 && key > node.left.key) {
            node.left = leftRotate(node.left);
            return rightRotate(node);
        }
        if (balance < -1 && key < node.right.key) {
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }
        return node;
    }

    public void printTree() { printRec(root, 0); }

    private void printRec(AVLNode node, int depth) {
        if (node == null) return;
        for (int i = 0; i < depth; i++) System.out.print("   ");
        System.out.println(node.key + " (h=" + node.height + ")");
        printRec(node.left, depth + 1);
        printRec(node.right, depth + 1);
    }

    public void inorder() { inorderRec(root); System.out.println(); }
    private void inorderRec(AVLNode node) {
        if (node == null) return;
        inorderRec(node.left);
        System.out.print(node.key + " ");
        inorderRec(node.right);
    }
}

public class Main {
    public static void main(String[] args) {
        int[] values = {1,2,3,10,4,5,9,7,8,6};
        BST bst = new BST();
        AVL avl = new AVL();

        for (int v : values) {
            bst.insert(v);
            avl.insert(v);
        }

        System.out.println("Valores inseridos: ");
        for (int v : values) System.out.print(v + " ");
        System.out.println("\n\n=== Árvore Binária de Busca (BST) ===");
        System.out.println("Exibição (preorder com indentação):");
        bst.printTree();
        System.out.print("Inorder (deveria ser ordenado): ");
        bst.inorder();

        System.out.println("\n=== Árvore AVL ===");
        System.out.println("Exibição (preorder com indentação) - cada nó mostra (h=altura):");
        avl.printTree();
        System.out.print("Inorder (deveria ser ordenado): ");
        avl.inorder();
    }
}
