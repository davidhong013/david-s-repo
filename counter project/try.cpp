#include <iostream>
#include <sstream>
using namespace std;

int read_value(std::istream& stream, int dfault) {
  int result;
  if(stream >> result) {
    return result;
  }
  else {
    return dfault;
  }
}
int main() {
  std::string mystring = "hello";

  
int ascii_sum = 0;
    for(int i=0;i<mystring.size();i++){
        ascii_sum+= static_cast<int>(mystring[i]);
    }
  cout<<ascii_sum;
  return 0;
}
Node* temp=find(key);
        if(temp->next==NULL);
        
        while(temp->next!=NULL){
            temp=temp->next;
            if(temp->mystring==key){
                temp->data=count;
            }
        }
Counter mycounter;
Counter::Iterator itr = hgfhfg;