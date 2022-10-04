import inquirer from "inquirer";

class Citation {
    constructor(fName, date, siteName, accessDate, title, availableAt) {
        this.fName = fName;
        this.date = date;
        this.siteName = siteName;
        this.accessDate = accessDate;
        this.title = title;
        this.availableAt = availableAt;
    }

    generateCitation() {
        const aut1 = this.fName[0].split(" ");
        const aut1Name = aut1[0];
        const aut1Surname = aut1[aut1.length - 1].toUpperCase();

        if (this.fName.length == 1) {
            return `${aut1Surname}, ${aut1Name}. ${this.title}. ${this.siteName}, ${this.date}. Disponível em: ${this.availableAt}. Acesso em: ${this.accessDate}`;
        }

        const aut2 = this.fName[1].split(" ");
        const aut2Name = aut2[1];
        const aut2Surname = aut2[aut2.length - 1].toUpperCase();

        if (this.fName.length == 2) {
            return `${aut1Surname}, ${aut1Name}; ${aut2Surname}, ${aut2Name}. ${this.title}. ${this.siteName}, ${this.date}. Disponível em: ${this.availableAt}. Acesso em: ${this.accessDate}`;
        }

        return `${aut1Surname}, ${aut1Name} et al. ${this.title}. ${this.siteName}, ${this.date}. Disponível em: ${this.availableAt}. Acesso em: ${this.accessDate}`;
    }
}

function getNames(arr) {
    inquirer
        .prompt([
            {
                name: "fName",
                type: "input",
                message: "Digite o nome completo do autor (deixe em branco para parar): ",
            },
        ])
        .then((ans) => {
            if (!ans.fName) {
                getInfo(arr);
            } else {
                arr.push(ans.fName);
                getNames(arr);
            }
        });
}

function getInfo(names) {
    inquirer
        .prompt([
            {
                name: "date",
                type: "input",
                message: "Digite o ano em que o artigo foi publicado: ",
            },
            {
                name: "siteName",
                type: "input",
                message: "Digite a origem do artigo: ",
            },
            {
                name: "accessDate",
                type: "input",
                message: "Digite a data em que o artigo foi acessado: ",
            },
            {
                name: "title",
                type: "input",
                message: "Digite o título do artigo: ",
            },
            {
                name: "availableAt",
                type: "input",
                message: "Digite o link do artigo: ",
            },
        ])
        .then((ans) => {
            let totalInfo = {
                names: names,
                date: ans.date,
                site: ans.siteName,
                access: ans.accessDate,
                title: ans.title,
                availableAt: ans.availableAt,
            };

            getResult(totalInfo);
        });
}

function getResult(info) {
    const artigo = new Citation(info.names, info.date, info.site, info.access, info.title, info.availableAt);

    console.log(artigo.generateCitation());
}

function main() {
    let arrNames = new Array();

    getNames(arrNames);
}

main();
