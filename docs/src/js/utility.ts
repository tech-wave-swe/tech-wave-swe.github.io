type TOCItem = {
  value: string;
  id: string;
  level: number;
};

function addEnumeration(toc: TOCItem[]): TOCItem[] {
  let cnum = [0];

  toc.map((item) => {
    switch (item.level) {
      case 2:
        cnum = [cnum[0] + 1];
        break;
      case 3:
        cnum = [cnum[0], cnum[1] ? cnum[1] + 1 : 1];
        break;
      case 4:
        cnum = [cnum[0], cnum[1] ? cnum[1] : 1, cnum[2] ? cnum[2] + 1 : 1];
        break;
      case 5:
        cnum = [
          cnum[0],
          cnum[1] ? cnum[1] : 1,
          cnum[2] ? cnum[2] : 1,
          cnum[3] ? cnum[3] + 1 : 1,
        ];
        break;
      case 6:
        cnum = [
          cnum[0],
          cnum[1] ? cnum[1] : 1,
          cnum[2] ? cnum[2] : 1,
          cnum[3] ? cnum[3] : 1,
          cnum[4] ? cnum[4] + 1 : 1,
        ];
        break;
    }

    item.value = cnum.join(".") + " " + item.value;
  });

  return toc;
}

export default addEnumeration;
