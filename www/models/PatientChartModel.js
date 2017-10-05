Rounding.Models.PatientChartHeader = function () {
    var self = this;
    self.LoggedInUser = [];
    self.PatientName = '';
    self.MemId = '';
    self.IsFrequentFlier = false;
};

Rounding.Models.PatientChartMenu = function () {
    var self = this;
    self.PatientChartMenu = { 
                               "SubMenus": new kendo.data.DataSource({ data: [] }),
                              "Tabs": new kendo.data.DataSource({ data: [] }),
                              "SubTabs": new kendo.data.DataSource({ data: [] }) 
                            };
    self.PathwayScreeningMenu = { "SubMenus": new kendo.data.DataSource({ data: [] }) };
    self.Moa = new kendo.data.DataSource({ data: [] })
};


Rounding.Models.PtChartPathwayMenu = function () {
    var self = this;
    self.PathwayScreeningMenu = { "SubMenus": new kendo.data.DataSource({ data: [] }) };  
};