class Skill {
    constructor(name, ratio, id) {
        this.name = name;
        this.ratio = ratio;
        this.id = id;
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

        this.skillItem.addEventListener("click", () => skillsController.deleteSkill(this.skillItem));
    }

    rewrite(newRatio) {
        this.skill.ratio = newRatio;
        this.persent = document.getElementById(this.skill.id + this.skill.name + "skill");
        this.progressbar = document.getElementById(this.skill.id + this.skill.name + "bar");
        this.persent.innerText = newRatio + "%";
        this.progressbar.style.width = this.persent.innerText;
    }
}

class SkillsController {
    skills;
    viewsSkill;
    visualSkills;

    constructor() {
        this.skills = [new Skill("Be sad", 99, 199)];
        this.viewsSkill = [];
        this.visualSkills = document.querySelector(".skills-list");
        for (let i = 0; i < this.skills.length; i++) {
            this.viewsSkill.push(new SkillView(this.skills[i]));
            this.visualSkills.appendChild(this.viewsSkill[i].skillItem);
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
                    this.viewsSkill[i].rewrite(this.skills[i].ratio);
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
        this.viewsSkill.push(new SkillView(skill));
        this.visualSkills.appendChild(this.viewsSkill[this.skills.length - 1].skillItem);
    }

    deleteSkill(node) {
        this.skills.splice(node.id, 1);
        this.viewsSkill.splice(node.id, 1);
        node.remove();
    }
}

const form = document.forms[0];
const [first, second] = form.querySelectorAll(".skill__input");
const addition = document.querySelector(".skill-insertion_swim");
skillsController = new SkillsController();

form.addEventListener("submit", function (event) {
    event.preventDefault();
    skillsController.addNewSkillItem(new Skill(first.value, second.value));
    form.reset();
    addition.classList.add("__hidden");
});


document.addEventListener("DOMContentLoader", movePage);
document.getElementById("add-new-skill").addEventListener("click", () => addition.classList.toggle("__hidden"));

function movePage() {
    document.location = location.pathname.substring(location.pathname.lastIndexOf("/") + 1) === "index.html"
        ? "skills.html" : "index.html";
}
