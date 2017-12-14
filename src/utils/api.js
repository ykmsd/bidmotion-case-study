export async function getData() {
  const url = 'http://api.geonames.org/countryInfoJSON?formatted=true&username=hydrane';
  const res = await fetch(url).then(data => data.json());
  console.log(res);
  return res.geonames;
}