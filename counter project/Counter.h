#ifndef COUNTER_H
#define COUNTER_H

#include <cstddef>
#include <string>
#include "DataStore.h"

// This is the Counter class you need to implement.
// It includes the Counter::Iterator as a nested class.
// If you want more space to implement helper classes,
// you can use the DataStore.* and Index.* files.

class Counter {
public:
  class Iterator {
    // Member Variables

  public:
    const std::string& key() const;
    int value() const;
    Node* ptrnode;
    Iterator& operator ++ ();
    bool      operator == (const Iterator& other) const;
    bool      operator != (const Iterator& other) const;
    Iterator(Node* mynode);
  };

private:
  // Member Variables
  LinkedList** htable;
  int capacity;
  int usedsize;
  LinkedList* storage;
private:
  // Helper Functions
  Node* find(const std::string& key);
public:
  Counter();
  ~Counter();
  int hashfunction(const std::string& mystring) const;
  size_t count() const;
  int    total() const;

  void inc(const std::string& key, int by = 1);
  void dec(const std::string& key, int by = 1);
  void del(const std::string& key);
  int  get(const std::string& key) const;
  void set(const std::string& key, int count);
  void resize();

  Iterator begin() const;
  Iterator end() const;
};

#endif
