// Waiting for the entire document to load
document.addEventListener("DOMContentLoaded", () => {
  const userForm = document.getElementById("formAnimalis");
  
  // Event listener that retrieves the input
  userForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      
      let animal = document.getElementById("animal");
      let specie = document.getElementById("specie");
      let sex = document.getElementById("sex");
      let description = document.getElementById("description");

      let newUser = {
          animal: animal.value,
          specie: specie.value,
          sex: sex.value,
          description: description.value 
      };
      
      // Fetching data
      let response = await fetch("data.json");
      let data = await response.json();
      data.push(newUser);
      
      // Sending the data to the server
      await fetch('/index', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  })
});

// Function that retrieves data and displays it as a table
async function getDataFromJSON() {
  let jsonPath = await fetch("data.json");

  let jsonObject = await jsonPath.json();
  let output = "<table><tr><th>animal</th><th>specie</th><th>sex</th><th>description</th>";
  
  for (var i=0; i<jsonObject.length; i++) {
      var counter = jsonObject[i];
      output += `<tr>`;
      output += `<td>${counter.animal}</td>`;
      output += `<td>${counter.specie}</td>`;
      output += `<td>${counter.sex}</td>`;
      output += `<td>${counter.description}</td>`;
      output += `</tr>`;
  }
  output += "</table>"

  document.getElementById("getData").innerHTML = output;
};