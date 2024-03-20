export const comingSoon = <
  T extends {
    ComingSoon?: boolean | null;
    Start?: string | null;
    sessions: any[];
  },
>(
  films: T[],
): T[] => {
  // const date = new Date('2023-10-05 00:00:00 GMT+03:00').getTime();
  const date = Date.now();
  return films.filter(({ ComingSoon, Start, sessions }) => {
    const start = Start ? new Date(Start).getTime() : undefined;
    // console.log('🚀 ~ file: filmsFilter.ts:11 ~ returnfilms.filter ~ start:', {
    //   date,
    //   Start,
    //   start,
    // });
    if (!ComingSoon || (start && start <= date) /* && sessions.length === 0 */) {
      return false;
    }
    return true;
  });
};

/*
filmTemplate : 'full', 'short'
    filmType: 'premierBuy', 
*/
