let findDepartment = document.querySelector('#getDepartment');
const allMemberOfDepartment = document.querySelectorAll('.member-department');

let findName = document.querySelector('#getName');
const allMemberOfName = document.querySelectorAll('.member-name');

const findPlace = document.querySelector('#getPlace');
const allMemberOfPlace = document.querySelectorAll('.member-home-town');

let findYear = document.querySelector('#getYear');
const allMemberOfYear = document.querySelectorAll('.member-year');
// Place based search
findPlace.addEventListener('input', e => {
  console.log(e.target.value);

  // To parse all members one by one
  allMemberOfPlace.forEach(member => {
    console.log(member.textContent[0]);

    const keyArr = String(e.target.value).split('');
    console.log(keyArr + ' with length = ' + keyArr.length);

    if (!keyArr.length) {
      allMemberOfPlace.forEach(member => {
        member.parentElement.parentElement.style.display = 'flex';
      });
    } else {
      // to parst a member into array of all character
      for (let i = 0; i < keyArr.length; i++) {
        if (
          keyArr[i].toLowerCase() == String(member.textContent[i]).toLowerCase()
        ) {
          if (keyArr[i - 1] == undefined) {
            continue;
          } else if (
            keyArr[i - 1].toLowerCase() ==
            String(member.textContent[i - 1]).toLowerCase()
          ) {
            member.parentElement.parentElement.style.display = 'flex';
          } else {
            member.parentElement.parentElement.style.display = 'none';
          }
        } else {
          member.parentElement.parentElement.style.display = 'none';
        }
      }
    }
  });
});

// Year based search
findYear.addEventListener('input', e => {
  console.log(e.target.value);

  // To parse all members one by one
  allMemberOfYear.forEach(member => {
    console.log(member.textContent[0]);

    const keyArr = String(e.target.value).split('');
    console.log(keyArr + ' with length = ' + keyArr.length);

    if (!keyArr.length) {
      allMemberOfYear.forEach(member => {
        member.parentElement.parentElement.parentElement.style.display = 'flex';
      });
    } else {
      // to parst a member into array of all character
      for (let i = 0; i < keyArr.length; i++) {
        if (
          keyArr[i].toLowerCase() ===
          String(member.textContent[i]).toLowerCase()
        ) {
          if (keyArr[i - 1] == undefined) {
            continue;
          } else if (
            keyArr[i - 1].toLowerCase() ==
            String(member.textContent[i - 1]).toLowerCase()
          ) {
            member.parentElement.parentElement.parentElement.style.display =
              'flex';
          } else {
            member.parentElement.parentElement.parentElement.style.display =
              'none';
          }
        } else {
          member.parentElement.parentElement.parentElement.style.display =
            'none';
        }
      }
    }
  });
});

// Name based searching
findName.addEventListener('input', e => {
  console.log(e.target.value);

  // To parse all members one by one
  allMemberOfName.forEach(member => {
    console.log(member.textContent[0]);

    const keyArr = String(e.target.value).split('');
    console.log(keyArr + ' with length = ' + keyArr.length);

    if (!keyArr.length) {
      allMemberOfName.forEach(member => {
        member.parentElement.parentElement.style.display = 'flex';
      });
    } else {
      // to parst a member into array of all character
      for (let i = 0; i < keyArr.length; i++) {
        if (
          keyArr[i].toLowerCase() ===
          String(member.textContent[i]).toLowerCase()
        ) {
          if (keyArr[i - 1] == undefined) {
            continue;
          } else if (
            keyArr[i - 1].toLowerCase() ==
            String(member.textContent[i - 1]).toLowerCase()
          ) {
            member.parentElement.parentElement.style.display = 'flex';
          } else {
            member.parentElement.parentElement.style.display = 'none';
          }
        } else {
          member.parentElement.parentElement.style.display = 'none';
        }
      }
    }
  });
});

// For Department based search
findDepartment.addEventListener('input', e => {
  console.log(e.target.value);

  // To parse all members one by one
  allMemberOfDepartment.forEach(member => {
    console.log(member.textContent[0]);

    const keyArr = String(e.target.value).split('');
    console.log(keyArr + ' with length = ' + keyArr.length);

    if (!keyArr.length) {
      allMemberOfDepartment.forEach(member => {
        member.parentElement.parentElement.style.display = 'flex';
      });
    } else {
      // to parst a member into array of all character
      for (let i = 0; i < keyArr.length; i++) {
        if (
          keyArr[i].toLowerCase() ===
          String(member.textContent[i]).toLowerCase()
        ) {
          if (keyArr[i - 1] == undefined) {
            continue;
          } else if (
            keyArr[i - 1].toLowerCase() ==
            String(member.textContent[i - 1]).toLowerCase()
          ) {
            member.parentElement.parentElement.style.display =
              'flex';
          } else {
            member.parentElement.parentElement.style.display =
              'none';
          }
        } else {
          member.parentElement.parentElement.style.display =
            'none';
        }
      }
    }
  });
});
