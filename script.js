//object 1 //
const avatarStyles = {
    
    "Mark Webber":{
        bg: "#ffe0cc",
        color: "#a0522d",
        initials: "MW",
        image: "./assets/avatar-mark-webber.webp",},

    "Angela Gray":{
        bg: "#fce4ec",
        color: "#c2185b",
        initials: "AG",
        image: "./assets/avatar-angela-gray.webp",},
        
        "Jacob Thompson":{ 
            bg: "#e8f5e9",
            color: "#2e7d32",
            initials: "JT",
            image: "./assets/avatar-jacob-thompson.webp",},
            
            "Rizky Hasanuddin":{
                 bg: "#fff9c4",
                 color: "#f57f17",
                 initials: "RH",
                 image: "./assets/avatar-rizky-hasanuddin.webp",},
                 
                 "Kimberly Smith":
                 {
                    bg: "#e0f2f1",
                    color: "#00695c",
                    initials: "KS",
                    image: "./assets/avatar-kimberly-smith.webp",},
                    
                    "Nathan Peterson":{
                        bg: "#e3f2fd",
                        color: "#1565c0",
                        initials: "NP",
                        image: "./assets/avatar-nathan-peterson.webp",},
                        
                        "Anna Kim":{
                            bg: "#f3e5f5",
                            color: "#7b1fa2",
                            initials: "AK",
                            image: "./assets/avatar-anna-kim.webp" },};

//object 2 //                            
const notifications = [
  {
    id: 1,
    sender: "Mark Webber",
    text: "reacted to your recent post",
    highlight: "My first tournament today!",
    time: "1m ago",
    read: false,
    type: "reaction"
  },
  {
    id: 2,
    sender: "Angela Gray",
    text: "followed you",
    highlight: null,
    time: "5m ago",
    read: false,
    type: "follow"
  },
  {
    id: 3,
    sender: "Jacob Thompson",
    text: "has joined your group",
    highlight: "Chess Club",
    time: "1 day ago",
    read: false,
    type: "group_join"
  },
  {
    id: 4,
    sender: "Rizky Hasanuddin",
    text: "sent you a private message",
    highlight: null,
    time: "5 days ago",
    read: true,
    type: "message",
    messageBody: "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game."
  },
  {
    id: 5,
    sender: "Kimberly Smith",
    text: "commented on your picture",
    highlight: null,
    time: "1 week ago",
    read: true,
    type: "comment_pic", 
    hasPicture: true,
    image: "./assets/image-chess.webp"//picture added//
  },
  {
    id: 6,
    sender: "Nathan Peterson",
    text: "reacted to your recent post",
    highlight: "5 end-game strategies to increase your win rate",
    time: "2 weeks ago",
    read: true,
    type: "reaction"
  },
  {
    id: 7,
    sender: "Anna Kim",
    text: "left the group",
    highlight: "Chess Club",
    time: "2 weeks ago",
    read: true,
    type: "group_leave"
  }
];

function makeAvatar(name) {
  const s = avatarStyles[name];
  if(s && s.image) {
    return `<img src="${s.image}" alt="${name}'s avatar" class="avatar">`;
}

// fallback to initials if image missing
  const fallback = s || { bg: "#e0e7ef", color: "#5a6a82", initials: name.slice(0,2).toUpperCase() };
  return `<div class="avatar" style="background:${fallback.bg};color:${fallback.color};">${fallback.initials}</div>`;
}


function render() {
  const list  = document.getElementById('notifications-list');
  const badge = document.getElementById('count-badge');

  const unread = notifications.filter(n => !n.read).length;
  badge.textContent = unread;
  badge.className = 'count-badge' + (unread === 0 ? ' zero' : '');

  list.innerHTML = notifications.map((n, i) => {
    let textLine = `<span class="name">${n.sender}</span> ${n.text}`;
    if (n.highlight) textLine += ` <span class="highlight">${n.highlight}</span>`;
     // red dot for unread notifications // 
    if (!n.read)     textLine += `<span class="unread-dot"></span>`;

    const extra   = n.messageBody ? `<div class="message-box">${n.messageBody}</div>` : '';
    
    //adding img in-front of comment //
    const picture = n.hasPicture  
    ? `<div class="pic-thumb" style="background:#ffe8e8;">
    <img src="${n.image}" alt="Comment picture" class="comment-pic">
    </div>`
    : '';

    return `
      <div class="notification-item ${n.read ? 'read' : 'unread'}"
           style="animation-delay:${i * 0.05}s"
           tabindex="0" role="button"
           onclick="toggleRead(${n.id})"
           onkeydown="if(event.key==='Enter'||event.key===' ')toggleRead(${n.id})">
        ${makeAvatar(n.sender)}
        <div class="notif-body">
          <div class="notif-text">${textLine}</div>
          <div class="notif-time">${n.time}</div>
          ${extra}
        </div>
        ${picture}
      </div>`;
  }).join('');
}

function toggleRead(id) {
  const n = notifications.find(n => n.id === id);
  if (n) n.read = !n.read;
  render();
}

function markAllAsRead() {
  notifications.forEach(n => n.read = true);
  render();
}

render();