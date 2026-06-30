# Local Storage & Session Storage

## Local Storage

Local Storage stores data **permanently** in the browser until it is manually removed by the user or deleted through JavaScript.

- Data remains available even after refreshing the page or restarting the browser.
- Data is shared across all tabs and windows of the same origin (same website).
- Closing the browser or shutting down the computer does **not** remove the data.

---

## Session Storage

Session Storage stores data **temporarily** for the current browser tab.

- Data remains available while the tab is open.
- Refreshing the page does **not** remove the data.
- Opening a new tab creates a separate session with its own storage.
- Once the tab or browser window is closed, the stored data is automatically deleted.

---

# Local Storage vs Session Storage

| Feature | Local Storage | Session Storage |
|---------|--------------|----------------|
| Storage Duration | Permanent (until removed) | Temporary (until tab is closed) |
| Survives Page Refresh | ✅ Yes | ✅ Yes |
| Survives Browser Restart | ✅ Yes | ❌ No |
| Shared Across Tabs | ✅ Yes (same origin) | ❌ No (tab-specific) |
| Storage Limit | ~5–10 MB (browser dependent) | ~5 MB (browser dependent) |

---

# 4 Main Methods

## 1. Store Data

Data is stored as **key-value pairs**, and both the key and value are stored as **strings**.

```javascript
localStorage.setItem("username", "Muhammad Faizan");

sessionStorage.setItem("userToken", "abc123xyz");
```

---

## 2. Read Data

Use the **key** to retrieve the stored value.

```javascript
let name = localStorage.getItem("username");

console.log(name); // Output: Muhammad Faizan
```

---

## 3. Remove a Single Item

```javascript
localStorage.removeItem("username");
```

---

## 4. Clear All Data

```javascript
localStorage.clear();
```

This removes **all** data stored in Local Storage for the current website.

---

# Crucial Interview Concept: How to Store Objects or Arrays?

Local Storage and Session Storage can only store **strings**.

To store an object or an array, convert it into a JSON string using `JSON.stringify()`. When retrieving the data, convert it back into an object using `JSON.parse()`.

```javascript
let user = {
  name: "Muhammad Faizan",
  role: "Developer",
};

localStorage.setItem("userObject", JSON.stringify(user));

let retrievedUserData = JSON.parse(
  localStorage.getItem("userObject")
);

console.log(retrievedUserData.name);

// Output: Muhammad Faizan
```

---

# Key Points
# Local & Seccion Storage

## Local Storage
In local storage data is permanently save in browswer utill user delelte cache or write a code to remove it.unless power cutt off the data is still reamain. And you get data from any other tab also .
## Seccion Storage
In Seccion Storage data is sotre temporary . power cutt off , tab changes, browser close data is remove.And data is store its own tab.whenever tab is close data is remove

## 4 Main Method

## 1. Saved Data
Data is stored in key-value pair(string).
  
- localStorage.setItem("username", "Muhammad Faizan");
- sessionStorage.setItem("userToken", "abc123xyz");

## 2. Read Data
To access data use **key** name .

```javascript
let name = localStorage.getItem("username");
console.log(name); // Output: Muhammad Faizan
```
## 3. Remove Item
```javascript
localStorage.removeItem("username");
```
## 4. Clear All Data

```javascript
localStorage.clear();
```

# Crucial Interview Concept: How we saved Objects/Arrays ?

```javascript
let user = {name:"Muhammad Faizan",role:"Developer"}

localStorage.setItem("UserObject",JSON.stringify(user));
let retrivedUserData = JSON.parse(localStorage.getItem("UserObject"))
console.log(retrivedUserData.name)  //Output:  Muhammad Faizan
```
- Both Local Storage and Session Storage store data as **strings**.
- Use `JSON.stringify()` before storing objects or arrays.
- Use `JSON.parse()` after retrieving objects or arrays.
- Local Storage is shared across tabs of the same website.
- Session Storage is unique to each browser tab.
- Neither Local Storage nor Session Storage should be used to store sensitive information such as passwords or authentication tokens.