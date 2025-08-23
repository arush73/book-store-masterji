public class Main {
    class ListNode{
        int data;
        ListNode next;
        ListNode(int data){
            this.data = data;
            this.next = null;
        }
    }
    class LL{
        ListNode head;
        LL(){
            this.head=null;
        }

        public void insertAtHead(int data){
            ListNode newNode = new ListNode(data);
            if(head==null){
                head = newNode;
                return;
            }
        }
        public void insertAtTail(int data){
            ListNode newNode = new ListNode(data);
            if(head==null){
                head = newNode;
                return;
            }
            ListNode curr = head;
            while(curr.next!=null){
                curr = curr.next;
            }
            curr.next = newNode;
        }
        public void insertAtAnyPos(int data , int pos){
            ListNode newNode = new ListNode(data);
            ListNode prev = null;
            ListNode curr = head;
            while(curr != null && pos>1){
                prev = curr;
                curr = curr.next;
                pos--;
            }
            if(pos==1){
                prev.next = newNode;
                newNode.next = curr;
            }
        }
        void printLL(ListNode head){
            if(head==null){
                System.out.println("LinkedList is Empty");
            }
            else{
                ListNode curr = head;
                while(curr.next!=null){
                    System.out.print(curr.data+" ");
                    curr=curr.next;
                }
            }
        }
        public int deleteAtHead(ListNode head){
            if(head==null){
                return -1;
            }
            int d = head.data;
            head = head.next;            
            return d;
        }
        public int deleteAtTail(ListNode head){
            if(head==null){
                return -1;
            }
            ListNode temp = head;
            int d = 0;
            while(temp.next.next!=null){
                temp = temp.next;
            }
            d = temp.next.data;
            temp.next=null;
            return d;
        }
    }
    public static void main(String[] args) {
        
    }
}