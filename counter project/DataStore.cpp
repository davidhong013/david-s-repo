#include "DataStore.h"
using namespace std;
LinkedList::~LinkedList(){
    Node* temp=mHead;
    while(temp!=NULL){
        Node* temp1=temp;
        temp=temp->next;
        delete temp1;
        temp1=NULL;
    }
}
Node* LinkedList::insert(string key,int count){
    Node* mynode=new Node();
    if(mHead==NULL) {
        mynode->mystring=key;
        mynode->data=count;
        mynode->prev=NULL;
        mHead=mynode;
        mtail=mynode;
    }else{
        Node* current=mtail;
        current->next=mynode;
        mynode->mystring=key;
        mynode->data=count;
        mynode->prev=current;
        mtail=mynode;
        current=NULL;
    }
    nodecount=nodecount+1;
    return mynode;
}
// DataStore Member Functions
