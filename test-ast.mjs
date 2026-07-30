import('remark').then(({remark}) => {
  import('remark-gfm').then(({default: remarkGfm}) => {
    const md = '> [!NOTE]\n> **참고사항**';
    const tree = remark().use(remarkGfm).parse(md);
    console.log(JSON.stringify(tree, null, 2));
  });
});
