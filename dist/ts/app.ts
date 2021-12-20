class Skill {
    name: string;
    ratio: number;
    id: string;

    constructor(name, ratio, id);
    constructor(name, ratio);

    constructor(...args: any[]) {
        if (args.length === 2){
            this.name = args[0].name;
            this.ratio = args[1].ratio;
            this.id = this.name + this.ratio;
        }
        if (args.length === 3){
            this.name = args[0].name;
            this.ratio = args[1].ratio;
            this.id = args[2].id;
        }
    }
}

class SkillView {
    skill
    skillItem;

    constructor(skill) {
        this.skill = skill;
        this.skillItem = document.createElement("section");
        this.skillItem.className = "skills-item";
        this.skillItem.setAttribute("id", skill.id + skill.name);
        this.skillItem.innerHTML =
            `<div class="skills-item-inner">
                <div class="skill-item-title">
                    <div>${skill.name}</div>
                    <div id="${skill.id + skill.name + "skill"}">${skill.ratio}%</div>
                </div>
                <div class="progress-bar">
                    <div class="progress-bar-load" id="${this.skill.id + this.skill.name + "bar"}" style="width: ${skill.ratio}%;"></div>
                </div>
                </div>
                <div class="__delete-image" id="${this.skill.id}"></div>`;

        this.skillItem.addEventListener("click", () => skillsHandler.deleteSkill(this.skillItem));
    }

    rewrite(newRatio) {
        this.skill.ratio = newRatio;
        let persent = document.getElementById(this.skill.id + this.skill.name + "skill");
        let progressbar = document.getElementById(this.skill.id + this.skill.name + "bar");
        persent.innerText = newRatio + "%";
        progressbar.style.width = persent.innerText;
    }
}

class SkillsHandler {
    skills;
    arrayOfViewsSkill;
    presentationSkills;

    constructor() {
        this.skills = [new Skill("Be sad", 99, 199)];
        this.arrayOfViewsSkill = [];
        this.presentationSkills = document.querySelector(".skills-list");
        for (let i = 0; i < this.skills.length; i++) {
            this.arrayOfViewsSkill.push(new SkillView(this.skills[i]));
            this.presentationSkills.appendChild(this.arrayOfViewsSkill[i].skillItem);
        }
    }

    addNewSkillItem(skill) {
        for (let i = 0; i < this.skills.length; ++i) {
            if (this.skills[i].name !== skill.name) {
                continue;
            }
            if (this.skills[i].ratio !== skill.ratio) {
                if (this.skills[i].ratio !== skill.ratio) {
                    this.skills[i].ratio = skill.ratio;
                    this.arrayOfViewsSkill[i].rewrite(this.skills[i].ratio);
                    return;
                }
            } else {
                return;
            }
        }
        if (this.skills.length >= 6) {
            alert("Too much skills");
            return;
        }
        skill.id = skill.name + skill.ratio;
        this.skills.push(skill);
        this.arrayOfViewsSkill.push(new SkillView(skill));
        this.presentationSkills.appendChild(this.arrayOfViewsSkill[this.skills.length - 1].skillItem);
    }

    deleteSkill(node) {
        this.skills.splice(node.id, 1);
        this.arrayOfViewsSkill.splice(node.id, 1);
        node.remove();
    }
}

const form = document.forms[0];

const first = <HTMLInputElement>form.querySelectorAll(".skill__input")[0];
const second = <HTMLInputElement>form.querySelectorAll(".skill__input")[1];

const addition = document.querySelector(".skill-insertion_swim");
let skillsHandler = new SkillsHandler();

form.addEventListener("submit", function (event) {
    event.preventDefault();
    skillsHandler.addNewSkillItem(new Skill(first.value, second.value));
    form.reset();
    addition.classList.add("__hidden");
});

document.addEventListener("DOMContentLoader", movePage);
document.getElementById("add-new-skill").addEventListener("click", () => addition.classList.toggle("__hidden"));

function movePage() {
    document.location.href = location.pathname.substring(location.pathname.lastIndexOf("/") + 1) === "index.html"
        ? "skills.html" : "index.html";
}
