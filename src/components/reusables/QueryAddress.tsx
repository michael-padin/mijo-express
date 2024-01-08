import React, { useEffect, useState } from "react";
import $ from "jquery"; // Ensure jQuery is installed and properly configured in your Next.js project

interface Region {
  region_code: string;
  region_name: string;
}

interface Province {
  region_code: string;
  province_code: string;
  province_name: string;
}

interface City {
  province_code: string;
  city_code: string;
  city_name: string;
}

interface Barangay {
  city_code: string;
  brgy_code: string;
  brgy_name: string;
}

const QueryAddress: React.FC = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [barangays, setBarangays] = useState<Barangay[]>([]);

  useEffect(() => {
    // Load regions on component mount
    const url =
      "https://github.com/wilfredpine/philippine-address-selector/blob/main/ph-json/region.json";
    $.getJSON(url, function (data: React.SetStateAction<Region[]>) {
      setRegions(data);
    });
  }, []);

  useEffect(() => {
    // Event listeners
    $("#region").on("change", fillProvinces);
    $("#province").on("change", fillCities);
    $("#city").on("change", fillBarangays);
    $("#barangay").on("change", onChangeBarangay);

    return () => {
      // Clean up event listeners on component unmount
      $("#region").off("change", fillProvinces);
      $("#province").off("change", fillCities);
      $("#city").off("change", fillBarangays);
      $("#barangay").off("change", onChangeBarangay);
    };
  }, [regions, provinces, cities, barangays]);

  const fillProvinces = () => {
    const regionCode = $("#region").val() as string;
    const regionText = $("#region option:selected").text();
    $("#region-text").val(regionText);

    // Clear city, barangay inputs
    $("#province-text").val("");
    $("#city-text").val("");
    $("#barangay-text").val("");

    // Filter & fill provinces
    const url = "ph-json/province.json";
    $.getJSON(url, function (data: any[]) {
      const result = data.filter(
        (value: Province) => value.region_code === regionCode
      );
      result.sort((a: Province, b: Province) =>
        a.province_name.localeCompare(b.province_name)
      );
      setProvinces(result);
    });
  };

  const fillCities = () => {
    const provinceCode = $("#province").val() as string;
    const provinceText = $("#province option:selected").text();
    $("#province-text").val(provinceText);

    // Clear barangay input
    $("#city-text").val("");
    $("#barangay-text").val("");

    // Filter & fill cities
    const url = "ph-json/city.json";
    $.getJSON(url, function (data: any[]) {
      const result = data.filter(
        (value: City) => value.province_code === provinceCode
      );
      result.sort((a: City, b: City) => a.city_name.localeCompare(b.city_name));
      setCities(result);
    });
  };

  const fillBarangays = () => {
    const cityCode = $("#city").val() as string;
    const cityText = $("#city option:selected").text();
    $("#city-text").val(cityText);

    // Clear barangay input
    $("#barangay-text").val("");

    // Filter & fill barangays
    const url = "ph-json/barangay.json";
    $.getJSON(url, function (data: any[]) {
      const result = data.filter(
        (value: Barangay) => value.city_code === cityCode
      );
      result.sort((a: Barangay, b: Barangay) =>
        a.brgy_name.localeCompare(b.brgy_name)
      );
      setBarangays(result);
    });
  };

  const onChangeBarangay = () => {
    const barangayText = $("#barangay option:selected").text();
    $("#barangay-text").val(barangayText);
  };

  return (
    <div className="p-5">
      <form method="POST" action="">
        <div className="col-sm-6">
          <h3>Address Selector - Philippines</h3>
        </div>
        <hr />
        <div className="col-sm-6 mb-3">
          <label className="form-label">Region</label>
          <select
            name="region"
            className="form-control form-control-md"
            id="region"
          >
            <option>Choose Region</option>
            {regions.map((region) => (
              <option key={region.region_code} value={region.region_code}>
                {region.region_name}
              </option>
            ))}
          </select>
          <input
            type="hidden"
            className="form-control form-control-md"
            name="region_text"
            id="region-text"
            required
          />
        </div>
        <div className="col-sm-6 mb-3">
          <label className="form-label">Province *</label>
          <select
            name="province"
            className="form-control form-control-md"
            id="province"
          >
            <option selected disabled>
              Choose State/Province
            </option>
            {provinces.map((province) => (
              <option
                key={province.province_code}
                value={province.province_code}
              >
                {province.province_name}
              </option>
            ))}
          </select>
          <input
            type="hidden"
            className="form-control form-control-md"
            name="province_text"
            id="province-text"
            required
          />
        </div>
        <div className="col-sm-6 mb-3">
          <label className="form-label">City / Municipality *</label>
          <select
            name="city"
            className="form-control form-control-md"
            id="city"
          >
            <option selected disabled>
              Choose city/municipality
            </option>
            {cities.map((city) => (
              <option key={city.city_code} value={city.city_code}>
                {city.city_name}
              </option>
            ))}
          </select>
          <input
            type="hidden"
            className="form-control form-control-md"
            name="city_text"
            id="city-text"
            required
          />
        </div>
        <div className="col-sm-6 mb-3">
          <label className="form-label">Barangay *</label>
          <select
            name="barangay"
            className="form-control form-control-md"
            id="barangay"
          >
            <option selected disabled>
              Choose barangay
            </option>
            {barangays.map((barangay) => (
              <option key={barangay.brgy_code} value={barangay.brgy_code}>
                {barangay.brgy_name}
              </option>
            ))}
          </select>
          <input
            type="hidden"
            className="form-control form-control-md"
            name="barangay_text"
            id="barangay-text"
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="street-text" className="form-label">
            Street (Optional)
          </label>
          <input
            type="text"
            className="form-control form-control-md"
            name="street_text"
            id="street-text"
          />
        </div>
        <div className="col-md-6">
          <input type="submit" className="btn btn-success" name="submit" />
        </div>
      </form>
    </div>
  );
};

export default QueryAddress;
