function makeFriendsList(friends) {

  let friendsNames = friends.map((item) => `${item.firstName} ${item.lastName}`);

  let ul1 = document.createElement('ul');

  for(item in friendsNames) {
    let li = document.createElement('li');
    li.textContent = friendsNames[item];
    ul1.append(li);
  }

  return ul1;
}
