import queue
from utils import build_tree_string, is_var_expr

class TreeNode():
    
    def __init__(self, v):
        '''
        Constructor for TreeNode class.
        '''
        self.val = str(v)
        self.left = None
        self.right = None
        self.kind = None

    def print_tree(self):
        '''
        Prints tree with self as root in level-order using BFS.
        '''
        q = queue.Queue()
        q.put(self)
        while not q.empty():
            current = q.get()
            print(current.val)
            if current.left is not None:
                q.put(current.left)
            if current.right is not None:
                q.put(current.right)
    
    def __str__(self):
        """
        Pretty-print string for tree.
        """
        lines = build_tree_string(self, 0, False, '-')[0]
        return '\n' + '\n'.join((line.rstrip() for line in lines))

class ConstantNode(TreeNode):

    def derivate(self):
        return ConstantNode(0)

class SumNode(TreeNode):

    def __init__(self):
        super().__init__('+')

    def derivate(self):
        node = SumNode()
        node.left = self.left.derivate()
        node.right = self.right.derivate()
        return node

class DifferenceNode(TreeNode):

    def __init__(self):
        super().__init__('-')
        self.left = ConstantNode(0)
    
    def derivate(self):
        node = DifferenceNode()
        node.left = self.left.derivate()
        node.right = self.right.derivate()
        return node

class ProductNode(TreeNode):
        
    def __init__(self):
        super().__init__('*')

    def derivate(self):
        node = SumNode()
        left = ProductNode()
        right = ProductNode()

        left.left = self.left
        left.right = self.right.derivate()

        right.left = self.left.derivate()
        right.right = self.right

        node.left = left
        node.right = right
        return node

class DivideNode(TreeNode):

    def __init__(self):
        super().__init__('/')
    
    def derivate(self):
        node = DivideNode()
        top = DifferenceNode()
        bottom = ProductNode()

        bottom.left = self.right
        bottom.right = self.right

        top.left = ProductNode()
        top.left.left = self.right
        top.left.right = self.left.derivate()

        top.right = ProductNode()
        top.right.left = self.left
        top.right.right = self.right.derivate()

        node.left = top
        node.right = bottom
        return node

class PowerNode(TreeNode):

        def __init__(self):
            super().__init__('^')

        def derivate(self):
            constant = ConstantNode(self.right.val)

            product = ProductNode()
            product.left = constant

            product.right = PowerNode()
            product.right.left = self.left
            product.right.right = ConstantNode(str(int(self.right.val)-1))

            return product


class XNode(TreeNode):

    def __init__(self):
        super().__init__('x')

    def derivate(self):
        return ConstantNode(1)

