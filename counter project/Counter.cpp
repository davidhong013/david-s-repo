#include "Counter.h"

using namespace std;
Counter::Counter(){
    // htable=new Node*[5];
    htable=new LinkedList*[10000]();
    capacity=10000;
    usedsize=0;
    storage=new LinkedList();
}
void Counter::inc(const std::string& key, int by){
   if(find(key)==NULL){
    set(key,by);
   }else{
    find(key)->llnode->data=find(key)->llnode->data+by;
   }
}
void Counter::resize(){
    if(usedsize>capacity){
        int oldcap=capacity;
        capacity=capacity*2;
        LinkedList** newhtable=new LinkedList*[capacity]();
        for(int i=0;i<oldcap;++i){
            if (htable[i]!=NULL){
                LinkedList* temp=htable[i];
                Node* temp2=temp->mHead;
                while(temp2!=NULL){
                    int index=hashfunction(temp2->mystring)%capacity;
                    if(newhtable[index]==NULL) newhtable[index]=new LinkedList();
                    if(newhtable[index]->mHead==NULL){
                        Node* update=new Node();
                        update->llnode=temp2->llnode;
                        newhtable[index]->mHead=update;
                        newhtable[index]->mtail=update;
                        update->mystring=temp2->mystring;
                    }else if(newhtable[index]->mHead!=NULL){
                        Node* track=newhtable[index]->mHead;
                        while(track->next!=NULL){
                        track=track->next;
                        }
                        track->next=new Node();
                        track->next->mystring=temp2->mystring;
                        track->next->llnode=temp2->llnode;
                        track->next->prev=track;
                        newhtable[index]->mtail=track->next;
                    }
                    temp2=temp2->next;
                }
            }
        }
        for(int i=0;i<oldcap;++i){
           if(htable[i]!=NULL) delete htable[i];
        }
        delete []htable;
        htable=newhtable;
        newhtable=NULL;
    }
}
int Counter::hashfunction(const std::string& mystring) const{
    int ascii_sum = 0;
    for(size_t i=0;i<mystring.size();i++){
        ascii_sum+= static_cast<int>(mystring[i]);
    }
    return ascii_sum;
}
void Counter::set(const std::string& key, int count){
    int index=hashfunction(key)%capacity;
    if(htable[index]==NULL)  htable[index]=new LinkedList();
    if(find(key)==NULL && htable[index]->mHead==NULL){
        htable[index]->mHead=new Node();
        htable[index]->mHead->mystring=key;
        htable[index]->mHead->prev=NULL;
        usedsize=usedsize+1;
        htable[index]->mtail=htable[index]->mHead;
        htable[index]->mHead->llnode=storage->insert(key,count);
    }else if(find(key)!=NULL && find(key)->mystring==key){
        find(key)->data=count;
        find(key)->llnode->data=count;
    }else if(find(key)==NULL && htable[index]->mHead!=NULL){
        Node* temp=htable[index]->mHead;
        while(temp->next!=NULL){
            temp=temp->next;
        }
        temp->next=new Node();
        temp->next->mystring=key;
        temp->next->prev=temp;
        htable[index]->mtail=temp->next;
        usedsize=usedsize+1;
        temp->next->llnode=storage->insert(key,count);
    }
    resize();
}
Node* Counter::find(const std::string& key){
    int index=hashfunction(key)%capacity;
    if(htable[index]==NULL) return NULL;
    // cout<<"inside the find function the index is below"<<endl;
    Node* temp;
    // cout<<index<<"index is this"<<endl;
    temp=htable[index]->mHead;
    // cout<<"can i do here?"<<endl;
    if(temp==NULL){
        return NULL;
    }else{
        while(temp!=NULL){
            if(temp->mystring==key){
                return temp;
            }else{
                if(temp->next==NULL){
                    return NULL;
                }else{
                    temp=temp->next;
                }
            }
        }

    }
    return NULL;
}

  void Counter::dec(const std::string& key, int by){
        inc(key,-by);
  }
  void Counter::del(const std::string& key){
        int index=hashfunction(key)%capacity;
        Node* temp=find(key);
        if(temp==NULL){
            return;
        }else{
            if(temp->prev!=NULL){
                temp->prev->next=temp->next;
                if(temp->next!=NULL) {
                    temp->next->prev=temp->prev;
                    }else{
                         htable[index]->mtail=temp->prev;
                    }
                
            }else if(temp->prev==NULL){
                htable[index]->mHead=temp->next;
                if(temp->next!=NULL) {
                    temp->next->prev=NULL;
                    }else{
                        htable[index]->mtail=NULL;
                    }
                
            }
            if(temp->llnode->prev!=NULL) {
                temp->llnode->prev->next=temp->llnode->next;
            }else{
                storage->mHead=temp->llnode->next;
                if(storage->mtail==temp->llnode) storage->mtail=NULL;
            }
            if(temp->llnode->next!=NULL) {
                temp->llnode->next->prev=temp->llnode->prev;
            }else{
                storage->mtail=temp->llnode->prev;
                if(storage->mHead==temp->llnode) storage->mHead=NULL;
            }
            delete temp->llnode;
            storage->nodecount=storage->nodecount-1;
            delete temp;
            temp=NULL;
        }
        usedsize--;
  }
  int  Counter::get(const std::string& key) const{
    int index=hashfunction(key)%capacity;
    if(htable[index]==NULL){
        return 0;
    }
    Node* temp=htable[index]->mHead;
    while(temp!=NULL){
        if(temp->mystring==key){
            return temp->llnode->data;
        }else{
            temp=temp->next;
        }
    }
    return 0;
  }
  Counter::~Counter(){
        for(int i=0;i<capacity;++i){
           if(htable[i]!=NULL) delete htable[i];
        }
        delete []htable;
        delete storage;
  }
  Counter::Iterator Counter::begin() const{
    return Iterator(storage->mHead);
    
  }
  Counter::Iterator Counter::end() const{
    return Iterator(NULL);
  }
//   const std::string DUMMY = "testing";
  const string& Counter::Iterator::key() const{
    return this->ptrnode->mystring;
  }
  int Counter::Iterator::value() const{
    return this->ptrnode->data;
  }
  Counter::Iterator& Counter::Iterator::operator ++( ){
    // return *this;
    if(this->ptrnode!=NULL){
        this->ptrnode=this->ptrnode->next;
    }
    return *this;
  }
  bool   Counter::Iterator::  operator == (const Iterator& other) const{
    if(this->ptrnode==other.ptrnode){
        return true;
    }else{
        return false;
    }
  }
  bool    Counter::Iterator::  operator != (const Iterator& other) const{
    if(this->ptrnode!=other.ptrnode){
        return true;
    }else{
        return false;
    }
  }
  size_t Counter::count() const{
    return storage->nodecount;
  }
  int  Counter::  total() const{
    int sum=0;
    Node* temp=storage->mHead;
    while(temp!=NULL){
        sum=sum+temp->data;
        temp=temp->next;
    }
    return sum;
  }
  Counter::Iterator::Iterator(Node* mynode){
    ptrnode=mynode;
  }
// Counter Member Functions
