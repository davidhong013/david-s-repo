#ifndef DATASTORE_H
#define DATASTORE_H
#include<iostream>
#include<string>
// Space to implement a separate datastore class, if you choose to do so.
// This can make things simpler by clearly separating functionality.
// The DataStore is in charge of storing pairs in insertion order.
struct Node{
    std::string mystring;
    int data;
    Node* prev;
    Node* next;
    Node* llnode;
};
class LinkedList {
  
  public:
  Node* mHead;
  Node* mtail;
  size_t nodecount=0;
  ~LinkedList();
  Node* insert(std::string key, int count);

};

#endif
