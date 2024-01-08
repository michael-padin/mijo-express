const getRegion = async () => {
  const res = await fetch("https://ph-locations-api.buonzz.com/v1/regions");
  const dataRegion = await res.json();

  return { props: dataRegion };
};

const getProvince = async () => {
  const res = await fetch("https://ph-locations-api.buonzz.com/v1/provinces");
  const dataProvince = await res.json();

  return { props: dataProvince };
};

const getCity = async () => {
  const res = await fetch("https://ph-locations-api.buonzz.com/v1/cities");
  const dataCity = await res.json();

  return { props: dataCity };
};

const getBaraggay = async () => {
  const res = await fetch("https://ph-locations-api.buonzz.com/v1/barangays");
  const dataBarangay = await res.json();

  console.log(dataBarangay);

  return { props: dataBarangay };
};
