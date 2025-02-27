let users = [];
let user = {}
// let useremail = "";
// let username = "";
// let currBalance = 0;
document.write("<div id=root></div>");

function showHeader() {
  let str = `
  <div class="row bg-success">
          <div class="col-lg-8">
            <h1>My Bank</h1>
          </div>
          <div class="col-lg-4 text-end">
          <button onclick='showHome()'>Home</button>
          ${
            user.email
              ? "<button onclick='showLogout()'>Logout</button>"
              : "<button onclick='showLogin()'>Login</button>"
          }
            <!-- <button onclick="toggle('dark')" class="btn btn-dark">Dark</button>
            <button onclick="toggle('light')" class="btn btn-light">Light</button> -->
          </div>
        </div>
  `;
  header.innerHTML = str;
}

function toggle(color) {
  if (color == "dark") {
    document.body.style.background = "black";
    document.body.style.color = "white";
  } else {
    document.body.style.background = "white";
    document.body.style.color = "black";
  }
}

function showUser() {
  if (document.getElementById("type").value == "3") {
    console.log("Transfer")
    selUser.style.display = 'block'
    let str = "<option value=0>--Select--</option>";
    for (let i = 0; i < users.length; i++) {
      if (users[i].email != user.email) {
        str += `<option value='${users[i].email}'>${users[i].name}</option>`;
      }
    }
    selUser.innerHTML = str;
  }
  else {
    selUser.style.display = "none"
  }
}
function saveData() {
  let amount = Number(document.getElementById("amount").value); 
  let type = document.getElementById("type").value;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == user.email) {
      if (type == "1") {
        console.log("testing")
        users[i].balance += amount;
        spBalance.innerHTML = users[i].balance;
      } else if (type == "2") {
        users[i].balance -= amount;
        spBalance.innerHTML = users[i].balance;
      } else if (type == "3") {
        let newUser = document.getElementById("selUser").value;
        for (let i = 0; i < users.length; i++) {
          if (users[i].email == newUser) {
            users[i].balance += amount;
          }
        }
        for (let i = 0; i < users.length; i++) {
          if (users[i].email == user.email) {
            users[i].balance -= amount;
            spBalance.innerHTML = users[i].balance;
          }
        }
      }

      break;
    }
  }
}
function showLogout() {
  user = {};
  showHeader();
  showHome();
}
function home() {
  let str = `
  <div class='w-100 bg-info mt-3 p-5 rounded-5 text-center'>
      <h3>Welcome ${user.name}</h3>
      <button onclick='showLogin()' class='form-control m-1'>Logout</button>
      <p><select id="type" onchange='showUser()'>
         <option value=0>--Select--</option>
         <option value=1>Deposit</option>
         <option value=2>Withdraw</option>
         <option value=3>Transfer</option>
         </select></p>
         <p><select style="display:none" id="selUser" class='form-control'></select></p>
         <p><input type="number" id="amount" placeholder="Enter Amount" class='form-control'></p>
         <button onclick='saveData()' class='form-control btn btn-success'>Submit</button>
         <p><b>Current Balance: <span id='spBalance'>${user.balance}</span></b></p>
  </div>
  `;
  root.innerHTML = str;
}
function addUser() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let dob = document.getElementById("dob").value;
  let user = {
    name: name,
    email: email,
    password: password,
    dob: dob,
    balance: 0,
  };
  users.push(user);
  showLogin();
}
function chkUser() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == email && users[i].password == password) {
      // useremail = email;
      // username = users[i].name;
      // currBalance = users[i].balance;
      user = users[i]
      home();
      break;
    } else {
      msg.innerHTML = "Access Denied";
    }
  }
}
function showForm() {
  let str = `
  <div class='w-100 bg-info mt-3 p-5 rounded-5 text-center'>
    <h2>Registration Form</h2>
    <p><input type="text" id="name" class='form-control' required placeholder="Name"></p>
    <p><input type="text" id="email" class='form-control' required placeholder="Email"></p>
    <p><input type="password" id="password" class='form-control' required placeholder="Password"></p>
    <p><input type="date" id="dob" class='form-control'></p>
    <p><button onclick='addUser()' class='btn btn-dark m-1 w-75'>Submit</button></p>
    <p>Already a member?<button onclick='showLogin()' class='btn btn-success m-1'>Login Here</button></p>
  </div>
  `;
  root.innerHTML = str;
}
function showLogin() {
  let str = `
  <div class='w-100 bg-info m-2 p-5 rounded-4 text-center'>
      <h2>Login Form</h2>
      <div id='msg'></div>
      <p><input type="text" id="email" class='form-control' required placeholder="Enter email"></p>
      <p><input type="password" id="password" class='form-control' required placeholder="Enter password"></p>
      <button onclick='chkUser()' class='btn btn-success m-1 w-30'>Log In</button>
      <p><button onclick='showForm()' class='btn btn-dark mt-1'>Create Account</button></p>
  </div>
  `;
  for(let i=0; i<users.length;i++){
    str+= `${users[i].name}`
  }
  root.innerHTML = str;
}
function showHome() {
  showHeader();
  let str = `
<div class="card text-center">
  <div class="card-header">
    Featured
  </div>
  <div class="card-body">
    <h5 class="card-title">Best Bank of the Year</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <button onclick='showForm()' class="btn btn-primary">Create Account</button>
  </div>
  <div class="card-footer text-muted">
    2 days ago
  </div>
</div>

`;
  root.innerHTML = str;
}

showHome();