function deleteNote(noteid) {
    const mystr=noteid.toString();
    fetch("/deletenote", {
      method: "POST",
      body: JSON.stringify({ "whatthefuck": mystr }),
    }).then((_res) => {
      window.location.href = "/";
    });
  }