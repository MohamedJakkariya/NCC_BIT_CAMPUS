// const findPlace = document.querySelector('#getPlace');
// const allMemberOfPlace = document.querySelectorAll('.member-home-town');

// // Place based search 
// findPlace.addEventListener('input', e => {
//   console.log(e.target.value);

//   // To parse all members one by one
//   allMemberOfPlace.forEach(member => {
//     console.log(member.textContent[0]);

//     const keyArr = String(e.target.value).split('');
//     console.log(keyArr + ' with length = ' + keyArr.length);

//     if (!keyArr.length) {
//       allMemberOfPlace.forEach(member => {
//         member.parentElement.parentElement.style.display = 'flex';
//       });
//     } else {
//       // to parst a member into array of all character
//       for (let i = 0; i < keyArr.length; i++) {
//         // check present character match 
//         if (
//           keyArr[i].toLowerCase() == String(member.textContent[i]).toLowerCase()
//         ) {
//           if(
//           keyArr[i - 1] == undefined
//           ){
//             continue;
//           }
//           else if(
//           keyArr[i - 1].toLowerCase() == String(member.textContent[i - 1]).toLowerCase()
//           ){
//             member.parentElement.parentElement.style.display = 'flex';
//           }
//           else{
//             member.parentElement.parentElement.style.display = 'none';
//           }
//         } else {
//           member.parentElement.parentElement.style.display = 'none';
//         }
//       }
//     }
//   });
// });

var dob = new Date().toLocaleDateString().split('/');

console.log(dob);