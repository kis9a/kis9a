id duplicate ?

```javascript
  async updateIsPersonSearchRecent(value: boolean) {
    this.isPersonLoading = true;
    const personIds = this.contactSearchHistories
      .filter(v => v.Type === 'person')
      .map(v => v.Item && v.Item.Id) as number[];
    const set = new Set();
    if (value) {
      const result: Array<ReferenceItem<ContactPersonItem>> = await referenceApi
        .getReferences(`contact_person`, { Ids: personIds })
        .then(v => v.Value);
      this.selectedPerson = Array.from(
        [...this.selectedPerson, ...result].filter(v => {
          const duplicate = set.has(v.Id);
          set.add(v.Id);
          return !duplicate;
        }),
      );
    } else {
      this.selectedPerson = this.selectedPerson.filter(v => !personIds.some(v1 => v.Id === v1));
    }
    setTimeout(() => {
      this.isPersonLoading = false;
    }, 600);
  }
```

is duplicate ?

```javascript
this.isDuplicatedEmployeeDate = this.employeeItems.some((v, i, a) =>
  a.some((v1, i1) => (v !== v1 ? v.dateData === v1.dateData : false))
);
```

