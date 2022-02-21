const pokeServices = {

  pokeStats(pk) {
    let pkTypes = [];
    let pkStats = [];

    pk.types.map((t,index) => { 
      return pkTypes.push({
        id: index,
        name: t.type.name
      })
    });

    pk.stats.map(i => {
      return pkStats.push({
        name: i.stat.name,
        data: i.base_stat
      })
    });
    return {
      id: pk.id,
      name: pk.name,
      primaryType: pkTypes[0].name,
      types: pkTypes,
      image: pk.sprites.other.dream_world.front_default,
      stats: pkStats
    }
  } 

  
}


export default pokeServices;