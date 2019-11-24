import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const heroesNoID = [
      { "name": "Ras Berry" },
      { "name": "John Doe" },
      { "name": "Gareth Aldridge" },
      { "name": "Hallen Pipper" },
      { "name": "Joe Allen" },
      { "name": "Dolly Johnson" }
    ];
    const heroes = heroesNoID.map((o,i) => Object.assign(o,{id: i + 1 } ));
    return {heroes};
  }

}
