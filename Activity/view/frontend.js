const search = document.querySelector(".search");
const input = document.querySelector("input");
const p = document.querySelector(".p-entry");
const fEntry = document.querySelector(".f-entry");
const rEntry = document.querySelector(".r-entry");
search.addEventListener("click", function(e){
    e.preventDefault();
    populateProfile(input.value);
    populateFollowers(input.value);
    console.log("request send");
})

async function populateProfile(id) {
    let { data } = await axios.get(`api/v1/users/${id}`);
    console.log(data);
    let user = data.user;
    let {email_id, handle} = user;
    p.innerHTML = `<p>Email: ${email_id}</p><p>Handle: ${handle}</p>`
}

async function populateFollowers(id){
    let { data } = await axios.get(`api/v1/users/fr/${id}`);
    console.log(data);
    let arr = data.message;
    for(let i = 0;i<arr.length;i++){
        let followerObj = arr[i];
        let div = AddToUI(followerObj);
        if(followerObj.is_pending){
            console.log(followerObj);
            rEntry.appendChild(div);
            let p = document.createElement("p");
            // p.innerText = "Accept : Reject";
            let abutton = document.createElement("button");
            abutton.innerHTML = "Accept";
            abutton.addEventListener("click", async function(){
                await axios.patch(`api/v1/users/fr/${id}/${followerObj.follower_id}`);
                populateFollowers(id);
            })
            div.appendChild(abutton);
            let rbutton = document.createElement("button");
            rbutton.innerHTML = "Reject";
            rbutton.addEventListener("click", async function(){
                await axios.delete(`api/v1/users/fr/${id}/${followerObj.follower_id}`);
                populateFollowers(id);
            })
            div.appendChild(rbutton);
            div.appendChild(rbutton);
            // div.appendChild(p);
        }else{
            fEntry.appendChild(div);
        }
    }
}
function AddToUI(followerObj){
    let div = document.createElement("div");
    let img = document.createElement("img");
    let handleSpan = document.createElement("span");
    handleSpan.textContent = followerObj.handle;
    img.src = followerObj.p_img_url == null ? "default.png" : followerObj.p_img_url;
    img.height = "40";
    div.appendChild(img);
    div.appendChild(handleSpan);
    return div;
}