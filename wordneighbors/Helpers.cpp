#include "Helpers.h"
using namespace std;
void Word::connect(Word* node1,Word* node2){
    node1->neighbors.insert(node2);
}
Word::Word(string input){
    this->data=input;
}
// ~Node::Node(){

// }
// Member functions of any helper classes, if you need them.
