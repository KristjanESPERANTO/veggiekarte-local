/*
 * SPDX-FileCopyrightText: 2012-2013 Dmitry Marakasov
 * SPDX-FileCopyrightText: 2013-2025 Robin `ypid` Schneider <ypid@riseup.net>
 *
 * SPDX-License-Identifier: LGPL-3.0-only
 *
 * This file is based on work under the following copyright and permission
 * notice:
 *
 *     Copyright (c) 2012-2013 Dmitry Marakasov
 *     All rights reserved.
 *
 *     Redistribution and use in source and binary forms, with or without
 *     modification, are permitted provided that the following conditions are met:
 *
 *     1. Redistributions of source code must retain the above copyright notice, this
 *     list of conditions and the following disclaimer.
 *
 *     2. Redistributions in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 *
 *     THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 *     ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *     WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 *     DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 *     FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 *     DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 *     SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 *     CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 *     OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 *     OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.opening_hours = factory());
})(this, (function () { 'use strict';

  var data$A = { PH:[ { name:"Año Nuevo",
        fixed_date:[ 1,
          1 ] },
      { name:"Carnaval",
        variable_date:"easter",
        offset:-48 },
      { name:"Carnaval",
        variable_date:"easter",
        offset:-47 },
      { name:"Día Nacional de la Memoria por la Verdad y la Justicia",
        fixed_date:[ 3,
          24 ] },
      { name:"Viernes Santo",
        variable_date:"easter",
        offset:-2 },
      { name:"Feriado con fines turísticos",
        fixed_date:[ 4,
          1 ] },
      { name:"Día del Veterano y de los Caídos en la Guerra de Malvinas",
        fixed_date:[ 4,
          2 ] },
      { name:"Día del Trabajador",
        fixed_date:[ 5,
          1 ] },
      { name:"Día de la Revolución de Mayo",
        fixed_date:[ 5,
          25 ] },
      { name:"Paso a la Inmortalidad del Gral. Don Martín Miguel de Güemes",
        fixed_date:[ 6,
          17 ] },
      { name:"Paso a la Inmortalidad del General Manuel Belgrano",
        fixed_date:[ 6,
          20 ] },
      { name:"Feriado con fines turísticos",
        fixed_date:[ 6,
          21 ] },
      { name:"Día de la Independencia",
        fixed_date:[ 7,
          9 ] },
      { name:"Paso a la Inmortalidad del Gral. José de San Martín",
        fixed_date:[ 8,
          17 ] },
      { name:"Feriado con fines turísticos",
        fixed_date:[ 10,
          11 ] },
      { name:"Día del Respeto a la Diversidad Cultural",
        fixed_date:[ 10,
          12 ] },
      { name:"Día de la Soberanía Nacional",
        fixed_date:[ 11,
          18 ] },
      { name:"Inmaculada Concepción de María",
        fixed_date:[ 12,
          8 ] },
      { name:"Navidad",
        fixed_date:[ 12,
          25 ] } ] };
  data$A.PH;

  var data$z = { PH:[ { name:"Neujahrstag",
        fixed_date:[ 1,
          1 ] },
      { name:"Heilige Drei Könige",
        fixed_date:[ 1,
          6 ] },
      { name:"Ostermontag",
        variable_date:"easter",
        offset:1 },
      { name:"Staatsfeiertag",
        fixed_date:[ 5,
          1 ] },
      { name:"Christi Himmelfahrt",
        variable_date:"easter",
        offset:39 },
      { name:"Pfingstmontag",
        variable_date:"easter",
        offset:50 },
      { name:"Fronleichnam",
        variable_date:"easter",
        offset:60 },
      { name:"Mariä Himmelfahrt",
        fixed_date:[ 8,
          15 ] },
      { name:"Nationalfeiertag",
        fixed_date:[ 10,
          26 ] },
      { name:"Allerheiligen",
        fixed_date:[ 11,
          1 ] },
      { name:"Mariä Empfängnis",
        fixed_date:[ 12,
          8 ] },
      { name:"Christtag",
        fixed_date:[ 12,
          25 ] },
      { name:"Stefanitag",
        fixed_date:[ 12,
          26 ] } ],
    SH:[ { 2017:[ 4,
          8,
          4,
          18 ],
        2018:[ 3,
          24,
          4,
          3 ],
        2019:[ 4,
          13,
          4,
          23 ],
        2020:[ 4,
          4,
          4,
          14 ],
        2021:[ 3,
          27,
          4,
          6 ],
        2022:[ 4,
          9,
          4,
          19 ],
        2023:[ 4,
          1,
          4,
          11 ],
        2024:[ 3,
          23,
          4,
          2 ],
        name:"Osterferien" },
      { 2017:[ 6,
          3,
          6,
          6 ],
        2018:[ 5,
          19,
          5,
          22 ],
        2019:[ 6,
          8,
          6,
          11 ],
        2020:[ 5,
          30,
          6,
          2 ],
        2021:[ 5,
          22,
          5,
          25 ],
        2022:[ 6,
          4,
          6,
          7 ],
        2023:[ 5,
          57,
          5,
          30 ],
        2024:[ 5,
          18,
          5,
          21 ],
        name:"Pfingstferien" },
      { 2016:[ 11,
          2 ],
        2017:[ 11,
          2 ],
        2018:[ 11,
          2 ],
        2019:[ 11,
          2 ],
        2020:[ 11,
          2 ],
        2021:[ 11,
          2 ],
        2022:[ 11,
          2 ],
        2023:[ 11,
          2 ],
        name:"Allerseelen" },
      { 2016:[ 12,
          24,
          1,
          7 ],
        2017:[ 12,
          24,
          1,
          6 ],
        2018:[ 12,
          24,
          1,
          6 ],
        2019:[ 12,
          23,
          1,
          6 ],
        2020:[ 12,
          24,
          1,
          6 ],
        2021:[ 12,
          24,
          1,
          6 ],
        2022:[ 12,
          24,
          1,
          6 ],
        2023:[ 12,
          24,
          1,
          6 ],
        name:"Weihnachtsferien" } ],
    Burgenland:{ _state_code:1,
      SH:[ { 2016:[ 2,
            8,
            2,
            13 ],
          2017:[ 2,
            13,
            2,
            18 ],
          2018:[ 2,
            12,
            2,
            17 ],
          2019:[ 2,
            11,
            2,
            16 ],
          2020:[ 2,
            10,
            2,
            15 ],
          2021:[ 2,
            8,
            2,
            13 ],
          name:"Semesterferien" },
        { 2016:[ 7,
            2,
            9,
            3 ],
          2017:[ 7,
            1,
            9,
            3 ],
          2018:[ 6,
            30,
            9,
            2 ],
          2019:[ 6,
            29,
            9,
            1 ],
          2020:[ 7,
            4,
            9,
            6 ],
          2021:[ 7,
            3,
            9,
            4 ],
          name:"Sommerferien" } ] },
    "Kärnten":{ _state_code:2,
      SH:[ { 2016:[ 2,
            8,
            2,
            13 ],
          2017:[ 2,
            13,
            2,
            18 ],
          2018:[ 2,
            12,
            2,
            17 ],
          2019:[ 2,
            11,
            2,
            16 ],
          2020:[ 2,
            10,
            2,
            15 ],
          2021:[ 2,
            8,
            2,
            13 ],
          name:"Semesterferien" },
        { 2016:[ 7,
            9,
            9,
            10 ],
          2017:[ 7,
            8,
            9,
            10 ],
          2018:[ 7,
            7,
            9,
            9 ],
          2019:[ 7,
            6,
            9,
            8 ],
          2020:[ 7,
            11,
            9,
            13 ],
          2021:[ 7,
            10,
            9,
            11 ],
          name:"Sommerferien" } ] },
    "Niederösterreich":{ _state_code:3,
      SH:[ { 2016:[ 2,
            1,
            2,
            6 ],
          2017:[ 2,
            6,
            2,
            11 ],
          2018:[ 2,
            5,
            2,
            10 ],
          2019:[ 2,
            4,
            2,
            9 ],
          2020:[ 2,
            3,
            2,
            8 ],
          2021:[ 2,
            1,
            2,
            6 ],
          name:"Semesterferien" },
        { 2016:[ 7,
            2,
            9,
            3 ],
          2017:[ 7,
            1,
            9,
            3 ],
          2018:[ 6,
            30,
            9,
            2 ],
          2019:[ 6,
            29,
            9,
            1 ],
          2020:[ 7,
            4,
            9,
            6 ],
          2021:[ 7,
            3,
            9,
            4 ],
          name:"Sommerferien" } ] },
    "Oberösterreich":{ _state_code:4,
      SH:[ { 2016:[ 2,
            15,
            2,
            20 ],
          2017:[ 2,
            20,
            2,
            25 ],
          2018:[ 2,
            19,
            2,
            24 ],
          2019:[ 2,
            18,
            2,
            23 ],
          2020:[ 2,
            17,
            2,
            22 ],
          2021:[ 2,
            15,
            2,
            20 ],
          name:"Semesterferien" },
        { 2016:[ 7,
            9,
            9,
            10 ],
          2017:[ 7,
            8,
            9,
            10 ],
          2018:[ 7,
            7,
            9,
            9 ],
          2019:[ 7,
            6,
            9,
            8 ],
          2020:[ 7,
            11,
            9,
            13 ],
          2021:[ 7,
            10,
            9,
            11 ],
          name:"Sommerferien" } ] },
    Salzburg:{ _state_code:5,
      SH:[ { 2016:[ 2,
            8,
            2,
            13 ],
          2017:[ 2,
            13,
            2,
            18 ],
          2018:[ 2,
            12,
            2,
            17 ],
          2019:[ 2,
            11,
            2,
            16 ],
          2020:[ 2,
            10,
            2,
            15 ],
          2021:[ 2,
            8,
            2,
            13 ],
          name:"Semesterferien" },
        { 2016:[ 7,
            9,
            9,
            10 ],
          2017:[ 7,
            8,
            9,
            10 ],
          2018:[ 7,
            7,
            9,
            9 ],
          2019:[ 7,
            6,
            9,
            8 ],
          2020:[ 7,
            11,
            9,
            13 ],
          2021:[ 7,
            10,
            9,
            11 ],
          name:"Sommerferien" } ] },
    Steiermark:{ _state_code:6,
      SH:[ { 2016:[ 2,
            15,
            2,
            20 ],
          2017:[ 2,
            20,
            2,
            25 ],
          2018:[ 2,
            19,
            2,
            24 ],
          2019:[ 2,
            18,
            2,
            23 ],
          2020:[ 2,
            17,
            2,
            22 ],
          2021:[ 2,
            15,
            2,
            20 ],
          name:"Semesterferien" },
        { 2016:[ 7,
            9,
            9,
            10 ],
          2017:[ 7,
            8,
            9,
            10 ],
          2018:[ 7,
            7,
            9,
            9 ],
          2019:[ 7,
            6,
            9,
            8 ],
          2020:[ 7,
            11,
            9,
            13 ],
          2021:[ 7,
            10,
            9,
            12 ],
          name:"Sommerferien" } ] },
    Tirol:{ _state_code:7,
      SH:[ { 2016:[ 2,
            8,
            2,
            13 ],
          2017:[ 2,
            13,
            2,
            18 ],
          2018:[ 2,
            12,
            2,
            17 ],
          2019:[ 2,
            11,
            2,
            16 ],
          2020:[ 2,
            10,
            2,
            15 ],
          2021:[ 2,
            8,
            2,
            13 ],
          name:"Semesterferien" },
        { 2016:[ 7,
            9,
            9,
            10 ],
          2017:[ 7,
            8,
            9,
            10 ],
          2018:[ 7,
            7,
            9,
            9 ],
          2019:[ 7,
            6,
            9,
            8 ],
          2020:[ 7,
            11,
            9,
            13 ],
          2021:[ 7,
            10,
            9,
            11 ],
          name:"Sommerferien" } ] },
    Vorarlberg:{ _state_code:8,
      SH:[ { 2016:[ 2,
            15,
            2,
            20 ],
          2017:[ 2,
            13,
            2,
            18 ],
          2018:[ 2,
            5,
            2,
            10 ],
          2019:[ 2,
            11,
            2,
            16 ],
          2020:[ 2,
            10,
            2,
            15 ],
          2021:[ 2,
            8,
            2,
            13 ],
          name:"Semesterferien" },
        { 2016:[ 7,
            9,
            9,
            10 ],
          2017:[ 7,
            8,
            9,
            10 ],
          2018:[ 7,
            7,
            9,
            9 ],
          2019:[ 7,
            6,
            9,
            8 ],
          2020:[ 7,
            11,
            9,
            13 ],
          2021:[ 7,
            10,
            9,
            11 ],
          name:"Sommerferien" } ] },
    Wien:{ _state_code:9,
      SH:[ { 2016:[ 2,
            1,
            2,
            6 ],
          2017:[ 2,
            6,
            2,
            11 ],
          2018:[ 2,
            5,
            2,
            10 ],
          2019:[ 2,
            4,
            2,
            9 ],
          2020:[ 2,
            3,
            2,
            8 ],
          2021:[ 2,
            1,
            2,
            6 ],
          name:"Semesterferien" },
        { 2016:[ 7,
            2,
            9,
            3 ],
          2017:[ 7,
            1,
            9,
            3 ],
          2018:[ 6,
            30,
            9,
            2 ],
          2019:[ 6,
            29,
            9,
            1 ],
          2020:[ 7,
            4,
            9,
            6 ],
          2021:[ 7,
            3,
            9,
            4 ],
          name:"Sommerferien" } ] } };
  data$z.PH;
  data$z.SH;
  data$z.Burgenland;
  data$z.Salzburg;
  data$z.Steiermark;
  data$z.Tirol;
  data$z.Vorarlberg;
  data$z.Wien;

  var data$y = { PH:[ { name:"New Years Day",
        fixed_date:[ 1,
          1 ] },
      { name:"Australia Day",
        fixed_date:[ 1,
          26 ] },
      { name:"Good Friday",
        variable_date:"easter",
        offset:-2 },
      { name:"Easter Monday",
        variable_date:"easter",
        offset:1 },
      { name:"ANZAC Day",
        fixed_date:[ 4,
          25 ] },
      { name:"Christmas Day",
        fixed_date:[ 12,
          25 ] },
      { name:"Boxing Day",
        fixed_date:[ 12,
          26 ] } ],
    "Australian Capital Territory":{ _state_code:"act",
      PH:[ { name:"New Years Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Australia Day",
          fixed_date:[ 1,
            26 ] },
        { name:"Canberra Day",
          variable_date:"firstMarchMonday",
          offset:7 },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 },
        { name:"Easter Saturday",
          variable_date:"easter",
          offset:-1 },
        { name:"Easter Sunday",
          variable_date:"easter" },
        { name:"Easter Monday",
          variable_date:"easter",
          offset:1 },
        { name:"ANZAC Day",
          fixed_date:[ 4,
            25 ] },
        { name:"Reconciliation Day",
          variable_date:"lastMayMonday" },
        { name:"Queens Birthday",
          variable_date:"firstJuneMonday",
          offset:7 },
        { name:"Family and Community Day",
          variable_date:"lastSeptemberMonday" },
        { name:"Labour Day",
          variable_date:"firstOctoberMonday" },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Boxing Day",
          fixed_date:[ 12,
            26 ] } ] },
    "New South Wales":{ _state_code:"nsw",
      PH:[ { name:"New Years Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Australia Day",
          fixed_date:[ 1,
            26 ] },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 },
        { name:"Easter Saturday",
          variable_date:"easter",
          offset:-1 },
        { name:"Easter Sunday",
          variable_date:"easter" },
        { name:"Easter Monday",
          variable_date:"easter",
          offset:1 },
        { name:"ANZAC Day",
          fixed_date:[ 4,
            25 ] },
        { name:"Queens Birthday",
          variable_date:"firstJuneMonday",
          offset:7 },
        { name:"Labour Day",
          variable_date:"firstOctoberMonday" },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Boxing Day",
          fixed_date:[ 12,
            26 ] } ] },
    "Northern Territory":{ _state_code:"nt",
      PH:[ { name:"New Years Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Australia Day",
          fixed_date:[ 1,
            26 ] },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 },
        { name:"Easter Saturday",
          variable_date:"easter",
          offset:-1 },
        { name:"Easter Monday",
          variable_date:"easter",
          offset:1 },
        { name:"ANZAC Day",
          fixed_date:[ 4,
            25 ] },
        { name:"May Day",
          variable_date:"firstMayMonday" },
        { name:"Queens Birthday",
          variable_date:"firstJuneMonday",
          offset:7 },
        { name:"Picnic Day",
          variable_date:"firstAugustMonday" },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Boxing Day",
          fixed_date:[ 12,
            26 ] } ] },
    Queensland:{ _state_code:"qld",
      PH:[ { name:"New Years Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Australia Day",
          fixed_date:[ 1,
            26 ] },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 },
        { name:"Easter Saturday",
          variable_date:"easter",
          offset:-1 },
        { name:"Easter Monday",
          variable_date:"easter",
          offset:1 },
        { name:"ANZAC Day",
          fixed_date:[ 4,
            25 ] },
        { name:"Labour Day",
          variable_date:"firstMayMonday" },
        { name:"Queens Birthday",
          variable_date:"firstOctoberMonday" },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Boxing Day",
          fixed_date:[ 12,
            26 ] } ] },
    "South Australia":{ _state_code:"sa",
      PH:[ { name:"New Years Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Australia Day",
          fixed_date:[ 1,
            26 ] },
        { name:"Adelaide Cup",
          variable_date:"firstMarchMonday",
          offset:7 },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 },
        { name:"Easter Saturday",
          variable_date:"easter",
          offset:-1 },
        { name:"Easter Monday",
          variable_date:"easter",
          offset:1 },
        { name:"ANZAC Day",
          fixed_date:[ 4,
            25 ] },
        { name:"Queens Birthday",
          variable_date:"firstJuneMonday",
          offset:7 },
        { name:"Labour Day",
          variable_date:"firstOctoberMonday" },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Boxing Day",
          fixed_date:[ 12,
            26 ] } ] },
    Tasmania:{ _state_code:"tas",
      PH:[ { name:"New Years Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Australia Day",
          fixed_date:[ 1,
            26 ] },
        { name:"Eight Hours Day",
          variable_date:"firstMarchMonday",
          offset:7 },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 },
        { name:"Easter Monday",
          variable_date:"easter",
          offset:1 },
        { name:"ANZAC Day",
          fixed_date:[ 4,
            25 ] },
        { name:"Queens Birthday",
          variable_date:"firstJuneMonday",
          offset:7 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Boxing Day",
          fixed_date:[ 12,
            26 ] } ] },
    Victoria:{ _state_code:"vic",
      PH:[ { name:"New Years Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Australia Day",
          fixed_date:[ 1,
            26 ] },
        { name:"Labour Day",
          variable_date:"firstMarchMonday",
          offset:7 },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 },
        { name:"Easter Saturday",
          variable_date:"easter",
          offset:-1 },
        { name:"Easter Sunday",
          variable_date:"easter" },
        { name:"Easter Monday",
          variable_date:"easter",
          offset:1 },
        { name:"ANZAC Day",
          fixed_date:[ 4,
            25 ] },
        { name:"Queens Birthday",
          variable_date:"firstJuneMonday",
          offset:7 },
        { name:"AFL Grand Final",
          variable_date:"lastSeptemberFriday" },
        { name:"Melbourne Cup",
          variable_date:"firstNovemberTuesday" },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Boxing Day",
          fixed_date:[ 12,
            26 ] } ] },
    "Western Australia":{ _state_code:"wa",
      PH:[ { name:"New Years Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Australia Day",
          fixed_date:[ 1,
            26 ] },
        { name:"Labour Day",
          variable_date:"firstMarchMonday" },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 },
        { name:"Easter Monday",
          variable_date:"easter",
          offset:1 },
        { name:"ANZAC Day",
          fixed_date:[ 4,
            25 ] },
        { name:"Western Australia Day",
          variable_date:"firstJuneMonday" },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Boxing Day",
          fixed_date:[ 12,
            26 ] } ] } };
  data$y.PH;
  data$y.Queensland;
  data$y.Tasmania;
  data$y.Victoria;

  var data$x = { PH:[ { name:"Nieuwjaar - Jour de l'an",
        fixed_date:[ 1,
          1 ] },
      { name:"Paasmaandag - Lundi de Pâques",
        variable_date:"easter",
        offset:1 },
      { name:"Dag van de Arbeid - Fête du Travail",
        fixed_date:[ 5,
          1 ] },
      { name:"Onze-Lieve-Heer-Hemelvaart - Jeudi de l'Ascensionn",
        variable_date:"easter",
        offset:39 },
      { name:"Pinkstermaandag - Lundi de Pentecôte",
        variable_date:"easter",
        offset:50 },
      { name:"Nationale feestdag van België - Fête nationale",
        fixed_date:[ 7,
          21 ] },
      { name:"Onze-Lieve-Vrouw-Hemelvaart - Assomption",
        fixed_date:[ 8,
          15 ] },
      { name:"Allerheiligen - Toussaint",
        fixed_date:[ 11,
          1 ] },
      { name:"Wapenstilstand - Armistice",
        fixed_date:[ 11,
          11 ] },
      { name:"Kerstmis - Noël",
        fixed_date:[ 12,
          25 ] } ],
    SH:[ { 2020:[ 2,
          24,
          3,
          1 ],
        2021:[ 2,
          15,
          2,
          21 ],
        2022:[ 2,
          28,
          3,
          6 ],
        2023:[ 2,
          20,
          2,
          26 ],
        2024:[ 2,
          12,
          2,
          18 ],
        2025:[ 3,
          3,
          3,
          9 ],
        2026:[ 2,
          16,
          2,
          22 ],
        name:"Krokusvakantie - Vacances de carnaval" },
      { 2020:[ 4,
          6,
          4,
          19 ],
        2021:[ 4,
          5,
          4,
          18 ],
        2022:[ 4,
          4,
          4,
          18 ],
        2023:[ 4,
          3,
          4,
          16 ],
        2024:[ 4,
          1,
          4,
          14 ],
        2025:[ 4,
          7,
          4,
          21 ],
        2026:[ 4,
          6,
          4,
          19 ],
        name:"Paasvakantie - Vacances de pâques" },
      { 2020:[ 7,
          1,
          8,
          31 ],
        2021:[ 7,
          1,
          8,
          31 ],
        2022:[ 7,
          1,
          8,
          31 ],
        2023:[ 7,
          1,
          8,
          31 ],
        2024:[ 7,
          1,
          8,
          31 ],
        2025:[ 7,
          1,
          8,
          31 ],
        2026:[ 7,
          1,
          8,
          31 ],
        name:"Zomervakantie - Vacances d'été" },
      { 2019:[ 10,
          28,
          11,
          3 ],
        2020:[ 11,
          2,
          11,
          15 ],
        2021:[ 11,
          1,
          11,
          7 ],
        2022:[ 10,
          31,
          11,
          6 ],
        2023:[ 10,
          30,
          11,
          5 ],
        2024:[ 10,
          28,
          11,
          3 ],
        2025:[ 10,
          27,
          11,
          2 ],
        name:"Herfstvakantie - Vacances automne" },
      { 2019:[ 12,
          23,
          1,
          5 ],
        2020:[ 12,
          21,
          1,
          3 ],
        2021:[ 12,
          27,
          1,
          9 ],
        2022:[ 12,
          26,
          1,
          8 ],
        2023:[ 12,
          25,
          1,
          7 ],
        2024:[ 12,
          23,
          1,
          5 ],
        2025:[ 12,
          22,
          1,
          4 ],
        name:"Kerstvakantie - Vacances de Noël" } ] };
  data$x.PH;
  data$x.SH;

  var data$w = { PH:[ { name:"Ano Novo",
        fixed_date:[ 1,
          1 ] },
      { name:"Carnaval",
        variable_date:"easter",
        offset:-47 },
      { name:"Sexta-feira santa",
        variable_date:"easter",
        offset:-2 },
      { name:"Tiradentes",
        fixed_date:[ 4,
          21 ] },
      { name:"Dia do Trabalhador",
        fixed_date:[ 5,
          1 ] },
      { name:"Corpus Christi",
        variable_date:"easter",
        offset:60 },
      { name:"Independência",
        fixed_date:[ 9,
          7 ] },
      { name:"Nossa Senhora Aparecida",
        fixed_date:[ 10,
          12 ] },
      { name:"Finados",
        fixed_date:[ 11,
          2 ] },
      { name:"Proclamação da República",
        fixed_date:[ 11,
          15 ] },
      { name:"Natal",
        fixed_date:[ 12,
          25 ] } ],
    Acre:{ PH:[ { name:"Ano Novo",
          fixed_date:[ 1,
            1 ] },
        { name:"Dia do evangélico",
          fixed_date:[ 1,
            23 ] },
        { name:"Carnaval",
          variable_date:"easter",
          offset:-47 },
        { name:"Alusivo ao Dia Internacional da Mulher",
          fixed_date:[ 3,
            8 ] },
        { name:"Sexta-feira santa",
          variable_date:"easter",
          offset:-2 },
        { name:"Tiradentes",
          fixed_date:[ 4,
            21 ] },
        { name:"Dia do Trabalhador",
          fixed_date:[ 5,
            1 ] },
        { name:"Corpus Christi",
          variable_date:"easter",
          offset:60 },
        { name:"Aniversário do estado",
          fixed_date:[ 6,
            15 ] },
        { name:"Dia da Amazônia",
          fixed_date:[ 9,
            5 ] },
        { name:"Independência",
          fixed_date:[ 9,
            7 ] },
        { name:"Nossa Senhora Aparecida",
          fixed_date:[ 10,
            12 ] },
        { name:"Finados",
          fixed_date:[ 11,
            2 ] },
        { name:"Proclamação da República",
          fixed_date:[ 11,
            15 ] },
        { name:"Assinatura do Tratado de Petrópolis",
          fixed_date:[ 11,
            17 ] },
        { name:"Natal",
          fixed_date:[ 12,
            25 ] } ] },
    Alagoas:{ PH:[ { name:"Ano Novo",
          fixed_date:[ 1,
            1 ] },
        { name:"Carnaval",
          variable_date:"easter",
          offset:-47 },
        { name:"Sexta-feira santa",
          variable_date:"easter",
          offset:-2 },
        { name:"Tiradentes",
          fixed_date:[ 4,
            21 ] },
        { name:"Dia do Trabalhador",
          fixed_date:[ 5,
            1 ] },
        { name:"Corpus Christi",
          variable_date:"easter",
          offset:60 },
        { name:"São João",
          fixed_date:[ 6,
            24 ] },
        { name:"São Pedro",
          fixed_date:[ 6,
            29 ] },
        { name:"Independência",
          fixed_date:[ 9,
            7 ] },
        { name:"Emancipação política",
          fixed_date:[ 9,
            16 ] },
        { name:"Nossa Senhora Aparecida",
          fixed_date:[ 10,
            12 ] },
        { name:"Finados",
          fixed_date:[ 11,
            2 ] },
        { name:"Proclamação da República",
          fixed_date:[ 11,
            15 ] },
        { name:"Morte de Zumbi dos Palmares",
          fixed_date:[ 11,
            20 ] },
        { name:"Natal",
          fixed_date:[ 12,
            25 ] } ] },
    "Amapá":{ PH:[ { name:"Ano Novo",
          fixed_date:[ 1,
            1 ] },
        { name:"Carnaval",
          variable_date:"easter",
          offset:-47 },
        { name:"Dia de São José",
          fixed_date:[ 3,
            19 ] },
        { name:"Sexta-feira santa",
          variable_date:"easter",
          offset:-2 },
        { name:"Tiradentes",
          fixed_date:[ 4,
            21 ] },
        { name:"Dia do Trabalhador",
          fixed_date:[ 5,
            1 ] },
        { name:"Corpus Christi",
          variable_date:"easter",
          offset:60 },
        { name:"Independência",
          fixed_date:[ 9,
            7 ] },
        { name:"Data Magna do estado",
          fixed_date:[ 9,
            13 ] },
        { name:"Nossa Senhora Aparecida",
          fixed_date:[ 10,
            12 ] },
        { name:"Finados",
          fixed_date:[ 11,
            2 ] },
        { name:"Proclamação da República",
          fixed_date:[ 11,
            15 ] },
        { name:"Natal",
          fixed_date:[ 12,
            25 ] } ] },
    Amazonas:{ PH:[ { name:"Ano Novo",
          fixed_date:[ 1,
            1 ] },
        { name:"Carnaval",
          variable_date:"easter",
          offset:-47 },
        { name:"Sexta-feira santa",
          variable_date:"easter",
          offset:-2 },
        { name:"Tiradentes",
          fixed_date:[ 4,
            21 ] },
        { name:"Dia do Trabalhador",
          fixed_date:[ 5,
            1 ] },
        { name:"Corpus Christi",
          variable_date:"easter",
          offset:60 },
        { name:"Data Magna do estado",
          fixed_date:[ 9,
            5 ] },
        { name:"Independência",
          fixed_date:[ 9,
            7 ] },
        { name:"Nossa Senhora Aparecida",
          fixed_date:[ 10,
            12 ] },
        { name:"Finados",
          fixed_date:[ 11,
            2 ] },
        { name:"Proclamação da República",
          fixed_date:[ 11,
            15 ] },
        { name:"Dia da Consciência Negra",
          fixed_date:[ 11,
            20 ] },
        { name:"Natal",
          fixed_date:[ 12,
            25 ] } ] },
    Bahia:{ PH:[ { name:"Ano Novo",
          fixed_date:[ 1,
            1 ] },
        { name:"Carnaval",
          variable_date:"easter",
          offset:-47 },
        { name:"Sexta-feira santa",
          variable_date:"easter",
          offset:-2 },
        { name:"Tiradentes",
          fixed_date:[ 4,
            21 ] },
        { name:"Dia do Trabalhador",
          fixed_date:[ 5,
            1 ] },
        { name:"Corpus Christi",
          variable_date:"easter",
          offset:60 },
        { name:"Data magna do estado",
          fixed_date:[ 2,
            7 ] },
        { name:"Independência",
          fixed_date:[ 9,
            7 ] },
        { name:"Nossa Senhora Aparecida",
          fixed_date:[ 10,
            12 ] },
        { name:"Finados",
          fixed_date:[ 11,
            2 ] },
        { name:"Proclamação da República",
          fixed_date:[ 11,
            15 ] },
        { name:"Natal",
          fixed_date:[ 12,
            25 ] } ] },
    "Ceará":{ PH:[ { name:"Ano Novo",
          fixed_date:[ 1,
            1 ] },
        { name:"Carnaval",
          variable_date:"easter",
          offset:-47 },
        { name:"Data magna do estado",
          fixed_date:[ 3,
            25 ] },
        { name:"Sexta-feira santa",
          variable_date:"easter",
          offset:-2 },
        { name:"Tiradentes",
          fixed_date:[ 4,
            21 ] },
        { name:"Dia do Trabalhador",
          fixed_date:[ 5,
            1 ] },
        { name:"Corpus Christi",
          variable_date:"easter",
          offset:60 },
        { name:"Independência",
          fixed_date:[ 9,
            7 ] },
        { name:"Nossa Senhora Aparecida",
          fixed_date:[ 10,
            12 ] },
        { name:"Finados",
          fixed_date:[ 11,
            2 ] },
        { name:"Proclamação da República",
          fixed_date:[ 11,
            15 ] },
        { name:"Natal",
          fixed_date:[ 12,
            25 ] } ] },
    "Distrito Federal":{ PH:[ { name:"Ano Novo",
          fixed_date:[ 1,
            1 ] },
        { name:"Carnaval",
          variable_date:"easter",
          offset:-47 },
        { name:"Sexta-feira santa",
          variable_date:"easter",
          offset:-2 },
        { name:"Tiradentes",
          fixed_date:[ 4,
            21 ] },
        { name:"Dia do Trabalhador",
          fixed_date:[ 5,
            1 ] },
        { name:"Corpus Christi",
          variable_date:"easter",
          offset:60 },
        { name:"Independência",
          fixed_date:[ 9,
            7 ] },
        { name:"Nossa Senhora Aparecida",
          fixed_date:[ 10,
            12 ] },
        { name:"Finados",
          fixed_date:[ 11,
            2 ] },
        { name:"Proclamação da República",
          fixed_date:[ 11,
            15 ] },
        { name:"Dia do evangélico",
          fixed_date:[ 11,
            30 ] },
        { name:"Natal",
          fixed_date:[ 12,
            25 ] } ] },
    "Espírito Santo":{ PH:[ { name:"Ano Novo",
          fixed_date:[ 1,
            1 ] },
        { name:"Carnaval",
          variable_date:"easter",
          offset:-47 },
        { name:"Sexta-feira santa",
          variable_date:"easter",
          offset:-2 },
        { name:"Tiradentes",
          fixed_date:[ 4,
            21 ] },
        { name:"Data magna do estado",
          fixed_date:[ 4,
            21 ] },
        { name:"Dia do Trabalhador",
          fixed_date:[ 5,
            1 ] },
        { name:"Corpus Christi",
          variable_date:"easter",
          offset:60 },
        { name:"Independência",
          fixed_date:[ 9,
            7 ] },
        { name:"Nossa Senhora Aparecida",
          fixed_date:[ 10,
            12 ] },
        { name:"Finados",
          fixed_date:[ 11,
            2 ] },
        { name:"Proclamação da República",
          fixed_date:[ 11,
            15 ] },
        { name:"Natal",
          fixed_date:[ 12,
            25 ] } ] },
    "Goiás":{ PH:[ { name:"Ano Novo",
          fixed_date:[ 1,
            1 ] },
        { name:"Carnaval",
          variable_date:"easter",
          offset:-47 },
        { name:"Sexta-feira santa",
          variable_date:"easter",
          offset:-2 },
        { name:"Tiradentes",
          fixed_date:[ 4,
            21 ] },
        { name:"Dia do Trabalhador",
          fixed_date:[ 5,
            1 ] },
        { name:"Corpus Christi",
          variable_date:"easter",
          offset:60 },
        { name:"Independência",
          fixed_date:[ 9,
            7 ] },
        { name:"Nossa Senhora Aparecida",
          fixed_date:[ 10,
            12 ] },
        { name:"Finados",
          fixed_date:[ 11,
            2 ] },
        { name:"Proclamação da República",
          fixed_date:[ 11,
            15 ] },
        { name:"Natal",
          fixed_date:[ 12,
            25 ] } ] },
    "Maranhão":{ PH:[ { name:"Ano Novo",
          fixed_date:[ 1,
            1 ] },
        { name:"Carnaval",
          variable_date:"easter",
          offset:-47 },
        { name:"Sexta-feira santa",
          variable_date:"easter",
          offset:-2 },
        { name:"Tiradentes",
          fixed_date:[ 4,
            21 ] },
        { name:"Dia do Trabalhador",
          fixed_date:[ 5,
            1 ] },
        { name:"Corpus Christi",
          variable_date:"easter",
          offset:60 },
        { name:"Data magna do estado",
          fixed_date:[ 7,
            28 ] },
        { name:"Independência",
          fixed_date:[ 9,
            7 ] },
        { name:"Nossa Senhora Aparecida",
          fixed_date:[ 10,
            12 ] },
        { name:"Finados",
          fixed_date:[ 11,
            2 ] },
        { name:"Proclamação da República",
          fixed_date:[ 11,
            15 ] },
        { name:"Natal",
          fixed_date:[ 12,
            25 ] } ] },
    "Mato Grosso":{ PH:[ { name:"Ano Novo",
          fixed_date:[ 1,
            1 ] },
        { name:"Carnaval",
          variable_date:"easter",
          offset:-47 },
        { name:"Sexta-feira santa",
          variable_date:"easter",
          offset:-2 },
        { name:"Tiradentes",
          fixed_date:[ 4,
            21 ] },
        { name:"Dia do Trabalhador",
          fixed_date:[ 5,
            1 ] },
        { name:"Corpus Christi",
          variable_date:"easter",
          offset:60 },
        { name:"Independência",
          fixed_date:[ 9,
            7 ] },
        { name:"Nossa Senhora Aparecida",
          fixed_date:[ 10,
            12 ] },
        { name:"Finados",
          fixed_date:[ 11,
            2 ] },
        { name:"Proclamação da República",
          fixed_date:[ 11,
            15 ] },
        { name:"Dia da Consciência Negra",
          fixed_date:[ 11,
            20 ] },
        { name:"Natal",
          fixed_date:[ 12,
            25 ] } ] },
    "Mato Grosso do Sul":{ PH:[ { name:"Ano Novo",
          fixed_date:[ 1,
            1 ] },
        { name:"Carnaval",
          variable_date:"easter",
          offset:-47 },
        { name:"Sexta-feira santa",
          variable_date:"easter",
          offset:-2 },
        { name:"Tiradentes",
          fixed_date:[ 4,
            21 ] },
        { name:"Dia do Trabalhador",
          fixed_date:[ 5,
            1 ] },
        { name:"Corpus Christi",
          variable_date:"easter",
          offset:60 },
        { name:"Independência",
          fixed_date:[ 9,
            7 ] },
        { name:"Criação do estado",
          fixed_date:[ 10,
            11 ] },
        { name:"Nossa Senhora Aparecida",
          fixed_date:[ 10,
            12 ] },
        { name:"Finados",
          fixed_date:[ 11,
            2 ] },
        { name:"Proclamação da República",
          fixed_date:[ 11,
            15 ] },
        { name:"Natal",
          fixed_date:[ 12,
            25 ] } ] },
    "Minas Gerais":{ PH:[ { name:"Ano Novo",
          fixed_date:[ 1,
            1 ] },
        { name:"Carnaval",
          variable_date:"easter",
          offset:-47 },
        { name:"Sexta-feira santa",
          variable_date:"easter",
          offset:-2 },
        { name:"Tiradentes",
          fixed_date:[ 4,
            21 ] },
        { name:"Data magna do estado",
          fixed_date:[ 4,
            21 ] },
        { name:"Dia do Trabalhador",
          fixed_date:[ 5,
            1 ] },
        { name:"Corpus Christi",
          variable_date:"easter",
          offset:60 },
        { name:"Independência",
          fixed_date:[ 9,
            7 ] },
        { name:"Nossa Senhora Aparecida",
          fixed_date:[ 10,
            12 ] },
        { name:"Finados",
          fixed_date:[ 11,
            2 ] },
        { name:"Proclamação da República",
          fixed_date:[ 11,
            15 ] },
        { name:"Natal",
          fixed_date:[ 12,
            25 ] } ] },
    "Pará":{ PH:[ { name:"Ano Novo",
          fixed_date:[ 1,
            1 ] },
        { name:"Carnaval",
          variable_date:"easter",
          offset:-47 },
        { name:"Sexta-feira santa",
          variable_date:"easter",
          offset:-2 },
        { name:"Tiradentes",
          fixed_date:[ 4,
            21 ] },
        { name:"Dia do Trabalhador",
          fixed_date:[ 5,
            1 ] },
        { name:"Corpus Christi",
          variable_date:"easter",
          offset:60 },
        { name:"Data magna do estado",
          fixed_date:[ 8,
            15 ] },
        { name:"Independência",
          fixed_date:[ 9,
            7 ] },
        { name:"Nossa Senhora Aparecida",
          fixed_date:[ 10,
            12 ] },
        { name:"Finados",
          fixed_date:[ 11,
            2 ] },
        { name:"Proclamação da República",
          fixed_date:[ 11,
            15 ] },
        { name:"Natal",
          fixed_date:[ 12,
            25 ] } ] },
    "Paraíba":{ PH:[ { name:"Ano Novo",
          fixed_date:[ 1,
            1 ] },
        { name:"Carnaval",
          variable_date:"easter",
          offset:-47 },
        { name:"Sexta-feira santa",
          variable_date:"easter",
          offset:-2 },
        { name:"Tiradentes",
          fixed_date:[ 4,
            21 ] },
        { name:"Dia do Trabalhador",
          fixed_date:[ 5,
            1 ] },
        { name:"Corpus Christi",
          variable_date:"easter",
          offset:60 },
        { name:"Homenagem a João Pessoa",
          fixed_date:[ 7,
            26 ] },
        { name:"Data magna do estado",
          fixed_date:[ 8,
            5 ] },
        { name:"Independência",
          fixed_date:[ 9,
            7 ] },
        { name:"Nossa Senhora Aparecida",
          fixed_date:[ 10,
            12 ] },
        { name:"Finados",
          fixed_date:[ 11,
            2 ] },
        { name:"Proclamação da República",
          fixed_date:[ 11,
            15 ] },
        { name:"Natal",
          fixed_date:[ 12,
            25 ] } ] },
    "Paraná":{ PH:[ { name:"Ano Novo",
          fixed_date:[ 1,
            1 ] },
        { name:"Carnaval",
          variable_date:"easter",
          offset:-47 },
        { name:"Sexta-feira santa",
          variable_date:"easter",
          offset:-2 },
        { name:"Tiradentes",
          fixed_date:[ 4,
            21 ] },
        { name:"Dia do Trabalhador",
          fixed_date:[ 5,
            1 ] },
        { name:"Corpus Christi",
          variable_date:"easter",
          offset:60 },
        { name:"Independência",
          fixed_date:[ 9,
            7 ] },
        { name:"Nossa Senhora Aparecida",
          fixed_date:[ 10,
            12 ] },
        { name:"Finados",
          fixed_date:[ 11,
            2 ] },
        { name:"Proclamação da República",
          fixed_date:[ 11,
            15 ] },
        { name:"Data magna do estado",
          fixed_date:[ 12,
            19 ] },
        { name:"Natal",
          fixed_date:[ 12,
            25 ] } ] },
    Pernambuco:{ PH:[ { name:"Ano Novo",
          fixed_date:[ 1,
            1 ] },
        { name:"Carnaval",
          variable_date:"easter",
          offset:-47 },
        { name:"Data magna do estado",
          variable_date:"firstMarchSunday" },
        { name:"Sexta-feira santa",
          variable_date:"easter",
          offset:-2 },
        { name:"Tiradentes",
          fixed_date:[ 4,
            21 ] },
        { name:"Dia do Trabalhador",
          fixed_date:[ 5,
            1 ] },
        { name:"Corpus Christi",
          variable_date:"easter",
          offset:60 },
        { name:"Independência",
          fixed_date:[ 9,
            7 ] },
        { name:"Nossa Senhora Aparecida",
          fixed_date:[ 10,
            12 ] },
        { name:"Finados",
          fixed_date:[ 11,
            2 ] },
        { name:"Proclamação da República",
          fixed_date:[ 11,
            15 ] },
        { name:"Natal",
          fixed_date:[ 12,
            25 ] } ] },
    "Piauí":{ PH:[ { name:"Ano Novo",
          fixed_date:[ 1,
            1 ] },
        { name:"Carnaval",
          variable_date:"easter",
          offset:-47 },
        { name:"Sexta-feira santa",
          variable_date:"easter",
          offset:-2 },
        { name:"Tiradentes",
          fixed_date:[ 4,
            21 ] },
        { name:"Dia do Trabalhador",
          fixed_date:[ 5,
            1 ] },
        { name:"Corpus Christi",
          variable_date:"easter",
          offset:60 },
        { name:"Independência",
          fixed_date:[ 9,
            7 ] },
        { name:"Nossa Senhora Aparecida",
          fixed_date:[ 10,
            12 ] },
        { name:"Data magna do estado",
          fixed_date:[ 10,
            19 ] },
        { name:"Finados",
          fixed_date:[ 11,
            2 ] },
        { name:"Proclamação da República",
          fixed_date:[ 11,
            15 ] },
        { name:"Natal",
          fixed_date:[ 12,
            25 ] } ] },
    "Rio de Janeiro":{ PH:[ { name:"Ano Novo",
          fixed_date:[ 1,
            1 ] },
        { name:"Carnaval",
          variable_date:"easter",
          offset:-47 },
        { name:"Sexta-feira santa",
          variable_date:"easter",
          offset:-2 },
        { name:"Tiradentes",
          fixed_date:[ 4,
            21 ] },
        { name:"Dia do Trabalhador",
          fixed_date:[ 5,
            1 ] },
        { name:"Corpus Christi",
          variable_date:"easter",
          offset:60 },
        { name:"Independência",
          fixed_date:[ 9,
            7 ] },
        { name:"Nossa Senhora Aparecida",
          fixed_date:[ 10,
            12 ] },
        { name:"Finados",
          fixed_date:[ 11,
            2 ] },
        { name:"Proclamação da República",
          fixed_date:[ 11,
            15 ] },
        { name:"Dia da Consciência Negra",
          fixed_date:[ 11,
            20 ] },
        { name:"Natal",
          fixed_date:[ 12,
            25 ] } ] },
    "Rio Grande do Norte":{ PH:[ { name:"Ano Novo",
          fixed_date:[ 1,
            1 ] },
        { name:"Carnaval",
          variable_date:"easter",
          offset:-47 },
        { name:"Sexta-feira santa",
          variable_date:"easter",
          offset:-2 },
        { name:"Tiradentes",
          fixed_date:[ 4,
            21 ] },
        { name:"São Jorge",
          fixed_date:[ 4,
            23 ] },
        { name:"Dia do Trabalhador",
          fixed_date:[ 5,
            1 ] },
        { name:"Corpus Christi",
          variable_date:"easter",
          offset:60 },
        { name:"Independência",
          fixed_date:[ 9,
            7 ] },
        { name:"Mártires de Cunhaú e Uruaçu",
          fixed_date:[ 10,
            3 ] },
        { name:"Nossa Senhora Aparecida",
          fixed_date:[ 10,
            12 ] },
        { name:"Finados",
          fixed_date:[ 11,
            2 ] },
        { name:"Proclamação da República",
          fixed_date:[ 11,
            15 ] },
        { name:"Natal",
          fixed_date:[ 12,
            25 ] } ] },
    "Rio Grande do Sul":{ PH:[ { name:"Ano Novo",
          fixed_date:[ 1,
            1 ] },
        { name:"Carnaval",
          variable_date:"easter",
          offset:-47 },
        { name:"Sexta-feira santa",
          variable_date:"easter",
          offset:-2 },
        { name:"Tiradentes",
          fixed_date:[ 4,
            21 ] },
        { name:"Dia do Trabalhador",
          fixed_date:[ 5,
            1 ] },
        { name:"Corpus Christi",
          variable_date:"easter",
          offset:60 },
        { name:"Independência",
          fixed_date:[ 9,
            7 ] },
        { name:"Proclamação da República Rio-Grandense",
          fixed_date:[ 9,
            20 ] },
        { name:"Nossa Senhora Aparecida",
          fixed_date:[ 10,
            12 ] },
        { name:"Finados",
          fixed_date:[ 11,
            2 ] },
        { name:"Proclamação da República",
          fixed_date:[ 11,
            15 ] },
        { name:"Natal",
          fixed_date:[ 12,
            25 ] } ] },
    "Rondônia":{ PH:[ { name:"Ano Novo",
          fixed_date:[ 1,
            1 ] },
        { name:"Data magna do estado",
          fixed_date:[ 1,
            4 ] },
        { name:"Carnaval",
          variable_date:"easter",
          offset:-47 },
        { name:"Sexta-feira santa",
          variable_date:"easter",
          offset:-2 },
        { name:"Tiradentes",
          fixed_date:[ 4,
            21 ] },
        { name:"Dia do Trabalhador",
          fixed_date:[ 5,
            1 ] },
        { name:"Corpus Christi",
          variable_date:"easter",
          offset:60 },
        { name:"Dia do evangélico",
          fixed_date:[ 6,
            18 ] },
        { name:"Independência",
          fixed_date:[ 9,
            7 ] },
        { name:"Nossa Senhora Aparecida",
          fixed_date:[ 10,
            12 ] },
        { name:"Finados",
          fixed_date:[ 11,
            2 ] },
        { name:"Proclamação da República",
          fixed_date:[ 11,
            15 ] },
        { name:"Natal",
          fixed_date:[ 12,
            25 ] } ] },
    Roraima:{ PH:[ { name:"Ano Novo",
          fixed_date:[ 1,
            1 ] },
        { name:"Carnaval",
          variable_date:"easter",
          offset:-47 },
        { name:"Sexta-feira santa",
          variable_date:"easter",
          offset:-2 },
        { name:"Tiradentes",
          fixed_date:[ 4,
            21 ] },
        { name:"Dia do Trabalhador",
          fixed_date:[ 5,
            1 ] },
        { name:"Corpus Christi",
          variable_date:"easter",
          offset:60 },
        { name:"Independência",
          fixed_date:[ 9,
            7 ] },
        { name:"Data magna do estado",
          fixed_date:[ 10,
            5 ] },
        { name:"Nossa Senhora Aparecida",
          fixed_date:[ 10,
            12 ] },
        { name:"Finados",
          fixed_date:[ 11,
            2 ] },
        { name:"Proclamação da República",
          fixed_date:[ 11,
            15 ] },
        { name:"Natal",
          fixed_date:[ 12,
            25 ] } ] },
    "Santa Catarina":{ PH:[ { name:"Ano Novo",
          fixed_date:[ 1,
            1 ] },
        { name:"Carnaval",
          variable_date:"easter",
          offset:-47 },
        { name:"Sexta-feira santa",
          variable_date:"easter",
          offset:-2 },
        { name:"Tiradentes",
          fixed_date:[ 4,
            21 ] },
        { name:"Dia do Trabalhador",
          fixed_date:[ 5,
            1 ] },
        { name:"Corpus Christi",
          variable_date:"easter",
          offset:60 },
        { name:"Data magna do estado",
          fixed_date:[ 8,
            11 ] },
        { name:"Independência",
          fixed_date:[ 9,
            7 ] },
        { name:"Nossa Senhora Aparecida",
          fixed_date:[ 10,
            12 ] },
        { name:"Finados",
          fixed_date:[ 11,
            2 ] },
        { name:"Proclamação da República",
          fixed_date:[ 11,
            15 ] },
        { name:"Santa Catarina de Alexandria",
          fixed_date:[ 11,
            25 ] },
        { name:"Natal",
          fixed_date:[ 12,
            25 ] } ] },
    "São Paulo":{ PH:[ { name:"Ano Novo",
          fixed_date:[ 1,
            1 ] },
        { name:"Carnaval",
          variable_date:"easter",
          offset:-47 },
        { name:"Sexta-feira santa",
          variable_date:"easter",
          offset:-2 },
        { name:"Tiradentes",
          fixed_date:[ 4,
            21 ] },
        { name:"Dia do Trabalhador",
          fixed_date:[ 5,
            1 ] },
        { name:"Corpus Christi",
          variable_date:"easter",
          offset:60 },
        { name:"Data magna do estado",
          fixed_date:[ 7,
            9 ] },
        { name:"Independência",
          fixed_date:[ 9,
            7 ] },
        { name:"Nossa Senhora Aparecida",
          fixed_date:[ 10,
            12 ] },
        { name:"Finados",
          fixed_date:[ 11,
            2 ] },
        { name:"Proclamação da República",
          fixed_date:[ 11,
            15 ] },
        { name:"Natal",
          fixed_date:[ 12,
            25 ] } ] },
    Sergipe:{ PH:[ { name:"Ano Novo",
          fixed_date:[ 1,
            1 ] },
        { name:"Carnaval",
          variable_date:"easter",
          offset:-47 },
        { name:"Aniversário de Aracaju",
          fixed_date:[ 3,
            17 ] },
        { name:"Sexta-feira santa",
          variable_date:"easter",
          offset:-2 },
        { name:"Tiradentes",
          fixed_date:[ 4,
            21 ] },
        { name:"Dia do Trabalhador",
          fixed_date:[ 5,
            1 ] },
        { name:"Corpus Christi",
          variable_date:"easter",
          offset:60 },
        { name:"São João",
          fixed_date:[ 6,
            24 ] },
        { name:"Data magna do estado",
          fixed_date:[ 7,
            8 ] },
        { name:"Independência",
          fixed_date:[ 9,
            7 ] },
        { name:"Nossa Senhora Aparecida",
          fixed_date:[ 10,
            12 ] },
        { name:"Finados",
          fixed_date:[ 11,
            2 ] },
        { name:"Proclamação da República",
          fixed_date:[ 11,
            15 ] },
        { name:"Nossa Senhora da Conceição",
          fixed_date:[ 12,
            8 ] },
        { name:"Natal",
          fixed_date:[ 12,
            25 ] } ] },
    Tocantins:{ PH:[ { name:"Ano Novo",
          fixed_date:[ 1,
            1 ] },
        { name:"Carnaval",
          variable_date:"easter",
          offset:-47 },
        { name:"Autonomia do estado",
          fixed_date:[ 3,
            18 ] },
        { name:"Sexta-feira santa",
          variable_date:"easter",
          offset:-2 },
        { name:"Tiradentes",
          fixed_date:[ 4,
            21 ] },
        { name:"Dia do Trabalhador",
          fixed_date:[ 5,
            1 ] },
        { name:"Corpus Christi",
          variable_date:"easter",
          offset:60 },
        { name:"Independência",
          fixed_date:[ 9,
            7 ] },
        { name:"Nossa Senhora da Natividade",
          fixed_date:[ 9,
            8 ] },
        { name:"Criação do estado",
          fixed_date:[ 10,
            5 ] },
        { name:"Nossa Senhora Aparecida",
          fixed_date:[ 10,
            12 ] },
        { name:"Finados",
          fixed_date:[ 11,
            2 ] },
        { name:"Proclamação da República",
          fixed_date:[ 11,
            15 ] },
        { name:"Natal",
          fixed_date:[ 12,
            25 ] } ] } };
  data$w.PH;
  data$w.Acre;
  data$w.Alagoas;
  data$w.Amazonas;
  data$w.Bahia;
  data$w.Pernambuco;
  data$w.Roraima;
  data$w.Sergipe;
  data$w.Tocantins;

  var data$v = { PH:[ { name:"New Year's Day",
        fixed_date:[ 1,
          1 ] },
      { name:"Good Friday",
        variable_date:"easter",
        offset:-2 },
      { name:"Canada Day",
        variable_date:"canadaDay" },
      { name:"Labour Day",
        variable_date:"firstSeptemberMonday" },
      { name:"Christmas Day",
        fixed_date:[ 12,
          25 ] } ],
    Alberta:{ PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Alberta Family Day",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 },
        { name:"Easter Monday",
          variable_date:"easter",
          offset:1 },
        { name:"Victoria Day",
          variable_date:"victoriaDay" },
        { name:"Canada Day",
          variable_date:"canadaDay" },
        { name:"Heritage Day",
          variable_date:"firstAugustMonday" },
        { name:"Labour Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Thanksgiving",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Remembrance Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Boxing Day",
          fixed_date:[ 12,
            26 ] } ] },
    "British Columbia":{ PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Family Day",
          variable_date:"firstFebruaryMonday",
          offset:7 },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 },
        { name:"Victoria Day",
          variable_date:"victoriaDay" },
        { name:"Canada Day",
          variable_date:"canadaDay" },
        { name:"British Columbia Day",
          variable_date:"firstAugustMonday" },
        { name:"Labour Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Thanksgiving",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Remembrance Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] } ] },
    Manitoba:{ PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Louis Riel Day",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 },
        { name:"Victoria Day",
          variable_date:"victoriaDay" },
        { name:"Canada Day",
          variable_date:"canadaDay" },
        { name:"Civic Holiday",
          variable_date:"firstAugustMonday" },
        { name:"Labour Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Thanksgiving",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Remembrance Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] } ] },
    "New Brunswick":{ PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 },
        { name:"Victoria Day",
          variable_date:"victoriaDay" },
        { name:"Canada Day",
          variable_date:"canadaDay" },
        { name:"New Brunswick Day",
          variable_date:"firstAugustMonday" },
        { name:"Labour Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Thanksgiving",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Remembrance Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Boxing Day",
          fixed_date:[ 12,
            26 ] } ] },
    "Newfoundland and Labrador":{ PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Saint Patrick's Day",
          fixed_date:[ 3,
            17 ] },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 },
        { name:"Saint George's Day",
          fixed_date:[ 4,
            23 ] },
        { name:"Discovery Day",
          fixed_date:[ 6,
            24 ] },
        { name:"Memorial Day",
          fixed_date:[ 7,
            1 ] },
        { name:"Orangemen's Day",
          fixed_date:[ 7,
            12 ] },
        { name:"Labour Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Armistice Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] } ] },
    "Northwest Territories":{ PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 },
        { name:"Victoria Day",
          variable_date:"victoriaDay" },
        { name:"National Aboriginal Day",
          fixed_date:[ 6,
            21 ] },
        { name:"Canada Day",
          variable_date:"canadaDay" },
        { name:"Civic Holiday",
          variable_date:"firstAugustMonday" },
        { name:"Labour Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Thanksgiving",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Remembrance Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] } ] },
    "Nova Scotia":{ PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 },
        { name:"Victoria Day",
          variable_date:"victoriaDay" },
        { name:"Canada Day",
          variable_date:"canadaDay" },
        { name:"Natal Day",
          variable_date:"firstAugustMonday" },
        { name:"Labour Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Thanksgiving",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Remembrance Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Boxing Day",
          fixed_date:[ 12,
            26 ] } ] },
    Nunavut:{ PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 },
        { name:"Victoria Day",
          variable_date:"victoriaDay" },
        { name:"Canada Day",
          variable_date:"canadaDay" },
        { name:"Nunavut Day",
          fixed_date:[ 7,
            9 ] },
        { name:"Civic Holiday",
          variable_date:"firstAugustMonday" },
        { name:"Labour Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Thanksgiving",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Remembrance Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] } ] },
    Ontario:{ PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Family Day",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 },
        { name:"Victoria Day",
          variable_date:"victoriaDay" },
        { name:"Canada Day",
          variable_date:"canadaDay" },
        { name:"August Civic Public Holiday",
          variable_date:"firstAugustMonday" },
        { name:"Labour Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Thanksgiving",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Remembrance Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Boxing Day",
          fixed_date:[ 12,
            26 ] } ] },
    "Prince Edward Island":{ PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Islander Day",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 },
        { name:"Easter Monday",
          variable_date:"easter",
          offset:1 },
        { name:"Victoria Day",
          variable_date:"victoriaDay" },
        { name:"Canada Day",
          variable_date:"canadaDay" },
        { name:"Civic Holiday",
          variable_date:"firstAugustMonday" },
        { name:"Gold Cup Parade Day",
          variable_date:"firstAugustMonday",
          offset:18 },
        { name:"Labour Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Thanksgiving",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Remembrance Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Boxing Day",
          fixed_date:[ 12,
            26 ] } ] },
    Quebec:{ PH:[ { name:"Jour de l'an",
          fixed_date:[ 1,
            1 ] },
        { name:"Vendredi saint",
          variable_date:"easter",
          offset:-2 },
        { name:"Lundi de Pâques",
          variable_date:"easter",
          offset:1 },
        { name:"Journée nationale des patriotes",
          variable_date:"victoriaDay" },
        { name:"Fête nationale du Québec",
          fixed_date:[ 6,
            24 ] },
        { name:"Fête du Canada",
          variable_date:"canadaDay" },
        { name:"Fête du Travail",
          variable_date:"firstSeptemberMonday" },
        { name:"Jour de l'Action de grâce",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Noël",
          fixed_date:[ 12,
            25 ] } ] },
    Saskatchewan:{ PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Family Day",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 },
        { name:"Victoria Day",
          variable_date:"victoriaDay" },
        { name:"Canada Day",
          variable_date:"canadaDay" },
        { name:"Saskatchewan Day",
          variable_date:"firstAugustMonday" },
        { name:"Labour Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Thanksgiving",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Remembrance Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] } ] },
    Yukon:{ PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Heritage Day",
          variable_date:"lastFebruarySunday",
          offset:-2 },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 },
        { name:"Easter Monday",
          variable_date:"easter",
          offset:1 },
        { name:"Victoria Day",
          variable_date:"victoriaDay" },
        { name:"Canada Day",
          variable_date:"canadaDay" },
        { name:"Discovery Day",
          variable_date:"firstAugustMonday",
          offset:14 },
        { name:"Labour Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Thanksgiving",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Remembrance Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Boxing Day",
          fixed_date:[ 12,
            26 ] } ] } };
  data$v.PH;
  data$v.Alberta;
  data$v.Manitoba;
  data$v.Nunavut;
  data$v.Ontario;
  data$v.Quebec;
  data$v.Saskatchewan;
  data$v.Yukon;

  var data$u = { PH:[ { name:"Neujahrstag/Nouvel an/Capo d'anno",
        fixed_date:[ 1,
          1 ] },
      { name:"Berchtoldstag/2 janvier",
        fixed_date:[ 1,
          2 ],
        only_states:[ "Zürich",
          "Bern",
          "Luzern",
          "Obwalden",
          "Nidwalden",
          "Glarus",
          "Zug",
          "Freiburg",
          "Solothurn",
          "Schaffhausen",
          "Graubünden",
          "Aargau",
          "Thurgau",
          "Waadt",
          "Neuenburg",
          "Genf",
          "Jura",
          "Sankt Gallen",
          "Wallis" ] },
      { name:"Heilige Drei Könige/Epifania",
        fixed_date:[ 1,
          6 ],
        only_states:[ "Uri",
          "Schwyz",
          "Graubünden",
          "Tessin" ] },
      { name:"Instauration de la République",
        fixed_date:[ 3,
          1 ],
        only_states:[ "Neuenburg" ] },
      { name:"Josefstag/Saint-Joseph/San Giuseppe",
        fixed_date:[ 3,
          19 ],
        only_states:[ "Luzern",
          "Uri",
          "Schwyz",
          "Nidwalden",
          "Zug",
          "Graubünden",
          "Tessin",
          "Wallis" ] },
      { name:"Karfreitag/Vendredi saint",
        variable_date:"easter",
        offset:-2,
        only_states:[ "Zürich",
          "Bern",
          "Luzern",
          "Uri",
          "Schwyz",
          "Obwalden",
          "Nidwalden",
          "Glarus",
          "Zug",
          "Freiburg",
          "Solothurn",
          "Basel-Stadt",
          "Basel-Landschaft",
          "Schaffhausen",
          "Appenzell Ausserrhoden",
          "Appenzell Innerrhoden",
          "Sankt Gallen",
          "Graubünden",
          "Aargau",
          "Thurgau",
          "Waadt",
          "Neuenburg",
          "Genf",
          "Jura" ] },
      { name:"Ostermontag/Lundi de Pâques/Lunedi di Pasqua",
        variable_date:"easter",
        offset:1,
        only_states:[ "Zürich",
          "Bern",
          "Luzern",
          "Uri",
          "Schwyz",
          "Obwalden",
          "Nidwalden",
          "Glarus",
          "Zug",
          "Freiburg",
          "Solothurn",
          "Basel-Stadt",
          "Basel-Landschaft",
          "Schaffhausen",
          "Appenzell Ausserrhoden",
          "Appenzell Innerrhoden",
          "Sankt Gallen",
          "Graubünden",
          "Aargau",
          "Thurgau",
          "Tessin",
          "Waadt",
          "Neuenburg",
          "Genf",
          "Jura",
          "Wallis" ] },
      { name:"Tag der Arbeit/Festa dei lavoratori",
        fixed_date:[ 5,
          1 ],
        only_states:[ "Zürich",
          "Freiburg",
          "Solothurn",
          "Basel-Stadt",
          "Basel-Landschaft",
          "Schaffhausen",
          "Aargau",
          "Thurgau",
          "Tessin",
          "Neuenburg",
          "Jura" ] },
      { name:"Auffahrt/Ascension/Ascensione",
        variable_date:"easter",
        offset:39 },
      { name:"Pfingstmontag/Lundi de Pentecôte/Lunedi di Pentecoste",
        variable_date:"easter",
        offset:50,
        only_states:[ "Zürich",
          "Bern",
          "Luzern",
          "Uri",
          "Schwyz",
          "Obwalden",
          "Nidwalden",
          "Glarus",
          "Zug",
          "Freiburg",
          "Solothurn",
          "Basel-Stadt",
          "Basel-Landschaft",
          "Schaffhausen",
          "Appenzell Ausserrhoden",
          "Appenzell Innerrhoden",
          "Sankt Gallen",
          "Graubünden",
          "Aargau",
          "Thurgau",
          "Tessin",
          "Waadt",
          "Neuenburg",
          "Genf",
          "Jura",
          "Wallis" ] },
      { name:"Fronleichnam/Fête-Dieu/Corpus domini",
        variable_date:"easter",
        offset:60,
        only_states:[ "Luzern",
          "Uri",
          "Schwyz",
          "Obwalden",
          "Nidwalden",
          "Zug",
          "Freiburg",
          "Solothurn",
          "Basel-Landschaft",
          "Appenzell Innerrhoden",
          "Graubünden",
          "Aargau",
          "Tessin",
          "Wallis",
          "Neuenburg",
          "Jura" ] },
      { name:"Commémoration du plébiscite jurassien",
        fixed_date:[ 6,
          23 ],
        only_states:[ "Jura" ] },
      { name:"San Pietro e Paolo",
        fixed_date:[ 6,
          29 ],
        only_states:[ "Tessin" ] },
      { name:"Bundesfeiertag/Jour de la fête nationale/Giorno festivo federale",
        fixed_date:[ 8,
          1 ] },
      { name:"Mariä Himmelfahrt/Assomption/Assunzione",
        fixed_date:[ 8,
          15 ],
        only_states:[ "Luzern",
          "Uri",
          "Schwyz",
          "Obwalden",
          "Nidwalden",
          "Zug",
          "Freiburg",
          "Solothurn",
          "Basel-Landschaft",
          "Appenzell Innerrhoden",
          "Graubünden",
          "Aargau",
          "Tessin",
          "Wallis",
          "Jura" ] },
      { name:"Mauritiustag",
        fixed_date:[ 9,
          22 ],
        only_states:[ "Appenzell Innerrhoden" ] },
      { name:"Bruderklausenfest",
        fixed_date:[ 9,
          25 ],
        only_states:[ "Obwalden" ] },
      { name:"Allerheiligen/Toussaint/Ognissanti",
        fixed_date:[ 11,
          1 ],
        only_states:[ "Luzern",
          "Uri",
          "Schwyz",
          "Obwalden",
          "Nidwalden",
          "Glarus",
          "Zug",
          "Freiburg",
          "Solothurn",
          "Appenzell Innerrhoden",
          "Sankt Gallen",
          "Graubünden",
          "Aargau",
          "Tessin",
          "Wallis",
          "Jura" ] },
      { name:"Mariä Empfängnis/Immaculée Conception/Ognissanti",
        fixed_date:[ 12,
          8 ],
        only_states:[ "Luzern",
          "Uri",
          "Schwyz",
          "Obwalden",
          "Nidwalden",
          "Zug",
          "Freiburg",
          "Solothurn",
          "Appenzell Innerrhoden",
          "Graubünden",
          "Aargau",
          "Tessin",
          "Wallis" ] },
      { name:"Weihnachtstag/Noël/Natale",
        fixed_date:[ 12,
          25 ] },
      { name:"Stephanstag/Saint-Etienne/Santo Stefano",
        fixed_date:[ 12,
          26 ],
        only_states:[ "Zürich",
          "Bern",
          "Luzern",
          "Uri",
          "Schwyz",
          "Obwalden",
          "Nidwalden",
          "Glarus",
          "Zug",
          "Freiburg",
          "Solothurn",
          "Basel-Stadt",
          "Basel-Landschaft",
          "Schaffhausen",
          "Appenzell Ausserrhoden",
          "Appenzell Innerrhoden",
          "Sankt Gallen",
          "Graubünden",
          "Aargau",
          "Thurgau",
          "Tessin",
          "Wallis" ] },
      { name:"Restauration de la République",
        fixed_date:[ 12,
          31 ],
        only_states:[ "Genf" ] } ],
    Aargau:{ _state_code:"ag" },
    "Appenzell Ausserrhoden":{ _state_code:"ar" },
    "Appenzell Innerrhoden":{ _state_code:"ai" },
    "Basel-Landschaft":{ _state_code:"bl" },
    "Basel-Stadt":{ _state_code:"bs" },
    Bern:{ _state_code:"be" },
    Freiburg:{ _state_code:"fr" },
    Genf:{ _state_code:"ge" },
    Glarus:{ _state_code:"gl" },
    "Graubünden":{ _state_code:"gr" },
    Jura:{ _state_code:"ju" },
    Luzern:{ _state_code:"lu" },
    Neuenburg:{ _state_code:"ne" },
    Nidwalden:{ _state_code:"nw" },
    Obwalden:{ _state_code:"ow" },
    Schaffhausen:{ _state_code:"sh" },
    Schwyz:{ _state_code:"sz" },
    Solothurn:{ _state_code:"so" },
    "Sankt Gallen":{ _state_code:"sg" },
    Tessin:{ _state_code:"ti" },
    Thurgau:{ _state_code:"tg" },
    Uri:{ _state_code:"ur" },
    Waadt:{ _state_code:"vd" },
    Wallis:{ _state_code:"vs" },
    Zug:{ _state_code:"zg" },
    "Zürich":{ _state_code:"zh" } };
  data$u.PH;
  data$u.Aargau;
  data$u.Bern;
  data$u.Freiburg;
  data$u.Genf;
  data$u.Glarus;
  data$u.Jura;
  data$u.Luzern;
  data$u.Neuenburg;
  data$u.Nidwalden;
  data$u.Obwalden;
  data$u.Schaffhausen;
  data$u.Schwyz;
  data$u.Solothurn;
  data$u.Tessin;
  data$u.Thurgau;
  data$u.Uri;
  data$u.Waadt;
  data$u.Wallis;
  data$u.Zug;

  var data$t = { PH:[ { name:"Fête du 1ᵉʳ janvier",
        fixed_date:[ 1,
          1 ] },
      { name:"Lundi de Pâques",
        variable_date:"easter",
        offset:1 },
      { name:"Fête du travail",
        fixed_date:[ 5,
          1 ] },
      { name:"Lendemain de la Fête du travail",
        variable_date:"nextMo-Sa01May" },
      { name:"Jour de l’Ascension",
        variable_date:"easter",
        offset:39 },
      { name:"Lundi de la Pentecôte",
        variable_date:"easter",
        offset:50 },
      { name:"Fête nationale",
        fixed_date:[ 8,
          7 ] },
      { name:"Lendemain de la Fête nationale",
        variable_date:"nextMo-Sa07August" },
      { name:"Fête de l’Assomption",
        fixed_date:[ 8,
          15 ] },
      { name:"Fête de la Toussaint",
        fixed_date:[ 11,
          1 ] },
      { name:"Journée Nationale de la Paix",
        fixed_date:[ 11,
          15 ] },
      { name:"Fête de Noël",
        fixed_date:[ 12,
          25 ] },
      { name:"Lendemain de la Fête de Noël",
        variable_date:"nextMo-Sa25December" } ] };
  data$t.PH;

  var data$s = { PH:[ { name:"Den obnovy samostatného českého státu",
        fixed_date:[ 1,
          1 ] },
      { name:"Velký pátek",
        variable_date:"easter",
        offset:-2 },
      { name:"Velikonoční pondělí",
        variable_date:"easter",
        offset:1 },
      { name:"Svátek práce",
        fixed_date:[ 5,
          1 ] },
      { name:"Den vítězství",
        fixed_date:[ 5,
          8 ] },
      { name:"Den slovanských věrozvěstů Cyrila a Metoděje",
        fixed_date:[ 7,
          5 ] },
      { name:"Den upálení mistra Jana Husa",
        fixed_date:[ 7,
          6 ] },
      { name:"Den české státnosti",
        fixed_date:[ 9,
          28 ] },
      { name:"Den vzniku samostatného československého státu",
        fixed_date:[ 10,
          28 ] },
      { name:"Den boje za svobodu a demokracii",
        fixed_date:[ 11,
          17 ] },
      { name:"Štědrý den",
        fixed_date:[ 12,
          24 ] },
      { name:"1. svátek vánoční",
        fixed_date:[ 12,
          25 ] },
      { name:"2. svátek vánoční",
        fixed_date:[ 12,
          26 ] } ] };
  data$s.PH;

  var data$r = { PH:[ { name:"Neujahrstag",
        fixed_date:[ 1,
          1 ] },
      { name:"Heilige Drei Könige",
        fixed_date:[ 1,
          6 ],
        only_states:[ "Baden-Württemberg",
          "Bayern",
          "Sachsen-Anhalt" ] },
      { name:"Frauentag",
        fixed_date:[ 3,
          8 ],
        only_states:[ "Berlin" ] },
      { name:"Tag der Arbeit",
        fixed_date:[ 5,
          1 ] },
      { name:"Karfreitag",
        variable_date:"easter",
        offset:-2 },
      { name:"Ostersonntag",
        variable_date:"easter",
        only_states:[ "Brandenburg" ] },
      { name:"Ostermontag",
        variable_date:"easter",
        offset:1 },
      { name:"Christi Himmelfahrt",
        variable_date:"easter",
        offset:39 },
      { name:"Pfingstsonntag",
        variable_date:"easter",
        offset:49,
        only_states:[ "Brandenburg" ] },
      { name:"Pfingstmontag",
        variable_date:"easter",
        offset:50 },
      { name:"Fronleichnam",
        variable_date:"easter",
        offset:60,
        only_states:[ "Baden-Württemberg",
          "Bayern",
          "Hessen",
          "Nordrhein-Westfalen",
          "Rheinland-Pfalz",
          "Saarland" ] },
      { name:"Mariä Himmelfahrt",
        fixed_date:[ 8,
          15 ],
        only_states:[ "Saarland" ] },
      { name:"Weltkindertag",
        fixed_date:[ 9,
          20 ],
        only_states:[ "Thüringen" ] },
      { name:"Tag der Deutschen Einheit",
        fixed_date:[ 10,
          3 ] },
      { name:"Reformationstag",
        fixed_date:[ 10,
          31 ],
        only_states:[ "Brandenburg",
          "Bremen",
          "Hamburg",
          "Mecklenburg-Vorpommern",
          "Niedersachsen",
          "Sachsen",
          "Sachsen-Anhalt",
          "Schleswig-Holstein",
          "Thüringen" ] },
      { name:"Allerheiligen",
        fixed_date:[ 11,
          1 ],
        only_states:[ "Baden-Württemberg",
          "Bayern",
          "Nordrhein-Westfalen",
          "Rheinland-Pfalz",
          "Saarland" ] },
      { name:"Buß- und Bettag",
        variable_date:"nextWednesday16Nov",
        only_states:[ "Sachsen" ] },
      { name:"1. Weihnachtstag",
        fixed_date:[ 12,
          25 ] },
      { name:"2. Weihnachtstag",
        fixed_date:[ 12,
          26 ] } ],
    "Baden-Württemberg":{ _state_code:"bw",
      SH:[ { 2012:[ 4,
            2,
            4,
            13 ],
          2013:[ 3,
            25,
            4,
            5 ],
          2014:[ 4,
            14,
            4,
            25 ],
          2015:[ 3,
            30,
            4,
            10 ],
          2016:[ 3,
            24,
            3,
            24,
            3,
            29,
            4,
            2 ],
          2017:[ 4,
            10,
            4,
            21 ],
          2018:[ 3,
            26,
            4,
            6 ],
          2019:[ 4,
            15,
            4,
            27 ],
          2020:[ 4,
            6,
            4,
            18 ],
          2024:[ 3,
            23,
            4,
            5 ],
          2025:[ 4,
            14,
            4,
            26 ],
          name:"Osterferien" },
        { 2012:[ 5,
            29,
            6,
            9 ],
          2013:[ 5,
            21,
            6,
            1 ],
          2014:[ 6,
            10,
            6,
            21 ],
          2015:[ 5,
            26,
            6,
            6 ],
          2016:[ 5,
            17,
            5,
            28 ],
          2017:[ 6,
            6,
            6,
            16 ],
          2018:[ 5,
            22,
            6,
            2 ],
          2019:[ 6,
            11,
            6,
            21 ],
          2020:[ 6,
            2,
            6,
            13 ],
          2024:[ 5,
            21,
            5,
            31 ],
          2025:[ 6,
            10,
            6,
            20 ],
          name:"Pfingstferien" },
        { 2012:[ 7,
            26,
            9,
            8 ],
          2013:[ 7,
            25,
            9,
            7 ],
          2014:[ 7,
            31,
            9,
            13 ],
          2015:[ 7,
            30,
            9,
            12 ],
          2016:[ 7,
            28,
            9,
            10 ],
          2017:[ 7,
            27,
            9,
            9 ],
          2018:[ 7,
            26,
            9,
            8 ],
          2019:[ 7,
            29,
            9,
            10 ],
          2020:[ 7,
            30,
            9,
            12 ],
          2021:[ 7,
            29,
            9,
            11 ],
          2022:[ 7,
            28,
            9,
            10 ],
          2023:[ 7,
            27,
            9,
            9 ],
          2024:[ 7,
            25,
            9,
            7 ],
          2025:[ 7,
            31,
            9,
            13 ],
          name:"Sommerferien" },
        { 2012:[ 10,
            29,
            11,
            2 ],
          2013:[ 10,
            28,
            10,
            30 ],
          2014:[ 10,
            27,
            10,
            30 ],
          2015:[ 10,
            31,
            10,
            31,
            11,
            2,
            11,
            6 ],
          2016:[ 10,
            31,
            10,
            31,
            11,
            2,
            11,
            4 ],
          2017:[ 10,
            30,
            11,
            3 ],
          2018:[ 10,
            29,
            11,
            2 ],
          2019:[ 10,
            28,
            10,
            30 ],
          2024:[ 10,
            28,
            10,
            30,
            10,
            31,
            10,
            31 ],
          2025:[ 10,
            27,
            10,
            30,
            10,
            31,
            10,
            31 ],
          name:"Herbstferien" },
        { 2011:[ 12,
            23,
            1,
            5 ],
          2012:[ 12,
            24,
            1,
            5 ],
          2013:[ 12,
            23,
            1,
            4 ],
          2014:[ 12,
            22,
            1,
            5 ],
          2015:[ 12,
            23,
            1,
            9 ],
          2016:[ 12,
            23,
            1,
            7 ],
          2017:[ 12,
            22,
            1,
            5 ],
          2018:[ 12,
            24,
            1,
            5 ],
          2019:[ 12,
            23,
            1,
            4 ],
          2024:[ 12,
            23,
            1,
            4 ],
          2025:[ 12,
            22,
            1,
            5 ],
          name:"Weihnachtsferien" } ] },
    Bayern:{ _state_code:"by",
      SH:[ { 2012:[ 2,
            20,
            2,
            24 ],
          2013:[ 2,
            11,
            2,
            15 ],
          2014:[ 3,
            3,
            3,
            7 ],
          2015:[ 2,
            16,
            2,
            20 ],
          2016:[ 2,
            8,
            2,
            12 ],
          2017:[ 2,
            27,
            3,
            3 ],
          2018:[ 2,
            12,
            2,
            16 ],
          2019:[ 3,
            4,
            3,
            8 ],
          2020:[ 2,
            24,
            2,
            28 ],
          2021:[ 2,
            15,
            2,
            19 ],
          2022:[ 2,
            28,
            3,
            4 ],
          2023:[ 2,
            20,
            2,
            24 ],
          2024:[ 2,
            12,
            2,
            16 ],
          2025:[ 3,
            3,
            3,
            7 ],
          name:"Winterferien" },
        { 2012:[ 4,
            2,
            4,
            14 ],
          2013:[ 3,
            25,
            4,
            6 ],
          2014:[ 4,
            14,
            4,
            26 ],
          2015:[ 3,
            30,
            4,
            11 ],
          2016:[ 3,
            21,
            4,
            1 ],
          2017:[ 4,
            10,
            4,
            22 ],
          2018:[ 3,
            26,
            4,
            7 ],
          2019:[ 4,
            15,
            4,
            27 ],
          2020:[ 4,
            6,
            4,
            18 ],
          2021:[ 3,
            29,
            4,
            10 ],
          2022:[ 4,
            11,
            4,
            23 ],
          2023:[ 4,
            3,
            4,
            15 ],
          2024:[ 3,
            25,
            4,
            6 ],
          2025:[ 4,
            14,
            4,
            25 ],
          name:"Osterferien" },
        { 2012:[ 5,
            29,
            6,
            9 ],
          2013:[ 5,
            21,
            5,
            31 ],
          2014:[ 6,
            10,
            6,
            21 ],
          2015:[ 5,
            26,
            6,
            5 ],
          2016:[ 5,
            17,
            5,
            28 ],
          2017:[ 6,
            6,
            6,
            16 ],
          2018:[ 5,
            22,
            6,
            2 ],
          2019:[ 6,
            11,
            6,
            21 ],
          2020:[ 6,
            2,
            6,
            13 ],
          2021:[ 5,
            25,
            6,
            4 ],
          2022:[ 6,
            7,
            6,
            18 ],
          2023:[ 5,
            30,
            6,
            9 ],
          2024:[ 5,
            21,
            6,
            1 ],
          2025:[ 6,
            10,
            6,
            20 ],
          name:"Pfingstferien" },
        { 2012:[ 8,
            1,
            9,
            12 ],
          2013:[ 7,
            31,
            9,
            11 ],
          2014:[ 7,
            30,
            9,
            15 ],
          2015:[ 8,
            1,
            9,
            14 ],
          2016:[ 7,
            30,
            9,
            12 ],
          2017:[ 7,
            29,
            9,
            11 ],
          2018:[ 7,
            30,
            9,
            10 ],
          2019:[ 7,
            29,
            9,
            9 ],
          2020:[ 7,
            27,
            9,
            7 ],
          2021:[ 7,
            30,
            9,
            13 ],
          2022:[ 8,
            1,
            9,
            12 ],
          2023:[ 7,
            31,
            9,
            11 ],
          2024:[ 7,
            29,
            9,
            9 ],
          2025:[ 8,
            1,
            9,
            15 ],
          name:"Sommerferien" },
        { 2012:[ 10,
            29,
            11,
            3 ],
          2013:[ 10,
            28,
            10,
            31 ],
          2014:[ 10,
            27,
            10,
            31,
            11,
            19,
            11,
            19 ],
          2015:[ 11,
            2,
            11,
            7,
            11,
            18,
            11,
            18 ],
          2016:[ 10,
            31,
            11,
            4,
            11,
            16,
            11,
            16 ],
          2017:[ 10,
            30,
            11,
            3,
            11,
            22,
            11,
            22 ],
          2018:[ 10,
            29,
            11,
            2,
            11,
            21,
            11,
            21 ],
          2019:[ 10,
            28,
            10,
            31,
            11,
            20,
            11,
            20 ],
          2020:[ 10,
            31,
            11,
            6,
            11,
            18,
            11,
            18 ],
          2021:[ 11,
            2,
            11,
            5,
            11,
            17,
            11,
            17 ],
          2022:[ 10,
            31,
            11,
            4,
            11,
            16,
            11,
            16 ],
          2023:[ 10,
            30,
            11,
            3,
            11,
            22,
            11,
            22 ],
          2024:[ 10,
            28,
            10,
            31,
            11,
            20,
            11,
            20 ],
          2025:[ 11,
            3,
            11,
            7,
            11,
            19,
            11,
            19 ],
          name:"Herbstferien" },
        { 2011:[ 12,
            27,
            1,
            5 ],
          2012:[ 12,
            24,
            1,
            5 ],
          2013:[ 12,
            23,
            1,
            4 ],
          2014:[ 12,
            24,
            1,
            5 ],
          2015:[ 12,
            24,
            1,
            5 ],
          2016:[ 12,
            24,
            1,
            5 ],
          2017:[ 12,
            23,
            1,
            5 ],
          2018:[ 12,
            22,
            1,
            5 ],
          2019:[ 12,
            23,
            1,
            4 ],
          2020:[ 12,
            23,
            1,
            9 ],
          2021:[ 12,
            24,
            1,
            8 ],
          2022:[ 12,
            24,
            1,
            7 ],
          2023:[ 12,
            23,
            1,
            5 ],
          2024:[ 12,
            23,
            1,
            3 ],
          2025:[ 12,
            22,
            1,
            5 ],
          name:"Weihnachtsferien" } ] },
    Berlin:{ _state_code:"be",
      SH:[ { 2012:[ 1,
            30,
            2,
            4 ],
          2013:[ 2,
            4,
            2,
            9 ],
          2014:[ 2,
            3,
            2,
            8 ],
          2015:[ 2,
            2,
            2,
            7 ],
          2016:[ 2,
            1,
            2,
            6 ],
          2017:[ 1,
            30,
            2,
            3 ],
          2018:[ 2,
            5,
            2,
            10 ],
          2019:[ 2,
            4,
            2,
            9 ],
          2020:[ 2,
            3,
            2,
            8 ],
          2021:[ 2,
            1,
            2,
            6 ],
          2022:[ 1,
            29,
            2,
            5 ],
          2023:[ 1,
            30,
            2,
            4 ],
          2024:[ 2,
            5,
            2,
            10 ],
          2025:[ 2,
            3,
            2,
            8 ],
          name:"Winterferien" },
        { 2012:[ 4,
            2,
            4,
            14,
            4,
            30,
            4,
            30 ],
          2013:[ 3,
            25,
            4,
            6 ],
          2014:[ 4,
            14,
            4,
            26,
            5,
            2,
            5,
            2 ],
          2015:[ 3,
            30,
            4,
            11 ],
          2016:[ 3,
            21,
            4,
            2 ],
          2017:[ 4,
            10,
            4,
            18 ],
          2018:[ 3,
            26,
            4,
            6 ],
          2019:[ 4,
            15,
            4,
            26 ],
          2020:[ 4,
            6,
            4,
            17 ],
          2021:[ 3,
            29,
            4,
            10 ],
          2022:[ 4,
            11,
            4,
            23 ],
          2023:[ 4,
            3,
            4,
            14 ],
          2024:[ 3,
            25,
            4,
            5 ],
          2025:[ 4,
            14,
            4,
            25,
            5,
            2,
            5,
            2,
            5,
            30,
            5,
            30 ],
          name:"Osterferien" },
        { 2012:[ 5,
            18,
            5,
            18 ],
          2013:[ 5,
            10,
            5,
            10,
            5,
            21,
            5,
            21 ],
          2014:[ 5,
            30,
            5,
            30 ],
          2015:[ 5,
            15,
            5,
            15,
            5,
            26,
            5,
            26 ],
          2016:[ 5,
            6,
            5,
            6,
            5,
            17,
            5,
            18 ],
          2017:[ 5,
            24,
            5,
            24,
            5,
            26,
            5,
            26,
            6,
            6,
            6,
            9 ],
          2018:[ 4,
            30,
            4,
            30,
            5,
            11,
            5,
            11,
            5,
            22,
            5,
            22 ],
          2019:[ 5,
            31,
            5,
            31,
            6,
            11,
            6,
            11 ],
          2020:[ 5,
            22,
            5,
            22 ],
          2021:[ 5,
            14,
            5,
            14 ],
          2022:[ 5,
            27,
            5,
            27,
            6,
            7,
            6,
            7 ],
          2023:[ 5,
            19,
            5,
            19,
            5,
            30,
            5,
            30 ],
          2024:[ 5,
            10,
            5,
            10 ],
          2025:[ 6,
            10,
            6,
            10 ],
          name:"Pfingstferien" },
        { 2012:[ 6,
            20,
            8,
            3 ],
          2013:[ 6,
            19,
            8,
            2 ],
          2014:[ 7,
            9,
            8,
            22 ],
          2015:[ 7,
            16,
            8,
            28 ],
          2016:[ 7,
            21,
            9,
            2 ],
          2017:[ 7,
            20,
            9,
            1 ],
          2018:[ 7,
            5,
            8,
            17 ],
          2019:[ 6,
            20,
            8,
            2 ],
          2020:[ 6,
            25,
            8,
            7 ],
          2021:[ 6,
            24,
            8,
            6 ],
          2022:[ 7,
            7,
            8,
            19 ],
          2023:[ 7,
            13,
            8,
            25 ],
          2024:[ 7,
            18,
            8,
            30 ],
          2025:[ 7,
            24,
            9,
            6 ],
          name:"Sommerferien" },
        { 2012:[ 10,
            1,
            10,
            13 ],
          2013:[ 9,
            30,
            10,
            12 ],
          2014:[ 10,
            20,
            11,
            1 ],
          2015:[ 10,
            19,
            10,
            31 ],
          2016:[ 10,
            17,
            10,
            28 ],
          2017:[ 10,
            2,
            10,
            2,
            10,
            23,
            11,
            4 ],
          2018:[ 10,
            22,
            11,
            2 ],
          2019:[ 10,
            4,
            10,
            4,
            10,
            7,
            10,
            19 ],
          2020:[ 10,
            12,
            10,
            24 ],
          2021:[ 10,
            11,
            10,
            23 ],
          2022:[ 10,
            24,
            11,
            5 ],
          2023:[ 10,
            2,
            10,
            2,
            10,
            23,
            11,
            4 ],
          2024:[ 10,
            4,
            10,
            4,
            10,
            21,
            11,
            2 ],
          2025:[ 10,
            20,
            11,
            1 ],
          name:"Herbstferien" },
        { 2011:[ 12,
            23,
            1,
            3 ],
          2012:[ 12,
            24,
            1,
            4 ],
          2013:[ 12,
            23,
            1,
            3 ],
          2014:[ 12,
            22,
            1,
            2 ],
          2015:[ 12,
            23,
            1,
            2 ],
          2016:[ 12,
            23,
            1,
            3 ],
          2017:[ 12,
            21,
            1,
            2 ],
          2018:[ 12,
            22,
            1,
            5 ],
          2019:[ 12,
            23,
            1,
            4 ],
          2020:[ 12,
            21,
            1,
            2 ],
          2021:[ 12,
            23,
            12,
            31 ],
          2022:[ 12,
            22,
            1,
            2 ],
          2023:[ 12,
            23,
            1,
            5 ],
          2024:[ 12,
            23,
            12,
            31 ],
          2025:[ 12,
            22,
            1,
            2 ],
          name:"Weihnachtsferien" } ] },
    Brandenburg:{ _state_code:"bb",
      SH:[ { 2012:[ 1,
            30,
            2,
            4 ],
          2013:[ 2,
            4,
            2,
            9 ],
          2014:[ 2,
            3,
            2,
            8 ],
          2015:[ 2,
            2,
            2,
            7 ],
          2016:[ 2,
            1,
            2,
            6 ],
          2017:[ 1,
            30,
            2,
            4 ],
          2018:[ 2,
            5,
            2,
            10 ],
          2019:[ 2,
            4,
            2,
            9 ],
          2020:[ 2,
            3,
            2,
            8 ],
          2021:[ 2,
            1,
            2,
            6 ],
          2022:[ 1,
            31,
            2,
            5 ],
          2023:[ 1,
            30,
            2,
            3 ],
          2024:[ 2,
            5,
            2,
            9 ],
          2025:[ 2,
            3,
            2,
            8 ],
          name:"Winterferien" },
        { 2012:[ 4,
            4,
            4,
            14,
            4,
            30,
            4,
            30 ],
          2013:[ 3,
            27,
            4,
            6 ],
          2014:[ 4,
            16,
            4,
            26,
            5,
            2,
            5,
            2 ],
          2015:[ 4,
            1,
            4,
            11 ],
          2016:[ 3,
            23,
            4,
            2 ],
          2017:[ 4,
            10,
            4,
            22 ],
          2018:[ 3,
            26,
            4,
            6 ],
          2019:[ 4,
            15,
            4,
            26 ],
          2020:[ 4,
            6,
            4,
            17 ],
          2021:[ 3,
            29,
            4,
            9 ],
          2022:[ 4,
            11,
            4,
            23 ],
          2023:[ 4,
            3,
            4,
            14 ],
          2024:[ 3,
            25,
            4,
            5 ],
          2025:[ 4,
            14,
            4,
            25,
            5,
            2,
            5,
            2,
            5,
            30,
            5,
            30 ],
          name:"Osterferien" },
        { 2012:[ 5,
            18,
            5,
            18 ],
          2013:[ 5,
            10,
            5,
            10 ],
          2014:[ 5,
            30,
            5,
            30 ],
          2015:[ 5,
            15,
            5,
            15 ],
          2016:[ 5,
            6,
            5,
            6,
            5,
            17,
            5,
            17 ],
          2017:[ 5,
            26,
            5,
            26 ],
          2018:[ 4,
            30,
            4,
            30,
            5,
            11,
            5,
            11 ],
          2019:[ 5,
            31,
            5,
            31 ],
          2020:[ 5,
            22,
            5,
            22 ],
          2021:[ 5,
            14,
            5,
            14 ],
          2022:[ 5,
            27,
            5,
            27 ],
          2023:[ 5,
            19,
            5,
            19 ],
          2024:[ 5,
            10,
            5,
            10 ],
          2025:[ 6,
            10,
            6,
            10 ],
          name:"Pfingstferien" },
        { 2012:[ 6,
            21,
            8,
            3 ],
          2013:[ 6,
            20,
            8,
            2 ],
          2014:[ 7,
            10,
            8,
            22 ],
          2015:[ 7,
            16,
            8,
            28 ],
          2016:[ 7,
            21,
            9,
            3 ],
          2017:[ 7,
            20,
            9,
            1 ],
          2018:[ 7,
            5,
            8,
            18 ],
          2019:[ 6,
            20,
            8,
            3 ],
          2020:[ 6,
            25,
            8,
            8 ],
          2021:[ 6,
            24,
            8,
            7 ],
          2022:[ 7,
            7,
            8,
            20 ],
          2023:[ 7,
            13,
            8,
            26 ],
          2024:[ 7,
            18,
            8,
            31 ],
          2025:[ 7,
            24,
            9,
            6 ],
          name:"Sommerferien" },
        { 2012:[ 10,
            1,
            10,
            13 ],
          2013:[ 9,
            30,
            10,
            12,
            11,
            1,
            11,
            1 ],
          2014:[ 10,
            20,
            11,
            1 ],
          2015:[ 10,
            19,
            10,
            30 ],
          2016:[ 10,
            17,
            10,
            28 ],
          2017:[ 10,
            2,
            10,
            2,
            10,
            23,
            11,
            4 ],
          2018:[ 10,
            22,
            11,
            2 ],
          2019:[ 10,
            4,
            10,
            18,
            11,
            1,
            11,
            1 ],
          2020:[ 10,
            12,
            10,
            24 ],
          2021:[ 10,
            11,
            10,
            23 ],
          2022:[ 10,
            24,
            11,
            5 ],
          2023:[ 10,
            2,
            10,
            2,
            10,
            23,
            11,
            4 ],
          2024:[ 10,
            4,
            10,
            4,
            10,
            21,
            11,
            2 ],
          2025:[ 10,
            20,
            11,
            1 ],
          name:"Herbstferien" },
        { 2011:[ 12,
            23,
            1,
            3 ],
          2012:[ 12,
            24,
            1,
            4 ],
          2013:[ 12,
            23,
            1,
            3 ],
          2014:[ 12,
            22,
            1,
            2 ],
          2015:[ 12,
            23,
            1,
            2 ],
          2016:[ 12,
            23,
            1,
            3 ],
          2017:[ 12,
            21,
            1,
            2 ],
          2018:[ 12,
            21,
            1,
            5 ],
          2019:[ 12,
            23,
            1,
            3 ],
          2020:[ 12,
            21,
            1,
            2 ],
          2021:[ 12,
            23,
            12,
            31 ],
          2022:[ 12,
            22,
            1,
            3 ],
          2023:[ 12,
            23,
            1,
            5 ],
          2024:[ 12,
            23,
            12,
            31 ],
          2025:[ 12,
            22,
            1,
            2 ],
          name:"Weihnachtsferien" } ] },
    Bremen:{ _state_code:"hb",
      SH:[ { 2012:[ 1,
            30,
            1,
            31 ],
          2013:[ 1,
            31,
            2,
            1 ],
          2014:[ 1,
            30,
            1,
            31 ],
          2015:[ 2,
            2,
            2,
            3 ],
          2016:[ 1,
            28,
            1,
            29 ],
          2017:[ 1,
            30,
            1,
            31 ],
          2018:[ 2,
            1,
            2,
            2 ],
          2019:[ 1,
            31,
            2,
            1 ],
          2020:[ 2,
            3,
            2,
            4 ],
          2021:[ 2,
            1,
            2,
            2 ],
          2022:[ 1,
            31,
            2,
            1 ],
          2023:[ 1,
            30,
            1,
            31 ],
          2024:[ 2,
            1,
            2,
            2 ],
          2025:[ 2,
            3,
            2,
            4 ],
          name:"Winterferien" },
        { 2012:[ 3,
            26,
            4,
            11,
            4,
            30,
            4,
            30 ],
          2013:[ 3,
            16,
            4,
            2 ],
          2014:[ 4,
            3,
            4,
            22,
            5,
            2,
            5,
            2 ],
          2015:[ 3,
            25,
            4,
            10 ],
          2016:[ 3,
            18,
            4,
            2 ],
          2017:[ 4,
            10,
            4,
            22 ],
          2018:[ 3,
            19,
            4,
            3 ],
          2019:[ 4,
            6,
            4,
            23 ],
          2020:[ 3,
            28,
            4,
            14 ],
          2021:[ 3,
            27,
            4,
            10 ],
          2022:[ 4,
            4,
            4,
            19 ],
          2023:[ 3,
            27,
            4,
            11 ],
          2024:[ 3,
            18,
            4,
            2 ],
          2025:[ 4,
            7,
            4,
            19 ],
          name:"Osterferien" },
        { 2012:[ 5,
            18,
            5,
            18,
            5,
            29,
            5,
            29 ],
          2013:[ 5,
            10,
            5,
            10,
            5,
            21,
            5,
            21 ],
          2014:[ 5,
            30,
            5,
            30,
            6,
            10,
            6,
            10 ],
          2015:[ 5,
            15,
            5,
            15,
            5,
            26,
            5,
            26 ],
          2016:[ 5,
            6,
            5,
            6,
            5,
            17,
            5,
            17 ],
          2017:[ 5,
            26,
            5,
            26,
            6,
            6,
            6,
            6 ],
          2018:[ 4,
            30,
            4,
            30,
            5,
            11,
            5,
            11,
            5,
            22,
            5,
            22 ],
          2019:[ 5,
            31,
            5,
            31,
            6,
            11,
            6,
            11 ],
          2020:[ 5,
            22,
            5,
            22,
            6,
            2,
            6,
            2 ],
          2021:[ 5,
            14,
            5,
            14,
            5,
            25,
            5,
            25 ],
          2022:[ 5,
            27,
            5,
            27,
            6,
            7,
            6,
            7 ],
          2023:[ 5,
            19,
            5,
            19,
            5,
            30,
            5,
            30 ],
          2024:[ 5,
            10,
            5,
            10,
            5,
            21,
            5,
            21 ],
          2025:[ 4,
            30,
            4,
            30,
            5,
            2,
            5,
            2,
            5,
            30,
            5,
            30,
            6,
            10,
            6,
            10 ],
          name:"Pfingstferien" },
        { 2012:[ 7,
            23,
            8,
            31 ],
          2013:[ 6,
            27,
            8,
            7 ],
          2014:[ 7,
            31,
            9,
            10 ],
          2015:[ 7,
            23,
            9,
            2 ],
          2016:[ 6,
            23,
            8,
            3 ],
          2017:[ 6,
            22,
            8,
            2 ],
          2018:[ 6,
            28,
            8,
            8 ],
          2019:[ 7,
            4,
            8,
            14 ],
          2020:[ 7,
            16,
            8,
            26 ],
          2021:[ 7,
            22,
            9,
            1 ],
          2022:[ 7,
            14,
            8,
            24 ],
          2023:[ 7,
            6,
            8,
            16 ],
          2024:[ 6,
            24,
            8,
            2 ],
          2025:[ 7,
            3,
            8,
            13 ],
          name:"Sommerferien" },
        { 2012:[ 10,
            22,
            11,
            3 ],
          2013:[ 10,
            4,
            10,
            18 ],
          2014:[ 10,
            27,
            11,
            8 ],
          2015:[ 10,
            19,
            10,
            31 ],
          2016:[ 10,
            4,
            10,
            15 ],
          2017:[ 10,
            2,
            10,
            14,
            10,
            30,
            10,
            30 ],
          2018:[ 10,
            1,
            10,
            13 ],
          2019:[ 10,
            4,
            10,
            18 ],
          2020:[ 10,
            12,
            10,
            24 ],
          2021:[ 10,
            18,
            10,
            30 ],
          2022:[ 10,
            17,
            10,
            29 ],
          2023:[ 10,
            2,
            10,
            2,
            10,
            16,
            10,
            28 ],
          2024:[ 10,
            4,
            10,
            19,
            11,
            1,
            11,
            1 ],
          2025:[ 10,
            13,
            10,
            25 ],
          name:"Herbstferien" },
        { 2011:[ 12,
            23,
            1,
            4 ],
          2012:[ 12,
            24,
            1,
            5 ],
          2013:[ 12,
            23,
            1,
            3 ],
          2014:[ 12,
            22,
            1,
            5 ],
          2015:[ 12,
            23,
            1,
            6 ],
          2016:[ 12,
            21,
            1,
            6 ],
          2017:[ 12,
            22,
            1,
            6 ],
          2018:[ 12,
            24,
            1,
            4 ],
          2019:[ 12,
            21,
            1,
            6 ],
          2020:[ 12,
            23,
            1,
            8 ],
          2021:[ 12,
            23,
            1,
            8 ],
          2022:[ 12,
            23,
            1,
            6 ],
          2023:[ 12,
            23,
            1,
            5 ],
          2024:[ 12,
            23,
            1,
            4 ],
          2025:[ 12,
            22,
            1,
            5 ],
          name:"Weihnachtsferien" } ] },
    Hamburg:{ _state_code:"hh",
      SH:[ { 2012:[ 1,
            30,
            1,
            30 ],
          2013:[ 2,
            1,
            2,
            1 ],
          2014:[ 1,
            31,
            1,
            31 ],
          2015:[ 1,
            30,
            1,
            30 ],
          2016:[ 1,
            29,
            1,
            29 ],
          2017:[ 1,
            30,
            1,
            30 ],
          2018:[ 2,
            2,
            2,
            2 ],
          2019:[ 2,
            1,
            2,
            1 ],
          2020:[ 1,
            31,
            1,
            31 ],
          2021:[ 1,
            29,
            1,
            29 ],
          2022:[ 1,
            28,
            1,
            28 ],
          2023:[ 1,
            27,
            1,
            27 ],
          2024:[ 2,
            2,
            2,
            2 ],
          2025:[ 1,
            31,
            1,
            31 ],
          name:"Winterferien" },
        { 2012:[ 3,
            5,
            3,
            16 ],
          2013:[ 3,
            4,
            3,
            15 ],
          2014:[ 3,
            3,
            3,
            14 ],
          2015:[ 3,
            2,
            3,
            13 ],
          2016:[ 3,
            7,
            3,
            18 ],
          2017:[ 3,
            6,
            3,
            17 ],
          2018:[ 3,
            5,
            3,
            16,
            4,
            30,
            4,
            30 ],
          2019:[ 3,
            4,
            3,
            15 ],
          2020:[ 3,
            2,
            3,
            13 ],
          2021:[ 3,
            1,
            3,
            12 ],
          2022:[ 3,
            7,
            3,
            18 ],
          2023:[ 3,
            6,
            3,
            17 ],
          2024:[ 3,
            18,
            3,
            28 ],
          2025:[ 3,
            10,
            3,
            21 ],
          name:"Osterferien" },
        { 2012:[ 4,
            30,
            5,
            4,
            5,
            18,
            5,
            18 ],
          2013:[ 5,
            2,
            5,
            10 ],
          2014:[ 4,
            28,
            5,
            2,
            5,
            30,
            5,
            30 ],
          2015:[ 5,
            11,
            5,
            15 ],
          2016:[ 5,
            6,
            5,
            6,
            5,
            17,
            5,
            20 ],
          2017:[ 5,
            22,
            5,
            26 ],
          2018:[ 5,
            7,
            5,
            11 ],
          2019:[ 5,
            13,
            5,
            17,
            5,
            31,
            5,
            31 ],
          2020:[ 5,
            4,
            5,
            8 ],
          2021:[ 5,
            10,
            5,
            14 ],
          2022:[ 5,
            23,
            5,
            27 ],
          2023:[ 5,
            15,
            5,
            19 ],
          2024:[ 5,
            21,
            5,
            24 ],
          2025:[ 5,
            2,
            5,
            2,
            5,
            26,
            5,
            30 ],
          name:"Pfingstferien" },
        { 2012:[ 6,
            21,
            8,
            1 ],
          2013:[ 6,
            20,
            7,
            31 ],
          2014:[ 7,
            10,
            8,
            20 ],
          2015:[ 7,
            16,
            8,
            26 ],
          2016:[ 7,
            21,
            8,
            31 ],
          2017:[ 7,
            20,
            8,
            30 ],
          2018:[ 7,
            5,
            8,
            15 ],
          2019:[ 6,
            27,
            8,
            7 ],
          2020:[ 6,
            25,
            8,
            5 ],
          2021:[ 6,
            24,
            8,
            4 ],
          2022:[ 7,
            7,
            8,
            17 ],
          2023:[ 7,
            13,
            8,
            23 ],
          2024:[ 7,
            18,
            8,
            28 ],
          2025:[ 7,
            24,
            9,
            3 ],
          name:"Sommerferien" },
        { 2012:[ 10,
            1,
            10,
            12 ],
          2013:[ 9,
            30,
            10,
            11 ],
          2014:[ 10,
            13,
            10,
            24 ],
          2015:[ 10,
            19,
            10,
            30 ],
          2016:[ 10,
            17,
            10,
            28 ],
          2017:[ 10,
            2,
            10,
            2,
            10,
            16,
            10,
            27 ],
          2018:[ 10,
            1,
            10,
            12 ],
          2019:[ 10,
            4,
            10,
            18 ],
          2020:[ 10,
            5,
            10,
            16 ],
          2021:[ 10,
            4,
            10,
            15 ],
          2022:[ 10,
            10,
            10,
            21 ],
          2023:[ 10,
            2,
            10,
            2,
            10,
            16,
            10,
            27 ],
          2024:[ 10,
            4,
            10,
            4,
            10,
            21,
            11,
            1 ],
          2025:[ 10,
            20,
            10,
            31 ],
          name:"Herbstferien" },
        { 2011:[ 12,
            27,
            1,
            6 ],
          2012:[ 12,
            21,
            1,
            4 ],
          2013:[ 12,
            19,
            1,
            3 ],
          2014:[ 12,
            22,
            1,
            6 ],
          2015:[ 12,
            21,
            1,
            1 ],
          2016:[ 12,
            27,
            1,
            6 ],
          2017:[ 12,
            22,
            1,
            5 ],
          2018:[ 12,
            20,
            1,
            4 ],
          2019:[ 12,
            23,
            1,
            3 ],
          2020:[ 12,
            21,
            1,
            4 ],
          2021:[ 12,
            23,
            1,
            4 ],
          2022:[ 12,
            23,
            1,
            6 ],
          2023:[ 12,
            22,
            1,
            5 ],
          2024:[ 12,
            20,
            1,
            3 ],
          2025:[ 12,
            17,
            1,
            2 ],
          name:"Weihnachtsferien" } ] },
    Hessen:{ _state_code:"he",
      SH:[ { 2012:[ 4,
            2,
            4,
            14 ],
          2013:[ 3,
            25,
            4,
            6 ],
          2014:[ 4,
            14,
            4,
            26 ],
          2015:[ 3,
            30,
            4,
            11 ],
          2016:[ 3,
            29,
            4,
            9 ],
          2017:[ 4,
            3,
            4,
            15 ],
          2018:[ 3,
            26,
            4,
            7 ],
          2019:[ 4,
            14,
            4,
            27 ],
          2020:[ 4,
            6,
            4,
            18 ],
          2021:[ 4,
            6,
            4,
            16 ],
          2022:[ 4,
            11,
            4,
            23 ],
          2023:[ 4,
            3,
            4,
            22 ],
          2024:[ 3,
            25,
            4,
            13 ],
          2025:[ 4,
            7,
            4,
            21 ],
          name:"Osterferien" },
        { 2012:[ 7,
            2,
            8,
            10 ],
          2013:[ 7,
            8,
            8,
            16 ],
          2014:[ 7,
            28,
            9,
            5 ],
          2015:[ 7,
            27,
            9,
            4 ],
          2016:[ 7,
            18,
            8,
            26 ],
          2017:[ 7,
            3,
            8,
            11 ],
          2018:[ 6,
            25,
            8,
            3 ],
          2019:[ 7,
            1,
            8,
            9 ],
          2020:[ 7,
            6,
            8,
            14 ],
          2021:[ 7,
            19,
            8,
            27 ],
          2022:[ 7,
            25,
            9,
            2 ],
          2023:[ 7,
            24,
            9,
            1 ],
          2024:[ 7,
            15,
            8,
            23 ],
          2025:[ 7,
            7,
            8,
            15 ],
          name:"Sommerferien" },
        { 2012:[ 10,
            15,
            10,
            27 ],
          2013:[ 10,
            14,
            10,
            26 ],
          2014:[ 10,
            20,
            11,
            1 ],
          2015:[ 10,
            19,
            10,
            31 ],
          2016:[ 10,
            17,
            10,
            29 ],
          2017:[ 10,
            9,
            10,
            21 ],
          2018:[ 10,
            1,
            10,
            13 ],
          2019:[ 9,
            30,
            10,
            12 ],
          2020:[ 10,
            5,
            10,
            17 ],
          2021:[ 10,
            11,
            10,
            23 ],
          2022:[ 10,
            24,
            10,
            29 ],
          2023:[ 10,
            23,
            10,
            28 ],
          2024:[  ],
          2025:[ 10,
            6,
            10,
            18 ],
          name:"Herbstferien" },
        { 2011:[ 12,
            21,
            1,
            6 ],
          2012:[ 12,
            24,
            1,
            12 ],
          2013:[ 12,
            23,
            1,
            11 ],
          2014:[ 12,
            22,
            1,
            10 ],
          2015:[ 12,
            23,
            1,
            9 ],
          2016:[ 12,
            22,
            1,
            7 ],
          2017:[ 12,
            24,
            1,
            13 ],
          2018:[ 12,
            24,
            1,
            12 ],
          2019:[ 12,
            23,
            1,
            11 ],
          2020:[ 12,
            21,
            1,
            9 ],
          2021:[ 12,
            23,
            1,
            8 ],
          2022:[ 12,
            22,
            1,
            7 ],
          2023:[ 12,
            27,
            1,
            13 ],
          2024:[  ],
          2025:[ 12,
            22,
            1,
            10 ],
          name:"Weihnachtsferien" } ] },
    "Mecklenburg-Vorpommern":{ _state_code:"mv",
      SH:[ { 2012:[ 2,
            6,
            2,
            17 ],
          2013:[ 2,
            4,
            2,
            15 ],
          2014:[ 2,
            3,
            2,
            15 ],
          2015:[ 2,
            2,
            2,
            14 ],
          2016:[ 2,
            1,
            2,
            13 ],
          2017:[ 2,
            6,
            2,
            18 ],
          2018:[ 2,
            5,
            2,
            16 ],
          2019:[ 2,
            4,
            2,
            15 ],
          2020:[ 2,
            10,
            2,
            21 ],
          2021:[ 2,
            6,
            2,
            19 ],
          2022:[ 2,
            5,
            2,
            17 ],
          2023:[ 2,
            6,
            2,
            18 ],
          2024:[ 2,
            5,
            2,
            16 ],
          2025:[ 2,
            3,
            2,
            14 ],
          name:"Winterferien" },
        { 2012:[ 4,
            2,
            4,
            11 ],
          2013:[ 3,
            25,
            4,
            3 ],
          2014:[ 4,
            14,
            4,
            23 ],
          2015:[ 3,
            30,
            4,
            8 ],
          2016:[ 3,
            21,
            3,
            30 ],
          2017:[ 4,
            10,
            4,
            19 ],
          2018:[ 3,
            26,
            4,
            4 ],
          2019:[ 4,
            15,
            4,
            24 ],
          2020:[ 4,
            6,
            4,
            15 ],
          2021:[ 3,
            29,
            4,
            7 ],
          2022:[ 4,
            11,
            4,
            20 ],
          2023:[ 4,
            3,
            4,
            12 ],
          2024:[ 3,
            25,
            4,
            3 ],
          2025:[ 4,
            14,
            4,
            23,
            5,
            30,
            5,
            30 ],
          name:"Osterferien" },
        { 2012:[ 5,
            25,
            5,
            29 ],
          2013:[ 5,
            17,
            5,
            21 ],
          2014:[ 6,
            6,
            6,
            10 ],
          2015:[ 5,
            22,
            5,
            26 ],
          2016:[ 5,
            14,
            5,
            17 ],
          2017:[ 6,
            2,
            6,
            6 ],
          2018:[ 5,
            11,
            5,
            11,
            5,
            18,
            5,
            22 ],
          2019:[ 5,
            22,
            5,
            22,
            6,
            7,
            6,
            11 ],
          2020:[ 5,
            22,
            5,
            22,
            5,
            29,
            6,
            2 ],
          2021:[ 5,
            14,
            5,
            14,
            5,
            21,
            5,
            25 ],
          2022:[ 5,
            27,
            5,
            27,
            6,
            3,
            6,
            7 ],
          2023:[ 5,
            19,
            5,
            19,
            5,
            26,
            5,
            30 ],
          2024:[ 5,
            10,
            5,
            10,
            5,
            17,
            5,
            21 ],
          2025:[ 6,
            6,
            6,
            10 ],
          name:"Pfingstferien" },
        { 2012:[ 6,
            23,
            8,
            4 ],
          2013:[ 6,
            22,
            8,
            3 ],
          2014:[ 7,
            14,
            8,
            23 ],
          2015:[ 7,
            20,
            8,
            29 ],
          2016:[ 7,
            25,
            9,
            3 ],
          2017:[ 7,
            24,
            9,
            2 ],
          2018:[ 7,
            9,
            8,
            18 ],
          2019:[ 7,
            1,
            8,
            10 ],
          2020:[ 6,
            22,
            8,
            1 ],
          2021:[ 6,
            21,
            7,
            31 ],
          2022:[ 7,
            4,
            8,
            13 ],
          2023:[ 7,
            17,
            8,
            26 ],
          2024:[ 7,
            22,
            8,
            31 ],
          2025:[ 7,
            28,
            9,
            6 ],
          name:"Sommerferien" },
        { 2012:[ 10,
            1,
            10,
            5 ],
          2013:[ 10,
            14,
            10,
            19 ],
          2014:[ 10,
            20,
            10,
            25 ],
          2015:[ 10,
            24,
            10,
            30 ],
          2016:[ 10,
            24,
            10,
            28 ],
          2017:[ 10,
            2,
            10,
            2,
            10,
            23,
            10,
            30 ],
          2018:[ 10,
            8,
            10,
            13,
            11,
            1,
            11,
            2 ],
          2019:[ 10,
            4,
            10,
            4,
            10,
            7,
            10,
            12,
            11,
            1,
            11,
            1 ],
          2020:[ 10,
            5,
            10,
            10,
            11,
            2,
            11,
            3 ],
          2021:[ 10,
            2,
            10,
            9,
            11,
            1,
            11,
            2 ],
          2022:[ 10,
            10,
            10,
            14,
            11,
            1,
            11,
            2 ],
          2023:[ 10,
            9,
            10,
            14,
            10,
            30,
            10,
            30,
            11,
            1,
            11,
            1 ],
          2024:[ 10,
            4,
            10,
            4,
            10,
            21,
            10,
            26,
            11,
            1,
            11,
            1 ],
          2025:[ 10,
            2,
            10,
            2,
            10,
            20,
            10,
            25,
            11,
            3,
            11,
            3 ],
          name:"Herbstferien" },
        { 2011:[ 12,
            23,
            1,
            3 ],
          2012:[ 12,
            21,
            1,
            4 ],
          2013:[ 12,
            23,
            1,
            3 ],
          2014:[ 12,
            22,
            1,
            2 ],
          2015:[ 12,
            21,
            1,
            2 ],
          2016:[ 12,
            22,
            1,
            2 ],
          2017:[ 12,
            21,
            1,
            3 ],
          2018:[ 12,
            24,
            1,
            5 ],
          2019:[ 12,
            23,
            1,
            4 ],
          2020:[ 12,
            21,
            1,
            2 ],
          2021:[ 12,
            22,
            12,
            31 ],
          2022:[ 12,
            22,
            1,
            2 ],
          2023:[ 12,
            21,
            1,
            3 ],
          2024:[ 12,
            23,
            1,
            6 ],
          2025:[ 12,
            22,
            1,
            5 ],
          name:"Weihnachtsferien" } ] },
    Niedersachsen:{ _state_code:"ni",
      SH:[ { 2012:[ 1,
            30,
            1,
            31 ],
          2013:[ 1,
            31,
            2,
            1 ],
          2014:[ 1,
            30,
            1,
            31 ],
          2015:[ 2,
            2,
            2,
            3 ],
          2016:[ 1,
            28,
            1,
            29 ],
          2017:[ 1,
            30,
            1,
            31 ],
          2018:[ 2,
            1,
            2,
            2 ],
          2019:[ 1,
            31,
            2,
            1 ],
          2020:[ 2,
            3,
            2,
            4 ],
          2021:[ 2,
            1,
            2,
            2 ],
          2022:[ 1,
            31,
            2,
            1 ],
          2023:[ 1,
            30,
            1,
            31 ],
          2024:[ 2,
            1,
            2,
            2 ],
          2025:[ 2,
            3,
            2,
            4 ],
          name:"Winterferien" },
        { 2012:[ 3,
            26,
            4,
            11,
            4,
            30,
            4,
            30 ],
          2013:[ 3,
            16,
            4,
            2 ],
          2014:[ 4,
            3,
            4,
            22,
            5,
            2,
            5,
            2 ],
          2015:[ 3,
            25,
            4,
            10 ],
          2016:[ 3,
            18,
            4,
            2 ],
          2017:[ 4,
            10,
            4,
            22 ],
          2018:[ 3,
            19,
            4,
            3 ],
          2019:[ 4,
            8,
            4,
            23 ],
          2020:[ 3,
            30,
            4,
            14 ],
          2021:[ 3,
            29,
            4,
            9 ],
          2022:[ 4,
            4,
            4,
            19 ],
          2023:[ 3,
            27,
            4,
            11 ],
          2024:[ 3,
            18,
            4,
            2 ],
          2025:[ 4,
            7,
            4,
            19,
            4,
            30,
            4,
            30 ],
          name:"Osterferien" },
        { 2012:[ 5,
            18,
            5,
            18,
            5,
            29,
            5,
            29 ],
          2013:[ 5,
            10,
            5,
            10,
            5,
            21,
            5,
            21 ],
          2014:[ 5,
            30,
            5,
            30,
            6,
            10,
            6,
            10 ],
          2015:[ 5,
            15,
            5,
            15,
            5,
            26,
            5,
            26 ],
          2016:[ 5,
            6,
            5,
            6,
            5,
            17,
            5,
            17 ],
          2017:[ 5,
            26,
            5,
            26,
            6,
            6,
            6,
            6 ],
          2018:[ 4,
            30,
            4,
            30,
            5,
            11,
            5,
            11,
            5,
            22,
            5,
            22 ],
          2019:[ 5,
            31,
            5,
            31,
            6,
            11,
            6,
            11 ],
          2020:[ 5,
            22,
            5,
            22,
            6,
            2,
            6,
            2 ],
          2021:[ 5,
            14,
            5,
            14,
            5,
            25,
            5,
            25 ],
          2022:[ 5,
            27,
            5,
            27,
            6,
            7,
            6,
            7 ],
          2023:[ 5,
            19,
            5,
            19,
            5,
            30,
            5,
            30 ],
          2024:[ 5,
            10,
            5,
            10,
            5,
            21,
            5,
            21 ],
          2025:[ 5,
            2,
            5,
            2,
            5,
            30,
            5,
            30,
            6,
            10,
            6,
            10 ],
          name:"Pfingstferien" },
        { 2012:[ 7,
            23,
            8,
            31 ],
          2013:[ 6,
            27,
            8,
            7 ],
          2014:[ 7,
            31,
            9,
            10 ],
          2015:[ 7,
            23,
            9,
            2 ],
          2016:[ 6,
            23,
            8,
            3 ],
          2017:[ 6,
            22,
            8,
            2 ],
          2018:[ 6,
            28,
            8,
            8 ],
          2019:[ 7,
            4,
            8,
            14 ],
          2020:[ 7,
            16,
            8,
            26 ],
          2021:[ 7,
            22,
            9,
            1 ],
          2022:[ 7,
            14,
            8,
            24 ],
          2023:[ 7,
            6,
            8,
            16 ],
          2024:[ 6,
            24,
            8,
            2 ],
          2025:[ 7,
            3,
            8,
            13 ],
          name:"Sommerferien" },
        { 2012:[ 10,
            22,
            11,
            3 ],
          2013:[ 10,
            4,
            10,
            18 ],
          2014:[ 10,
            27,
            11,
            8 ],
          2015:[ 10,
            19,
            10,
            31 ],
          2016:[ 10,
            4,
            10,
            15 ],
          2017:[ 10,
            2,
            10,
            13,
            10,
            30,
            10,
            30 ],
          2018:[ 10,
            1,
            10,
            12 ],
          2019:[ 10,
            4,
            10,
            18 ],
          2020:[ 10,
            12,
            10,
            23 ],
          2021:[ 10,
            18,
            10,
            29 ],
          2022:[ 10,
            17,
            10,
            28 ],
          2023:[ 10,
            2,
            10,
            2,
            10,
            16,
            10,
            27 ],
          2024:[ 10,
            4,
            10,
            19,
            11,
            1,
            11,
            1 ],
          2025:[ 10,
            13,
            10,
            25 ],
          name:"Herbstferien" },
        { 2011:[ 12,
            23,
            1,
            4 ],
          2012:[ 12,
            24,
            1,
            5 ],
          2013:[ 12,
            23,
            1,
            3 ],
          2014:[ 12,
            22,
            1,
            5 ],
          2015:[ 12,
            23,
            1,
            6 ],
          2016:[ 12,
            21,
            1,
            6 ],
          2017:[ 12,
            22,
            1,
            5 ],
          2018:[ 12,
            24,
            1,
            4 ],
          2019:[ 12,
            23,
            1,
            6 ],
          2020:[ 12,
            23,
            1,
            8 ],
          2021:[ 12,
            23,
            1,
            7 ],
          2022:[ 12,
            23,
            1,
            6 ],
          2023:[ 12,
            27,
            1,
            5 ],
          2024:[ 12,
            23,
            1,
            4 ],
          2025:[ 12,
            22,
            1,
            5 ],
          name:"Weihnachtsferien" } ] },
    "Nordrhein-Westfalen":{ _state_code:"nw",
      SH:[ { 2012:[ 4,
            2,
            4,
            14 ],
          2013:[ 3,
            25,
            4,
            6 ],
          2014:[ 4,
            14,
            4,
            26 ],
          2015:[ 3,
            30,
            4,
            11 ],
          2016:[ 3,
            21,
            4,
            2 ],
          2017:[ 4,
            10,
            4,
            22 ],
          2018:[ 3,
            26,
            4,
            7 ],
          2019:[ 4,
            15,
            4,
            27 ],
          2020:[ 4,
            6,
            4,
            18 ],
          2021:[ 3,
            29,
            4,
            10 ],
          2022:[ 4,
            11,
            4,
            23 ],
          2023:[ 4,
            3,
            4,
            15 ],
          2024:[ 3,
            25,
            4,
            6 ],
          2025:[ 4,
            14,
            4,
            26 ],
          name:"Osterferien" },
        { 2012:[ 5,
            29,
            5,
            29 ],
          2013:[ 5,
            21,
            5,
            21 ],
          2014:[ 6,
            10,
            6,
            10 ],
          2015:[ 5,
            26,
            5,
            26 ],
          2016:[ 5,
            17,
            5,
            17 ],
          2017:[ 6,
            6,
            6,
            6 ],
          2018:[ 5,
            22,
            5,
            25 ],
          2019:[ 6,
            11,
            6,
            11 ],
          2020:[ 6,
            2,
            6,
            2 ],
          2021:[ 5,
            25,
            5,
            25 ],
          2023:[ 5,
            30,
            5,
            30 ],
          2024:[ 5,
            21,
            5,
            21 ],
          2025:[ 6,
            10,
            6,
            10 ],
          name:"Pfingstferien" },
        { 2012:[ 7,
            9,
            8,
            21 ],
          2013:[ 7,
            22,
            9,
            3 ],
          2014:[ 7,
            7,
            8,
            19 ],
          2015:[ 6,
            29,
            8,
            11 ],
          2016:[ 7,
            11,
            8,
            23 ],
          2017:[ 7,
            17,
            8,
            29 ],
          2018:[ 7,
            16,
            8,
            28 ],
          2019:[ 7,
            15,
            8,
            27 ],
          2020:[ 6,
            29,
            8,
            11 ],
          2021:[ 7,
            5,
            8,
            17 ],
          2022:[ 6,
            27,
            8,
            9 ],
          2023:[ 6,
            22,
            8,
            4 ],
          2024:[ 7,
            8,
            8,
            20 ],
          2025:[ 7,
            14,
            8,
            26 ],
          name:"Sommerferien" },
        { 2012:[ 10,
            8,
            10,
            20 ],
          2013:[ 10,
            21,
            11,
            2 ],
          2014:[ 10,
            6,
            10,
            18 ],
          2015:[ 10,
            5,
            10,
            17 ],
          2016:[ 10,
            10,
            10,
            21 ],
          2017:[ 10,
            23,
            11,
            4 ],
          2018:[ 10,
            15,
            10,
            27 ],
          2019:[ 10,
            14,
            10,
            26 ],
          2020:[ 10,
            12,
            10,
            24 ],
          2021:[ 10,
            11,
            10,
            23 ],
          2022:[ 10,
            4,
            10,
            15 ],
          2023:[ 10,
            2,
            10,
            14 ],
          2024:[ 10,
            14,
            10,
            26 ],
          2025:[ 10,
            13,
            10,
            25 ],
          name:"Herbstferien" },
        { 2011:[ 12,
            23,
            1,
            6 ],
          2012:[ 12,
            21,
            1,
            4 ],
          2013:[ 12,
            23,
            1,
            7 ],
          2014:[ 12,
            22,
            1,
            6 ],
          2015:[ 12,
            23,
            1,
            6 ],
          2016:[ 12,
            23,
            1,
            6 ],
          2017:[ 12,
            27,
            1,
            6 ],
          2018:[ 12,
            21,
            1,
            4 ],
          2019:[ 12,
            23,
            1,
            6 ],
          2020:[ 12,
            23,
            1,
            6 ],
          2021:[ 12,
            24,
            1,
            8 ],
          2022:[ 12,
            23,
            1,
            6 ],
          2023:[ 12,
            21,
            1,
            5 ],
          2024:[ 12,
            23,
            1,
            6 ],
          2025:[ 12,
            22,
            1,
            6 ],
          name:"Weihnachtsferien" } ] },
    "Rheinland-Pfalz":{ _state_code:"rp",
      SH:[ { 2019:[ 2,
            25,
            3,
            1 ],
          2020:[ 2,
            17,
            2,
            21 ],
          2022:[ 2,
            21,
            2,
            25 ],
          2024:[  ],
          2025:[  ],
          name:"Winterferien" },
        { 2012:[ 3,
            29,
            4,
            13 ],
          2013:[ 3,
            20,
            4,
            5 ],
          2014:[ 4,
            11,
            4,
            25 ],
          2015:[ 3,
            26,
            4,
            10 ],
          2016:[ 3,
            18,
            4,
            1 ],
          2017:[ 4,
            10,
            4,
            21 ],
          2018:[ 3,
            26,
            4,
            6 ],
          2019:[ 4,
            23,
            4,
            30 ],
          2020:[ 4,
            9,
            4,
            17 ],
          2021:[ 3,
            29,
            4,
            6 ],
          2022:[ 4,
            13,
            4,
            22 ],
          2023:[ 4,
            3,
            4,
            6 ],
          2024:[ 3,
            25,
            4,
            2 ],
          2025:[ 4,
            14,
            4,
            25 ],
          name:"Osterferien" },
        { 2021:[ 5,
            25,
            6,
            2 ],
          2023:[ 5,
            30,
            6,
            7 ],
          2024:[ 5,
            21,
            5,
            29 ],
          2025:[  ],
          name:"Pfingstferien" },
        { 2012:[ 7,
            2,
            8,
            10 ],
          2013:[ 7,
            8,
            8,
            16 ],
          2014:[ 7,
            28,
            9,
            5 ],
          2015:[ 7,
            27,
            9,
            4 ],
          2016:[ 7,
            18,
            8,
            26 ],
          2017:[ 7,
            3,
            8,
            11 ],
          2018:[ 6,
            25,
            8,
            3 ],
          2019:[ 7,
            1,
            8,
            9 ],
          2020:[ 7,
            6,
            8,
            14 ],
          2021:[ 7,
            19,
            8,
            27 ],
          2022:[ 7,
            25,
            9,
            2 ],
          2023:[ 7,
            24,
            9,
            1 ],
          2024:[ 7,
            15,
            8,
            23 ],
          2025:[ 7,
            7,
            8,
            15 ],
          name:"Sommerferien" },
        { 2012:[ 10,
            1,
            10,
            12 ],
          2013:[ 10,
            4,
            10,
            18 ],
          2014:[ 10,
            20,
            10,
            31 ],
          2015:[ 10,
            19,
            10,
            30 ],
          2016:[ 10,
            10,
            10,
            21 ],
          2017:[ 10,
            2,
            10,
            13 ],
          2018:[ 10,
            1,
            10,
            12 ],
          2019:[ 9,
            30,
            10,
            11 ],
          2020:[ 10,
            12,
            10,
            23 ],
          2021:[ 10,
            11,
            10,
            22 ],
          2022:[ 10,
            17,
            10,
            31 ],
          2023:[ 10,
            16,
            10,
            27 ],
          2024:[ 10,
            14,
            10,
            25 ],
          2025:[ 10,
            13,
            10,
            24 ],
          name:"Herbstferien" },
        { 2011:[ 12,
            22,
            1,
            6 ],
          2012:[ 12,
            20,
            1,
            4 ],
          2013:[ 12,
            23,
            1,
            7 ],
          2014:[ 12,
            22,
            1,
            7 ],
          2015:[ 12,
            23,
            1,
            8 ],
          2016:[ 12,
            22,
            1,
            6 ],
          2017:[ 12,
            22,
            1,
            9 ],
          2018:[ 12,
            20,
            1,
            4 ],
          2019:[ 12,
            23,
            1,
            6 ],
          2020:[ 12,
            21,
            12,
            31 ],
          2021:[ 12,
            23,
            12,
            31 ],
          2022:[ 12,
            23,
            1,
            2 ],
          2023:[ 12,
            27,
            1,
            5 ],
          2024:[ 12,
            23,
            1,
            8 ],
          2025:[ 12,
            22,
            1,
            7 ],
          name:"Weihnachtsferien" } ] },
    Saarland:{ _state_code:"sl",
      SH:[ { 2012:[ 2,
            20,
            2,
            25 ],
          2013:[ 2,
            11,
            2,
            16 ],
          2014:[ 3,
            3,
            3,
            8 ],
          2015:[ 2,
            16,
            2,
            21 ],
          2016:[ 2,
            8,
            2,
            13 ],
          2017:[ 2,
            27,
            3,
            4 ],
          2018:[ 2,
            12,
            2,
            17 ],
          2019:[ 2,
            25,
            3,
            5 ],
          2020:[ 2,
            17,
            2,
            25 ],
          2021:[ 2,
            15,
            2,
            19 ],
          2022:[ 2,
            21,
            3,
            1 ],
          2023:[ 2,
            20,
            2,
            24 ],
          2024:[ 2,
            12,
            2,
            16 ],
          2025:[ 2,
            24,
            3,
            4 ],
          name:"Winterferien" },
        { 2012:[ 4,
            2,
            4,
            14 ],
          2013:[ 3,
            25,
            4,
            6 ],
          2014:[ 4,
            14,
            4,
            26 ],
          2015:[ 3,
            30,
            4,
            11 ],
          2016:[ 3,
            29,
            4,
            9 ],
          2017:[ 4,
            10,
            4,
            22 ],
          2018:[ 3,
            26,
            4,
            6 ],
          2019:[ 4,
            17,
            4,
            26 ],
          2020:[ 4,
            14,
            4,
            24 ],
          2021:[ 3,
            29,
            4,
            7 ],
          2022:[ 4,
            14,
            4,
            22 ],
          2023:[ 4,
            3,
            4,
            12 ],
          2024:[ 3,
            25,
            4,
            5 ],
          2025:[ 4,
            14,
            4,
            25 ],
          name:"Osterferien" },
        { 2021:[ 5,
            25,
            5,
            28 ],
          2022:[ 6,
            7,
            6,
            10 ],
          2023:[ 5,
            30,
            6,
            2 ],
          2024:[ 5,
            21,
            5,
            24 ],
          2025:[  ],
          name:"Pfingstferien" },
        { 2012:[ 7,
            2,
            8,
            14 ],
          2013:[ 7,
            8,
            8,
            17 ],
          2014:[ 7,
            28,
            9,
            6 ],
          2015:[ 7,
            27,
            9,
            5 ],
          2016:[ 7,
            18,
            8,
            27 ],
          2017:[ 7,
            3,
            8,
            14 ],
          2018:[ 6,
            25,
            8,
            3 ],
          2019:[ 7,
            1,
            8,
            9 ],
          2020:[ 7,
            6,
            8,
            14 ],
          2021:[ 7,
            19,
            8,
            27 ],
          2022:[ 7,
            25,
            9,
            2 ],
          2023:[ 7,
            24,
            9,
            1 ],
          2024:[ 7,
            15,
            8,
            23 ],
          2025:[ 7,
            7,
            8,
            14 ],
          name:"Sommerferien" },
        { 2012:[ 10,
            22,
            11,
            3 ],
          2013:[ 10,
            21,
            11,
            2 ],
          2014:[ 10,
            20,
            10,
            31 ],
          2015:[ 10,
            19,
            10,
            31 ],
          2016:[ 10,
            10,
            10,
            22 ],
          2017:[ 10,
            2,
            10,
            14 ],
          2018:[ 10,
            1,
            10,
            12 ],
          2019:[ 10,
            7,
            10,
            18 ],
          2020:[ 10,
            12,
            10,
            23 ],
          2021:[ 10,
            18,
            10,
            29 ],
          2022:[ 10,
            24,
            11,
            4 ],
          2023:[ 10,
            23,
            11,
            3 ],
          2024:[ 10,
            14,
            10,
            25 ],
          2025:[ 10,
            13,
            10,
            24 ],
          name:"Herbstferien" },
        { 2011:[ 12,
            23,
            1,
            4 ],
          2012:[ 12,
            24,
            1,
            5 ],
          2013:[ 12,
            20,
            1,
            4 ],
          2014:[ 12,
            22,
            1,
            7 ],
          2015:[ 12,
            21,
            1,
            2 ],
          2016:[ 12,
            19,
            12,
            31 ],
          2017:[ 12,
            21,
            1,
            5 ],
          2018:[ 12,
            20,
            1,
            4 ],
          2019:[ 12,
            23,
            1,
            3 ],
          2020:[ 12,
            21,
            12,
            31 ],
          2021:[ 12,
            23,
            1,
            3 ],
          2022:[ 12,
            22,
            1,
            4 ],
          2023:[ 12,
            21,
            1,
            2 ],
          2024:[ 12,
            23,
            1,
            3 ],
          2025:[ 12,
            22,
            1,
            2 ],
          name:"Weihnachtsferien" } ] },
    Sachsen:{ _state_code:"sn",
      SH:[ { 2012:[ 2,
            13,
            2,
            25 ],
          2013:[ 2,
            4,
            2,
            15 ],
          2014:[ 2,
            17,
            3,
            1 ],
          2015:[ 2,
            9,
            2,
            21 ],
          2016:[ 2,
            8,
            2,
            20 ],
          2017:[ 2,
            13,
            2,
            24 ],
          2018:[ 2,
            12,
            2,
            23 ],
          2019:[ 2,
            18,
            3,
            2 ],
          2020:[ 2,
            10,
            2,
            22 ],
          2021:[ 2,
            8,
            2,
            20 ],
          2022:[ 2,
            12,
            2,
            26 ],
          2023:[ 2,
            13,
            2,
            24 ],
          2024:[ 2,
            12,
            2,
            23 ],
          2025:[ 2,
            17,
            3,
            1 ],
          name:"Winterferien" },
        { 2012:[ 4,
            6,
            4,
            14 ],
          2013:[ 3,
            29,
            4,
            6 ],
          2014:[ 4,
            18,
            4,
            26 ],
          2015:[ 4,
            2,
            4,
            11 ],
          2016:[ 3,
            25,
            4,
            2 ],
          2017:[ 4,
            13,
            4,
            22 ],
          2018:[ 3,
            29,
            4,
            6 ],
          2019:[ 4,
            19,
            4,
            26 ],
          2020:[ 4,
            10,
            4,
            18 ],
          2021:[ 4,
            2,
            4,
            10 ],
          2022:[ 4,
            15,
            4,
            23 ],
          2023:[ 4,
            7,
            4,
            15 ],
          2024:[ 3,
            28,
            4,
            5 ],
          2025:[ 4,
            18,
            4,
            25,
            5,
            30,
            5,
            30 ],
          name:"Osterferien" },
        { 2012:[ 5,
            18,
            5,
            18 ],
          2013:[ 5,
            10,
            5,
            10,
            5,
            18,
            5,
            22 ],
          2014:[ 5,
            30,
            5,
            30 ],
          2015:[ 5,
            15,
            5,
            15 ],
          2016:[ 5,
            6,
            5,
            6 ],
          2017:[ 5,
            26,
            5,
            26 ],
          2018:[ 5,
            11,
            5,
            11,
            5,
            19,
            5,
            22 ],
          2019:[ 5,
            31,
            5,
            31 ],
          2020:[ 5,
            22,
            5,
            22 ],
          2021:[ 5,
            14,
            5,
            14 ],
          2022:[ 5,
            27,
            5,
            27 ],
          2023:[ 5,
            19,
            5,
            19 ],
          2024:[ 5,
            10,
            5,
            10,
            5,
            18,
            5,
            21 ],
          2025:[  ],
          name:"Pfingstferien" },
        { 2012:[ 7,
            23,
            8,
            31 ],
          2013:[ 7,
            15,
            8,
            23 ],
          2014:[ 7,
            21,
            8,
            29 ],
          2015:[ 7,
            13,
            8,
            21 ],
          2016:[ 6,
            27,
            8,
            5 ],
          2017:[ 6,
            26,
            8,
            4 ],
          2018:[ 7,
            2,
            8,
            10 ],
          2019:[ 7,
            8,
            8,
            16 ],
          2020:[ 7,
            20,
            8,
            28 ],
          2021:[ 7,
            26,
            9,
            3 ],
          2022:[ 7,
            18,
            8,
            26 ],
          2023:[ 7,
            10,
            8,
            18 ],
          2024:[ 6,
            20,
            7,
            31 ],
          2025:[ 6,
            28,
            8,
            8 ],
          name:"Sommerferien" },
        { 2012:[ 10,
            22,
            11,
            2 ],
          2013:[ 10,
            21,
            11,
            1 ],
          2014:[ 10,
            20,
            10,
            31 ],
          2015:[ 10,
            12,
            10,
            24 ],
          2016:[ 10,
            3,
            10,
            15 ],
          2017:[ 10,
            2,
            10,
            14,
            10,
            30,
            10,
            30 ],
          2018:[ 10,
            8,
            10,
            20 ],
          2019:[ 10,
            14,
            10,
            25 ],
          2020:[ 10,
            19,
            10,
            31 ],
          2021:[ 10,
            18,
            10,
            30 ],
          2022:[ 10,
            17,
            10,
            29 ],
          2023:[ 10,
            2,
            10,
            14,
            10,
            30,
            10,
            30 ],
          2024:[ 10,
            7,
            10,
            19 ],
          2025:[ 10,
            6,
            10,
            18 ],
          name:"Herbstferien" },
        { 2011:[ 12,
            23,
            1,
            2 ],
          2012:[ 12,
            22,
            1,
            2 ],
          2013:[ 12,
            21,
            1,
            3 ],
          2014:[ 12,
            22,
            1,
            3 ],
          2015:[ 12,
            21,
            1,
            2 ],
          2016:[ 12,
            23,
            1,
            2 ],
          2017:[ 12,
            23,
            1,
            2 ],
          2018:[ 12,
            22,
            1,
            4 ],
          2019:[ 12,
            21,
            1,
            3 ],
          2020:[ 12,
            23,
            1,
            2 ],
          2021:[ 12,
            23,
            1,
            1 ],
          2022:[ 12,
            22,
            1,
            2 ],
          2023:[ 12,
            23,
            1,
            2 ],
          2024:[ 12,
            23,
            1,
            3 ],
          2025:[ 12,
            22,
            1,
            2 ],
          name:"Weihnachtsferien" } ] },
    "Sachsen-Anhalt":{ _state_code:"st",
      SH:[ { 2012:[ 2,
            4,
            2,
            11 ],
          2013:[ 2,
            1,
            2,
            8 ],
          2014:[ 2,
            1,
            2,
            12 ],
          2015:[ 2,
            2,
            2,
            14 ],
          2016:[ 2,
            1,
            2,
            10 ],
          2017:[ 2,
            4,
            2,
            11 ],
          2018:[ 2,
            5,
            2,
            9 ],
          2019:[ 2,
            11,
            2,
            15 ],
          2020:[ 2,
            10,
            2,
            14 ],
          2021:[ 2,
            8,
            2,
            13 ],
          2022:[ 2,
            12,
            2,
            19 ],
          2023:[ 2,
            6,
            2,
            11 ],
          2024:[ 2,
            5,
            2,
            10 ],
          2025:[ 1,
            27,
            1,
            31 ],
          name:"Winterferien" },
        { 2012:[ 4,
            2,
            4,
            7 ],
          2013:[ 3,
            25,
            3,
            30 ],
          2014:[ 4,
            14,
            4,
            17 ],
          2015:[ 4,
            2,
            4,
            2 ],
          2016:[ 3,
            24,
            3,
            24 ],
          2017:[ 4,
            10,
            4,
            13 ],
          2018:[ 3,
            26,
            3,
            31,
            4,
            30,
            4,
            30 ],
          2019:[ 4,
            18,
            4,
            30 ],
          2020:[ 4,
            6,
            4,
            11 ],
          2021:[ 3,
            29,
            4,
            3 ],
          2022:[ 4,
            11,
            4,
            16 ],
          2023:[ 4,
            3,
            4,
            8 ],
          2024:[ 3,
            25,
            3,
            30 ],
          2025:[ 4,
            7,
            4,
            19 ],
          name:"Osterferien" },
        { 2012:[ 5,
            18,
            5,
            25 ],
          2013:[ 5,
            10,
            5,
            18 ],
          2014:[ 5,
            30,
            6,
            7 ],
          2015:[ 5,
            15,
            5,
            23 ],
          2016:[ 5,
            6,
            5,
            14 ],
          2017:[ 5,
            26,
            5,
            26 ],
          2018:[ 5,
            11,
            5,
            19 ],
          2019:[ 5,
            31,
            6,
            1 ],
          2020:[ 5,
            18,
            5,
            30 ],
          2021:[ 5,
            10,
            5,
            22 ],
          2022:[ 5,
            23,
            5,
            28 ],
          2023:[ 5,
            15,
            5,
            19 ],
          2024:[ 5,
            21,
            5,
            24 ],
          2025:[ 5,
            30,
            5,
            30 ],
          name:"Pfingstferien" },
        { 2012:[ 7,
            23,
            9,
            5 ],
          2013:[ 7,
            15,
            8,
            28 ],
          2014:[ 7,
            21,
            9,
            3 ],
          2015:[ 7,
            13,
            8,
            26 ],
          2016:[ 6,
            27,
            8,
            10 ],
          2017:[ 6,
            26,
            8,
            9 ],
          2018:[ 6,
            28,
            8,
            8 ],
          2019:[ 7,
            4,
            8,
            14 ],
          2020:[ 7,
            16,
            8,
            26 ],
          2021:[ 7,
            22,
            9,
            1 ],
          2022:[ 7,
            14,
            8,
            24 ],
          2023:[ 7,
            6,
            8,
            16 ],
          2024:[ 6,
            24,
            8,
            3 ],
          2025:[ 6,
            28,
            8,
            8 ],
          name:"Sommerferien" },
        { 2012:[ 10,
            29,
            11,
            2 ],
          2013:[ 10,
            21,
            10,
            25 ],
          2014:[ 10,
            27,
            10,
            30 ],
          2015:[ 10,
            17,
            10,
            24 ],
          2016:[ 10,
            4,
            10,
            15 ],
          2017:[ 10,
            2,
            10,
            13,
            10,
            30,
            10,
            30 ],
          2018:[ 10,
            1,
            10,
            12 ],
          2019:[ 10,
            4,
            10,
            11,
            11,
            1,
            11,
            1 ],
          2020:[ 10,
            19,
            10,
            24 ],
          2021:[ 10,
            25,
            10,
            30 ],
          2022:[ 10,
            24,
            11,
            4 ],
          2023:[ 10,
            2,
            10,
            2,
            10,
            16,
            10,
            30 ],
          2024:[ 9,
            30,
            10,
            12,
            11,
            1,
            11,
            1 ],
          2025:[ 10,
            13,
            10,
            25 ],
          name:"Herbstferien" },
        { 2011:[ 12,
            22,
            1,
            7 ],
          2012:[ 12,
            19,
            1,
            4 ],
          2013:[ 12,
            21,
            1,
            3 ],
          2014:[ 12,
            22,
            1,
            5 ],
          2015:[ 12,
            21,
            1,
            5 ],
          2016:[ 12,
            19,
            1,
            2 ],
          2017:[ 12,
            21,
            1,
            3 ],
          2018:[ 12,
            19,
            1,
            4 ],
          2019:[ 12,
            23,
            1,
            4 ],
          2020:[ 12,
            19,
            1,
            5 ],
          2021:[ 12,
            22,
            1,
            8 ],
          2022:[ 12,
            21,
            1,
            5 ],
          2023:[ 12,
            21,
            1,
            3 ],
          2024:[ 12,
            23,
            1,
            4 ],
          2025:[ 12,
            22,
            1,
            5 ],
          name:"Weihnachtsferien" } ] },
    "Schleswig-Holstein":{ _state_code:"sh",
      SH:[ { 2012:[ 3,
            30,
            4,
            13 ],
          2013:[ 3,
            25,
            4,
            9 ],
          2014:[ 4,
            16,
            5,
            2 ],
          2015:[ 4,
            1,
            4,
            17 ],
          2016:[ 3,
            24,
            4,
            9 ],
          2017:[ 4,
            7,
            4,
            21 ],
          2018:[ 3,
            29,
            4,
            13 ],
          2019:[ 4,
            4,
            4,
            18 ],
          2020:[ 3,
            30,
            4,
            17 ],
          2021:[ 4,
            1,
            4,
            16 ],
          2022:[ 4,
            4,
            4,
            16 ],
          2023:[ 4,
            6,
            4,
            22 ],
          2024:[ 4,
            2,
            4,
            19 ],
          2025:[ 4,
            11,
            4,
            25,
            5,
            2,
            5,
            2 ],
          name:"Osterferien" },
        { 2012:[ 5,
            18,
            5,
            18 ],
          2013:[ 5,
            10,
            5,
            10 ],
          2014:[ 5,
            30,
            5,
            30 ],
          2015:[ 5,
            15,
            5,
            15 ],
          2016:[ 5,
            6,
            5,
            6 ],
          2017:[ 5,
            26,
            5,
            26 ],
          2018:[ 5,
            11,
            5,
            11 ],
          2019:[ 5,
            31,
            5,
            31 ],
          2020:[ 5,
            22,
            5,
            22 ],
          2021:[ 5,
            14,
            5,
            14 ],
          2022:[ 5,
            27,
            5,
            27 ],
          2023:[ 5,
            19,
            5,
            20 ],
          2024:[ 5,
            10,
            5,
            11 ],
          2025:[ 5,
            30,
            5,
            30 ],
          name:"Pfingstferien" },
        { 2012:[ 6,
            25,
            8,
            4 ],
          2013:[ 6,
            24,
            8,
            3 ],
          2014:[ 7,
            14,
            8,
            23 ],
          2015:[ 7,
            20,
            8,
            29 ],
          2016:[ 7,
            25,
            9,
            3 ],
          2017:[ 7,
            24,
            9,
            2 ],
          2018:[ 7,
            9,
            8,
            18 ],
          2019:[ 7,
            1,
            8,
            10 ],
          2020:[ 6,
            29,
            8,
            8 ],
          2021:[ 6,
            21,
            7,
            31 ],
          2022:[ 7,
            4,
            8,
            13 ],
          2023:[ 7,
            17,
            8,
            26 ],
          2024:[ 7,
            22,
            8,
            31 ],
          2025:[ 7,
            28,
            9,
            6 ],
          name:"Sommerferien" },
        { 2012:[ 10,
            4,
            10,
            19 ],
          2013:[ 10,
            4,
            10,
            18 ],
          2014:[ 10,
            13,
            10,
            25 ],
          2015:[ 10,
            19,
            10,
            31 ],
          2016:[ 10,
            17,
            10,
            29 ],
          2017:[ 10,
            16,
            10,
            27 ],
          2018:[ 10,
            1,
            10,
            19 ],
          2019:[ 10,
            4,
            10,
            18 ],
          2020:[ 10,
            5,
            10,
            17 ],
          2021:[ 10,
            4,
            10,
            16 ],
          2022:[ 10,
            10,
            10,
            21 ],
          2023:[ 10,
            16,
            10,
            27 ],
          2024:[ 10,
            4,
            10,
            4,
            10,
            21,
            11,
            1 ],
          2025:[ 10,
            20,
            10,
            30,
            11,
            28,
            11,
            28 ],
          name:"Herbstferien" },
        { 2011:[ 12,
            23,
            1,
            6 ],
          2012:[ 12,
            24,
            1,
            5 ],
          2013:[ 12,
            23,
            1,
            6 ],
          2014:[ 12,
            22,
            1,
            6 ],
          2015:[ 12,
            21,
            1,
            6 ],
          2016:[ 12,
            23,
            1,
            6 ],
          2017:[ 12,
            21,
            1,
            6 ],
          2018:[ 12,
            21,
            1,
            4 ],
          2019:[ 12,
            23,
            1,
            6 ],
          2020:[ 12,
            21,
            1,
            6 ],
          2021:[ 12,
            23,
            1,
            8 ],
          2022:[ 12,
            23,
            1,
            7 ],
          2023:[ 12,
            27,
            1,
            6 ],
          2024:[ 12,
            19,
            1,
            7 ],
          2025:[ 12,
            19,
            1,
            6 ],
          name:"Weihnachtsferien" },
        { 2024:[  ],
          2025:[ 2,
            3,
            2,
            3 ],
          name:"Winterferien" } ] },
    "Thüringen":{ _state_code:"th",
      SH:[ { 2012:[ 2,
            6,
            2,
            11 ],
          2013:[ 2,
            18,
            2,
            23 ],
          2014:[ 2,
            17,
            2,
            22 ],
          2015:[ 2,
            2,
            2,
            7 ],
          2016:[ 2,
            1,
            2,
            6 ],
          2017:[ 2,
            6,
            2,
            11 ],
          2018:[ 2,
            5,
            2,
            9 ],
          2019:[ 2,
            11,
            2,
            15 ],
          2020:[ 2,
            10,
            2,
            14 ],
          2021:[ 2,
            8,
            2,
            13 ],
          2022:[ 2,
            12,
            2,
            19 ],
          2023:[ 2,
            13,
            2,
            17 ],
          2024:[ 2,
            12,
            2,
            16 ],
          2025:[ 2,
            3,
            2,
            8 ],
          name:"Winterferien" },
        { 2012:[ 4,
            2,
            4,
            13 ],
          2013:[ 3,
            25,
            4,
            6 ],
          2014:[ 4,
            19,
            5,
            2 ],
          2015:[ 3,
            30,
            4,
            11 ],
          2016:[ 3,
            24,
            4,
            2 ],
          2017:[ 4,
            10,
            4,
            21 ],
          2018:[ 3,
            26,
            4,
            7 ],
          2019:[ 4,
            15,
            4,
            27 ],
          2020:[ 4,
            6,
            4,
            18 ],
          2021:[ 3,
            29,
            4,
            10 ],
          2022:[ 4,
            11,
            4,
            23 ],
          2023:[ 4,
            3,
            4,
            15 ],
          2024:[ 3,
            25,
            4,
            6 ],
          2025:[ 4,
            7,
            4,
            19 ],
          name:"Osterferien" },
        { 2012:[ 5,
            25,
            5,
            29 ],
          2013:[ 5,
            10,
            5,
            10 ],
          2014:[ 5,
            30,
            5,
            30 ],
          2015:[ 5,
            15,
            5,
            15 ],
          2016:[ 5,
            6,
            5,
            6 ],
          2017:[ 5,
            26,
            5,
            26 ],
          2018:[ 5,
            11,
            5,
            11 ],
          2019:[ 5,
            31,
            5,
            31 ],
          2020:[ 5,
            22,
            5,
            22 ],
          2021:[ 5,
            14,
            5,
            14 ],
          2022:[ 5,
            27,
            5,
            27 ],
          2023:[ 5,
            19,
            5,
            19 ],
          2024:[ 5,
            10,
            5,
            10 ],
          2025:[ 5,
            30,
            5,
            30 ],
          name:"Pfingstferien" },
        { 2012:[ 7,
            23,
            8,
            31 ],
          2013:[ 7,
            15,
            8,
            23 ],
          2014:[ 7,
            21,
            8,
            29 ],
          2015:[ 7,
            13,
            8,
            21 ],
          2016:[ 6,
            27,
            8,
            10 ],
          2017:[ 6,
            26,
            8,
            9 ],
          2018:[ 7,
            2,
            8,
            11 ],
          2019:[ 7,
            8,
            8,
            17 ],
          2020:[ 7,
            20,
            8,
            29 ],
          2021:[ 7,
            26,
            9,
            4 ],
          2022:[ 7,
            18,
            8,
            27 ],
          2023:[ 7,
            10,
            8,
            19 ],
          2024:[ 6,
            20,
            7,
            31 ],
          2025:[ 6,
            28,
            8,
            8 ],
          name:"Sommerferien" },
        { 2012:[ 10,
            22,
            11,
            3 ],
          2013:[ 10,
            21,
            11,
            2 ],
          2014:[ 10,
            6,
            10,
            18 ],
          2015:[ 10,
            5,
            10,
            17 ],
          2016:[ 10,
            10,
            10,
            22 ],
          2017:[ 10,
            2,
            10,
            14 ],
          2018:[ 10,
            1,
            10,
            13 ],
          2019:[ 10,
            7,
            10,
            19 ],
          2020:[ 10,
            17,
            10,
            30 ],
          2021:[ 10,
            25,
            11,
            6 ],
          2022:[ 10,
            17,
            10,
            29 ],
          2023:[ 10,
            2,
            10,
            14 ],
          2024:[ 9,
            30,
            10,
            12 ],
          2025:[ 10,
            6,
            10,
            18 ],
          name:"Herbstferien" },
        { 2011:[ 12,
            23,
            1,
            1 ],
          2012:[ 12,
            24,
            1,
            5 ],
          2013:[ 12,
            23,
            1,
            4 ],
          2014:[ 12,
            22,
            1,
            3 ],
          2015:[ 12,
            23,
            1,
            2 ],
          2016:[ 12,
            23,
            12,
            31 ],
          2017:[ 12,
            22,
            1,
            5 ],
          2018:[ 12,
            21,
            1,
            4 ],
          2019:[ 12,
            21,
            1,
            3 ],
          2020:[ 12,
            23,
            1,
            2 ],
          2021:[ 12,
            23,
            12,
            31 ],
          2022:[ 12,
            22,
            1,
            3 ],
          2023:[ 12,
            22,
            1,
            5 ],
          2024:[ 12,
            23,
            1,
            3 ],
          2025:[ 12,
            22,
            1,
            3 ],
          name:"Weihnachtsferien" } ] } };
  data$r.PH;
  data$r.Bayern;
  data$r.Berlin;
  data$r.Brandenburg;
  data$r.Bremen;
  data$r.Hamburg;
  data$r.Hessen;
  data$r.Niedersachsen;
  data$r.Saarland;
  data$r.Sachsen;

  var data$q = { PH:[ { name:"Nytårsdag",
        fixed_date:[ 1,
          1 ] },
      { name:"Skærtorsdag",
        variable_date:"easter",
        offset:-3 },
      { name:"Langfredag",
        variable_date:"easter",
        offset:-2 },
      { name:"Påskedag",
        variable_date:"easter" },
      { name:"2. Påskedag",
        variable_date:"easter",
        offset:1 },
      { name:"Store Bededag",
        variable_date:"easter",
        offset:26 },
      { name:"Kristi Himmelfartsdag",
        variable_date:"easter",
        offset:39 },
      { name:"Pinsedag",
        variable_date:"easter",
        offset:49 },
      { name:"2. Pinsedag",
        variable_date:"easter",
        offset:50 },
      { name:"Grundlovsdag",
        fixed_date:[ 6,
          5 ] },
      { name:"Juleaftensdag",
        fixed_date:[ 12,
          24 ] },
      { name:"Juledag",
        fixed_date:[ 12,
          25 ] },
      { name:"2. Juledag",
        fixed_date:[ 12,
          26 ] } ] };
  data$q.PH;

  var data$p = { PH:[ { name:"Cap d'Any",
        fixed_date:[ 1,
          1 ],
        only_states:[ "Cataluña" ] },
      { name:"Año Nuevo",
        fixed_date:[ 1,
          1 ] },
      { name:"Reis",
        fixed_date:[ 1,
          6 ],
        only_states:[ "Cataluña" ] },
      { name:"Epifanía del Señor",
        fixed_date:[ 1,
          6 ] },
      { name:"Día de Andalucía",
        fixed_date:[ 2,
          28 ],
        only_states:[ "Andalucía" ] },
      { name:"Dia de les Illes Balears",
        fixed_date:[ 3,
          1 ],
        only_states:[ "Islas Baleares" ] },
      { name:"Sant Josep",
        fixed_date:[ 3,
          19 ],
        only_states:[ "Comunidad Valenciana" ] },
      { name:"San José",
        fixed_date:[ 3,
          19 ],
        only_states:[ "Murcia" ] },
      { name:"Jueve Santo",
        variable_date:"easter",
        offset:-3,
        only_states:[ "Andalucía",
          "Aragón",
          "Castilla y León",
          "Castilla-La Mancha",
          "Canarias",
          "Extremadura",
          "Galicia",
          "Islas Baleares",
          "La Rioja",
          "Comunidad de Madrid",
          "Región de Murcia",
          "Navarra",
          "Asturias",
          "País Vasco",
          "Cantabria",
          "Ceuta",
          "Melilla" ] },
      { name:"Divendres Sant",
        variable_date:"easter",
        offset:-2,
        only_states:[ "Cataluña",
          "Comunidad Valenciana",
          "Islas Baleares" ] },
      { name:"Viernes Santo",
        variable_date:"easter",
        offset:-2 },
      { name:"Dilluns de Pasqua Florida",
        variable_date:"easter",
        offset:1,
        only_states:[ "Cataluña",
          "Comunidad Valenciana",
          "Islas Baleares" ] },
      { name:"Lunes de Pascua de Resurrección",
        variable_date:"easter",
        offset:1,
        only_states:[ "País Vasco",
          "Navarra" ] },
      { name:"Día de Aragón",
        fixed_date:[ 4,
          23 ],
        only_states:[ "Aragón" ] },
      { name:"Día de Castilla y León",
        fixed_date:[ 4,
          23 ],
        only_states:[ "Castilla y León" ] },
      { name:"Festa del Treball",
        fixed_date:[ 5,
          1 ],
        only_states:[ "Cataluña",
          "Comunidad Valenciana",
          "Islas Baleares" ] },
      { name:"Fiesta del Trabajo",
        fixed_date:[ 5,
          1 ] },
      { name:"Fiesta de la Comunidad de Madrid",
        fixed_date:[ 5,
          2 ],
        only_states:[ "Comunidad de Madrid" ] },
      { name:"Día das Letras Galegas",
        fixed_date:[ 5,
          2 ],
        only_states:[ "Galicia" ] },
      { name:"Día de Canarias",
        fixed_date:[ 5,
          30 ],
        only_states:[ "Canarias" ] },
      { name:"Día de la Región Castilla-La Mancha",
        fixed_date:[ 5,
          31 ],
        only_states:[ "Castilla-La Mancha" ] },
      { name:"Día de la Región de Murcia",
        fixed_date:[ 6,
          9 ],
        only_states:[ "Región de Murcia" ] },
      { name:"Día de la Rioja",
        fixed_date:[ 6,
          9 ],
        only_states:[ "La Rioja" ] },
      { name:"San Antonio",
        fixed_date:[ 6,
          13 ],
        only_states:[ "Ceuta" ] },
      { name:"Sant Joan",
        fixed_date:[ 6,
          24 ],
        only_states:[ "Cataluña" ] },
      { name:"San Juan",
        fixed_date:[ 6,
          24 ],
        only_states:[ "Ceuta" ] },
      { name:"Santiago Apóstol",
        fixed_date:[ 7,
          25 ],
        only_states:[ "Galicia" ] },
      { name:"Santa María de África",
        fixed_date:[ 8,
          6 ],
        only_states:[ "Ceuta" ] },
      { name:"l'Assumpció",
        fixed_date:[ 8,
          15 ],
        only_states:[ "Cataluña" ] },
      { name:"Asunción de la Virgen",
        fixed_date:[ 8,
          15 ] },
      { name:"Día de Ceuta",
        fixed_date:[ 9,
          2 ],
        only_states:[ "Ceuta" ] },
      { name:"Día de Asturias",
        fixed_date:[ 9,
          8 ],
        only_states:[ "Asturias" ] },
      { name:"Día de Extremadura",
        fixed_date:[ 9,
          8 ],
        only_states:[ "Extremadura" ] },
      { name:"Diada Nacional de Catalunya",
        fixed_date:[ 9,
          11 ],
        only_states:[ "Cataluña" ] },
      { name:"Día de Cantabria",
        fixed_date:[ 9,
          17 ],
        only_states:[ "Cantabria" ] },
      { name:"Día de Melilla",
        fixed_date:[ 9,
          15 ],
        only_states:[ "Melilla" ] },
      { name:"Dia de la Comunitat Valenciana",
        fixed_date:[ 10,
          9 ],
        only_states:[ "Comunidad Valenciana" ] },
      { name:"Festa Nacional d'Espanya",
        fixed_date:[ 10,
          12 ],
        only_states:[ "Cataluña" ] },
      { name:"Fiesta Nacional de España",
        fixed_date:[ 10,
          12 ] },
      { name:"Euskadi Eguna",
        fixed_date:[ 10,
          25 ],
        only_states:[ "País Vasco" ] },
      { name:"Tots Sants",
        fixed_date:[ 11,
          1 ],
        only_states:[ "Cataluña",
          "Comunidad Valenciana",
          "Islas Baleares" ] },
      { name:"Todos los Santos",
        fixed_date:[ 11,
          1 ] },
      { name:"Día de la Constitución Española",
        fixed_date:[ 12,
          6 ] },
      { name:"La Puríssima",
        fixed_date:[ 12,
          8 ],
        only_states:[ "Cataluña",
          "Comunidad Valenciana",
          "Islas Baleares" ] },
      { name:"La Immaculada Concepción",
        fixed_date:[ 12,
          8 ] },
      { name:"Nadal",
        fixed_date:[ 12,
          25 ],
        only_states:[ "Cataluña",
          "Comunidad Valenciana",
          "Islas Baleares" ] },
      { name:"Natividad del Señor",
        fixed_date:[ 12,
          25 ] },
      { name:"Sant Esteve",
        fixed_date:[ 12,
          26 ],
        only_states:[ "Cataluña" ] } ],
    "Andalucía":{ _state_code:"an" },
    "Aragón":{ _state_code:"ar" },
    "Castilla y León":{ _state_code:"cl" },
    "Castilla-La Mancha":{ _state_code:"cm" },
    Canarias:{ _state_code:"cn" },
    "Cataluña":{ _state_code:"ct" },
    Extremadura:{ _state_code:"ex" },
    Galicia:{ _state_code:"ga" },
    "Islas Baleares":{ _state_code:"ib" },
    "La Rioja":{ _state_code:"ri" },
    "Comunidad de Madrid":{ _state_code:"md" },
    "Región de Murcia":{ _state_code:"mc" },
    Navarra:{ _state_code:"nc" },
    Asturias:{ _state_code:"as" },
    "País Vasco":{ _state_code:"pv" },
    Cantabria:{ _state_code:"cb" },
    "Comunidad Valenciana":{ _state_code:"vc" },
    Ceuta:{ _state_code:"ce" },
    Melilla:{ _state_code:"ml" } };
  data$p.PH;
  data$p.Canarias;
  data$p.Extremadura;
  data$p.Galicia;
  data$p.Navarra;
  data$p.Asturias;
  data$p.Cantabria;
  data$p.Ceuta;
  data$p.Melilla;

  var data$o = { PH:[ { name:"uudenvuodenpäivä - nyårsdagen",
        fixed_date:[ 1,
          1 ] },
      { name:"loppiainen - trettondedagen",
        fixed_date:[ 1,
          6 ] },
      { name:"pitkäperjantai - långfredagen",
        variable_date:"easter",
        offset:-2 },
      { name:"pääsiäispäivä - påskdagen",
        variable_date:"easter" },
      { name:"toinen pääsiäispäivä - annandag påsk",
        variable_date:"easter",
        offset:1 },
      { name:"vappu - första maj",
        fixed_date:[ 5,
          1 ] },
      { name:"helatorstai - Kristi himmelsfärdsdag",
        variable_date:"easter",
        offset:39 },
      { name:"helluntai - pingst",
        variable_date:"easter",
        offset:49 },
      { name:"juhannuspäivä - midsommardagen",
        variable_date:"nextSaturday20Jun" },
      { name:"pyhäinpäivä - alla helgons dag",
        variable_date:"nextSaturday31Oct" },
      { name:"itsenäisyyspäivä - självständighetsdagen",
        fixed_date:[ 12,
          6 ] },
      { name:"joulupäivä - juldagen",
        fixed_date:[ 12,
          25 ] },
      { name:"toinen joulupäivä - annandag jul",
        fixed_date:[ 12,
          26 ] } ] };
  data$o.PH;

  var data$n = { PH:[ { name:"Jour de l'an",
        fixed_date:[ 1,
          1 ] },
      { name:"Vendredi saint",
        variable_date:"easter",
        offset:-2,
        only_states:[ "Moselle",
          "Bas-Rhin",
          "Haut-Rhin",
          "Guadeloupe",
          "Martinique",
          "Polynésie française" ] },
      { name:"Lundi de Pâques",
        variable_date:"easter",
        offset:1 },
      { name:"Abolition de l'esclavage (Mayotte)",
        fixed_date:[ 4,
          27 ],
        only_states:[ "Mayotte" ] },
      { name:"Saint-Pierre-Chanel",
        fixed_date:[ 4,
          28 ],
        only_states:[ "Wallis-et-Futuna" ] },
      { name:"Fête du Travail",
        fixed_date:[ 5,
          1 ] },
      { name:"Fête de la Victoire",
        fixed_date:[ 5,
          8 ] },
      { name:"Abolition de l'esclavage (Martinique)",
        fixed_date:[ 5,
          22 ],
        only_states:[ "Martinique" ] },
      { name:"Abolition de l'esclavage (Guadeloupe)",
        fixed_date:[ 5,
          27 ],
        only_states:[ "Guadeloupe" ] },
      { name:"Abolition de l'esclavage (Saint-Martin)",
        fixed_date:[ 5,
          28 ],
        only_states:[ "Saint-Martin (France)" ] },
      { name:"Jeudi de l'Ascension",
        variable_date:"easter",
        offset:39 },
      { name:"Lundi de Pentecôte",
        variable_date:"easter",
        offset:50 },
      { name:"Abolition de l'esclavage (Guyane)",
        fixed_date:[ 6,
          10 ],
        only_states:[ "Guyane" ] },
      { name:"Fête de l'autonomie",
        fixed_date:[ 6,
          29 ],
        only_states:[ "Polynésie française" ] },
      { name:"Fête nationale",
        fixed_date:[ 7,
          14 ] },
      { name:"Fête Victor Schoelcher",
        fixed_date:[ 7,
          21 ],
        only_states:[ "Guadeloupe",
          "Martinique" ] },
      { name:"Fête du Territoire",
        fixed_date:[ 7,
          29 ],
        only_states:[ "Wallis-et-Futuna" ] },
      { name:"Assomption",
        fixed_date:[ 8,
          15 ] },
      { name:"Fête de la citoyenneté",
        fixed_date:[ 9,
          24 ],
        only_states:[ "Nouvelle-Calédonie" ] },
      { name:"Abolition de l'esclavage (Saint-Barthélemy)",
        fixed_date:[ 10,
          9 ],
        only_states:[ "Saint-Barthélemy" ] },
      { name:"Toussaint",
        fixed_date:[ 11,
          1 ] },
      { name:"Armistice",
        fixed_date:[ 11,
          11 ] },
      { name:"Abolition de l'esclavage (Réunion)",
        fixed_date:[ 12,
          20 ],
        only_states:[ "Réunion" ] },
      { name:"Noël",
        fixed_date:[ 12,
          25 ] },
      { name:"Saint-Étienne ",
        fixed_date:[ 12,
          26 ],
        only_states:[ "Moselle",
          "Bas-Rhin",
          "Haut-Rhin" ] } ],
    "Auvergne-Rhône-Alpes":{ _state_code:"ara",
      SH:[ { 2018:[ 2,
            11,
            2,
            25 ],
          2019:[ 2,
            17,
            3,
            3 ],
          2020:[ 2,
            23,
            3,
            8 ],
          2021:[ 2,
            7,
            2,
            21 ],
          2022:[ 2,
            12,
            2,
            27 ],
          2023:[ 2,
            4,
            2,
            19 ],
          2024:[ 2,
            17,
            3,
            3 ],
          2025:[ 2,
            22,
            3,
            9 ],
          name:"Vacances d'Hiver" },
        { 2018:[ 4,
            8,
            4,
            22 ],
          2019:[ 4,
            14,
            4,
            28 ],
          2020:[ 4,
            19,
            5,
            3 ],
          2021:[ 4,
            11,
            4,
            25 ],
          2022:[ 4,
            16,
            5,
            1 ],
          2023:[ 4,
            8,
            4,
            23 ],
          2024:[ 4,
            13,
            4,
            28 ],
          2025:[ 4,
            19,
            5,
            4 ],
          name:"Vacances de Printemps" },
        { 2018:[ 5,
            10,
            5,
            10 ],
          2019:[ 5,
            30,
            6,
            2 ],
          2020:[ 5,
            21,
            5,
            24 ],
          2021:[ 5,
            14,
            5,
            16 ],
          2022:[ 5,
            26,
            5,
            27 ],
          2023:[ 5,
            17,
            5,
            21 ],
          2024:[ 5,
            8,
            5,
            12 ],
          2025:[ 2,
            18,
            6,
            1 ],
          name:"Pont de l'Ascension" },
        { 2018:[ 7,
            8,
            9,
            2 ],
          2019:[ 7,
            7,
            9,
            1 ],
          2020:[ 7,
            5,
            8,
            31 ],
          2021:[ 7,
            5,
            9,
            1 ],
          2022:[ 7,
            7,
            8,
            31 ],
          2023:[ 7,
            8,
            9,
            3 ],
          2024:[ 7,
            6,
            9,
            1 ],
          2025:[ 7,
            5,
            8,
            31 ],
          name:"Vacances d'Été" },
        { 2018:[ 10,
            21,
            11,
            4 ],
          2019:[ 10,
            20,
            11,
            3 ],
          2020:[ 10,
            18,
            11,
            1 ],
          2021:[ 10,
            24,
            11,
            7 ],
          2022:[ 10,
            22,
            11,
            6 ],
          2023:[ 10,
            21,
            11,
            5 ],
          2024:[ 10,
            19,
            11,
            3 ],
          2025:[ 10,
            18,
            11,
            2 ],
          name:"Vacances de la Toussaint" },
        { 2018:[ 12,
            23,
            1,
            6 ],
          2019:[ 12,
            22,
            1,
            5 ],
          2020:[ 12,
            20,
            1,
            3 ],
          2021:[ 12,
            19,
            1,
            2 ],
          2022:[ 12,
            17,
            1,
            2 ],
          2023:[ 12,
            23,
            1,
            7 ],
          2024:[ 12,
            21,
            1,
            5 ],
          2025:[ 12,
            20,
            1,
            4 ],
          name:"Vacances de Noël" } ] },
    "Bourgogne-Franche-Comté":{ _state_code:"bfc",
      SH:[ { 2018:[ 2,
            11,
            2,
            25 ],
          2019:[ 2,
            17,
            3,
            3 ],
          2020:[ 2,
            23,
            3,
            8 ],
          2021:[ 2,
            7,
            2,
            21 ],
          2022:[ 2,
            12,
            2,
            27 ],
          2023:[ 2,
            4,
            2,
            19 ],
          2024:[ 2,
            17,
            3,
            3 ],
          2025:[ 2,
            22,
            3,
            9 ],
          name:"Vacances d'Hiver" },
        { 2018:[ 4,
            8,
            4,
            22 ],
          2019:[ 4,
            14,
            4,
            28 ],
          2020:[ 4,
            19,
            5,
            3 ],
          2021:[ 4,
            11,
            4,
            25 ],
          2022:[ 4,
            16,
            5,
            1 ],
          2023:[ 4,
            8,
            4,
            23 ],
          2024:[ 4,
            13,
            4,
            28 ],
          2025:[ 4,
            19,
            5,
            4 ],
          name:"Vacances de Printemps" },
        { 2018:[ 5,
            10,
            5,
            10 ],
          2019:[ 5,
            30,
            6,
            2 ],
          2020:[ 5,
            21,
            5,
            24 ],
          2021:[ 5,
            14,
            5,
            16 ],
          2022:[ 5,
            26,
            5,
            27 ],
          2023:[ 5,
            17,
            5,
            21 ],
          2024:[ 5,
            8,
            5,
            12 ],
          2025:[ 2,
            18,
            6,
            1 ],
          name:"Pont de l'Ascension" },
        { 2018:[ 7,
            8,
            9,
            2 ],
          2019:[ 7,
            7,
            9,
            1 ],
          2020:[ 7,
            5,
            8,
            31 ],
          2021:[ 7,
            5,
            9,
            1 ],
          2022:[ 7,
            7,
            8,
            31 ],
          2023:[ 7,
            8,
            9,
            3 ],
          2024:[ 7,
            6,
            9,
            1 ],
          2025:[ 7,
            5,
            8,
            31 ],
          name:"Vacances d'Été" },
        { 2018:[ 10,
            21,
            11,
            4 ],
          2019:[ 10,
            20,
            11,
            3 ],
          2020:[ 10,
            18,
            11,
            1 ],
          2021:[ 10,
            24,
            11,
            7 ],
          2022:[ 10,
            22,
            11,
            6 ],
          2023:[ 10,
            21,
            11,
            5 ],
          2024:[ 10,
            19,
            11,
            3 ],
          2025:[ 10,
            18,
            11,
            2 ],
          name:"Vacances de la Toussaint" },
        { 2018:[ 12,
            23,
            1,
            6 ],
          2019:[ 12,
            22,
            1,
            5 ],
          2020:[ 12,
            20,
            1,
            3 ],
          2021:[ 12,
            19,
            1,
            2 ],
          2022:[ 12,
            17,
            1,
            2 ],
          2023:[ 12,
            23,
            1,
            7 ],
          2024:[ 12,
            21,
            1,
            5 ],
          2025:[ 12,
            20,
            1,
            4 ],
          name:"Vacances de Noël" } ] },
    "Nouvelle-Aquitaine":{ _state_code:"naq",
      SH:[ { 2018:[ 2,
            11,
            2,
            25 ],
          2019:[ 2,
            17,
            3,
            3 ],
          2020:[ 2,
            23,
            3,
            8 ],
          2021:[ 2,
            7,
            2,
            21 ],
          2022:[ 2,
            12,
            2,
            27 ],
          2023:[ 2,
            4,
            2,
            19 ],
          2024:[ 2,
            17,
            3,
            3 ],
          2025:[ 2,
            22,
            3,
            9 ],
          name:"Vacances d'Hiver" },
        { 2018:[ 4,
            8,
            4,
            22 ],
          2019:[ 4,
            14,
            4,
            28 ],
          2020:[ 4,
            19,
            5,
            3 ],
          2021:[ 4,
            11,
            4,
            25 ],
          2022:[ 4,
            16,
            5,
            1 ],
          2023:[ 4,
            8,
            4,
            23 ],
          2024:[ 4,
            13,
            4,
            28 ],
          2025:[ 4,
            19,
            5,
            4 ],
          name:"Vacances de Printemps" },
        { 2018:[ 5,
            10,
            5,
            10 ],
          2019:[ 5,
            30,
            6,
            2 ],
          2020:[ 5,
            21,
            5,
            24 ],
          2021:[ 5,
            14,
            5,
            16 ],
          2022:[ 5,
            26,
            5,
            27 ],
          2023:[ 5,
            17,
            5,
            21 ],
          2024:[ 5,
            8,
            5,
            12 ],
          2025:[ 2,
            18,
            6,
            1 ],
          name:"Pont de l'Ascension" },
        { 2018:[ 7,
            8,
            9,
            2 ],
          2019:[ 7,
            7,
            9,
            1 ],
          2020:[ 7,
            5,
            8,
            31 ],
          2021:[ 7,
            5,
            9,
            1 ],
          2022:[ 7,
            7,
            8,
            31 ],
          2023:[ 7,
            8,
            9,
            3 ],
          2024:[ 7,
            6,
            9,
            1 ],
          2025:[ 7,
            5,
            8,
            31 ],
          name:"Vacances d'Été" },
        { 2018:[ 10,
            21,
            11,
            4 ],
          2019:[ 10,
            20,
            11,
            3 ],
          2020:[ 10,
            18,
            11,
            1 ],
          2021:[ 10,
            24,
            11,
            7 ],
          2022:[ 10,
            22,
            11,
            6 ],
          2023:[ 10,
            21,
            11,
            5 ],
          2024:[ 10,
            19,
            11,
            3 ],
          2025:[ 10,
            18,
            11,
            2 ],
          name:"Vacances de la Toussaint" },
        { 2018:[ 12,
            23,
            1,
            6 ],
          2019:[ 12,
            22,
            1,
            5 ],
          2020:[ 12,
            20,
            1,
            3 ],
          2021:[ 12,
            19,
            1,
            2 ],
          2022:[ 12,
            17,
            1,
            2 ],
          2023:[ 12,
            23,
            1,
            7 ],
          2024:[ 12,
            21,
            1,
            5 ],
          2025:[ 12,
            20,
            1,
            4 ],
          name:"Vacances de Noël" } ] },
    Bretagne:{ _state_code:"bre",
      SH:[ { 2018:[ 2,
            25,
            3,
            11 ],
          2019:[ 2,
            10,
            2,
            24 ],
          2020:[ 2,
            16,
            3,
            1 ],
          2021:[ 2,
            21,
            3,
            7 ],
          2022:[ 2,
            5,
            2,
            20 ],
          2023:[ 2,
            11,
            2,
            26 ],
          2024:[ 2,
            24,
            3,
            10 ],
          2025:[ 2,
            8,
            2,
            23 ],
          name:"Vacances d'Hiver" },
        { 2018:[ 4,
            22,
            5,
            6 ],
          2019:[ 4,
            7,
            4,
            22 ],
          2020:[ 4,
            12,
            4,
            26 ],
          2021:[ 4,
            11,
            4,
            25 ],
          2022:[ 4,
            9,
            4,
            24 ],
          2023:[ 4,
            15,
            5,
            1 ],
          2024:[ 4,
            20,
            5,
            5 ],
          2025:[ 4,
            5,
            4,
            21 ],
          name:"Vacances de Printemps" },
        { 2018:[ 5,
            10,
            5,
            10 ],
          2019:[ 5,
            30,
            6,
            2 ],
          2020:[ 5,
            21,
            5,
            24 ],
          2021:[ 5,
            14,
            5,
            16 ],
          2022:[ 5,
            26,
            5,
            27 ],
          2023:[ 5,
            17,
            5,
            21 ],
          2024:[ 5,
            8,
            5,
            12 ],
          2025:[ 2,
            18,
            6,
            1 ],
          name:"Pont de l'Ascension" },
        { 2018:[ 7,
            8,
            9,
            2 ],
          2019:[ 7,
            7,
            9,
            1 ],
          2020:[ 7,
            5,
            8,
            31 ],
          2021:[ 7,
            5,
            9,
            1 ],
          2022:[ 7,
            7,
            8,
            31 ],
          2023:[ 7,
            8,
            9,
            3 ],
          2024:[ 7,
            6,
            9,
            1 ],
          2025:[ 7,
            5,
            8,
            31 ],
          name:"Vacances d'Été" },
        { 2018:[ 10,
            21,
            11,
            4 ],
          2019:[ 10,
            20,
            11,
            3 ],
          2020:[ 10,
            18,
            11,
            1 ],
          2021:[ 10,
            24,
            11,
            7 ],
          2022:[ 10,
            22,
            11,
            6 ],
          2023:[ 10,
            21,
            11,
            5 ],
          2024:[ 10,
            19,
            11,
            3 ],
          2025:[ 10,
            18,
            11,
            2 ],
          name:"Vacances de la Toussaint" },
        { 2018:[ 12,
            23,
            1,
            6 ],
          2019:[ 12,
            22,
            1,
            5 ],
          2020:[ 12,
            20,
            1,
            3 ],
          2021:[ 12,
            19,
            1,
            2 ],
          2022:[ 12,
            17,
            1,
            2 ],
          2023:[ 12,
            23,
            1,
            7 ],
          2024:[ 12,
            21,
            1,
            5 ],
          2025:[ 12,
            20,
            1,
            4 ],
          name:"Vacances de Noël" } ] },
    "Centre-Val de Loire":{ _state_code:"cvl",
      SH:[ { 2018:[ 2,
            25,
            3,
            11 ],
          2019:[ 2,
            10,
            2,
            24 ],
          2020:[ 2,
            16,
            3,
            1 ],
          2021:[ 2,
            21,
            3,
            7 ],
          2022:[ 2,
            5,
            2,
            20 ],
          2023:[ 2,
            11,
            2,
            26 ],
          2024:[ 2,
            24,
            3,
            10 ],
          2025:[ 2,
            8,
            2,
            23 ],
          name:"Vacances d'Hiver" },
        { 2018:[ 4,
            22,
            5,
            6 ],
          2019:[ 4,
            7,
            4,
            22 ],
          2020:[ 4,
            12,
            4,
            26 ],
          2021:[ 4,
            11,
            4,
            25 ],
          2022:[ 4,
            9,
            4,
            24 ],
          2023:[ 4,
            15,
            5,
            1 ],
          2024:[ 4,
            20,
            5,
            5 ],
          2025:[ 4,
            5,
            4,
            21 ],
          name:"Vacances de Printemps" },
        { 2018:[ 5,
            10,
            5,
            10 ],
          2019:[ 5,
            30,
            6,
            2 ],
          2020:[ 5,
            21,
            5,
            24 ],
          2021:[ 5,
            14,
            5,
            16 ],
          2022:[ 5,
            26,
            5,
            27 ],
          2023:[ 5,
            17,
            5,
            21 ],
          2024:[ 5,
            8,
            5,
            12 ],
          2025:[ 2,
            18,
            6,
            1 ],
          name:"Pont de l'Ascension" },
        { 2018:[ 7,
            8,
            9,
            2 ],
          2019:[ 7,
            7,
            9,
            1 ],
          2020:[ 7,
            5,
            8,
            31 ],
          2021:[ 7,
            5,
            9,
            1 ],
          2022:[ 7,
            7,
            8,
            31 ],
          2023:[ 7,
            8,
            9,
            3 ],
          2024:[ 7,
            6,
            9,
            1 ],
          2025:[ 7,
            5,
            8,
            31 ],
          name:"Vacances d'Été" },
        { 2018:[ 10,
            21,
            11,
            4 ],
          2019:[ 10,
            20,
            11,
            3 ],
          2020:[ 10,
            18,
            11,
            1 ],
          2021:[ 10,
            24,
            11,
            7 ],
          2022:[ 10,
            22,
            11,
            6 ],
          2023:[ 10,
            21,
            11,
            5 ],
          2024:[ 10,
            19,
            11,
            3 ],
          2025:[ 10,
            18,
            11,
            2 ],
          name:"Vacances de la Toussaint" },
        { 2018:[ 12,
            23,
            1,
            6 ],
          2019:[ 12,
            22,
            1,
            5 ],
          2020:[ 12,
            20,
            1,
            3 ],
          2021:[ 12,
            19,
            1,
            2 ],
          2022:[ 12,
            17,
            1,
            2 ],
          2023:[ 12,
            23,
            1,
            7 ],
          2024:[ 12,
            21,
            1,
            5 ],
          2025:[ 12,
            20,
            1,
            4 ],
          name:"Vacances de Noël" } ] },
    "Grand Est":{ _state_code:"ges",
      SH:[ { 2018:[ 2,
            25,
            3,
            11 ],
          2019:[ 2,
            10,
            2,
            24 ],
          2020:[ 2,
            16,
            3,
            1 ],
          2021:[ 2,
            21,
            3,
            7 ],
          2022:[ 2,
            5,
            2,
            20 ],
          2023:[ 2,
            11,
            2,
            26 ],
          2024:[ 2,
            24,
            3,
            10 ],
          2025:[ 2,
            8,
            2,
            23 ],
          name:"Vacances d'Hiver" },
        { 2018:[ 4,
            22,
            5,
            6 ],
          2019:[ 4,
            7,
            4,
            22 ],
          2020:[ 4,
            12,
            4,
            26 ],
          2021:[ 4,
            11,
            4,
            25 ],
          2022:[ 4,
            9,
            4,
            24 ],
          2023:[ 4,
            15,
            5,
            1 ],
          2024:[ 4,
            20,
            5,
            5 ],
          2025:[ 4,
            5,
            4,
            21 ],
          name:"Vacances de Printemps" },
        { 2018:[ 5,
            10,
            5,
            10 ],
          2019:[ 5,
            30,
            6,
            2 ],
          2020:[ 5,
            21,
            5,
            24 ],
          2021:[ 5,
            14,
            5,
            16 ],
          2022:[ 5,
            26,
            5,
            27 ],
          2023:[ 5,
            17,
            5,
            21 ],
          2024:[ 5,
            8,
            5,
            12 ],
          2025:[ 2,
            18,
            6,
            1 ],
          name:"Pont de l'Ascension" },
        { 2018:[ 7,
            8,
            9,
            2 ],
          2019:[ 7,
            7,
            9,
            1 ],
          2020:[ 7,
            5,
            8,
            31 ],
          2021:[ 7,
            5,
            9,
            1 ],
          2022:[ 7,
            7,
            8,
            31 ],
          2023:[ 7,
            8,
            9,
            3 ],
          2024:[ 7,
            6,
            9,
            1 ],
          2025:[ 7,
            5,
            8,
            31 ],
          name:"Vacances d'Été" },
        { 2018:[ 10,
            21,
            11,
            4 ],
          2019:[ 10,
            20,
            11,
            3 ],
          2020:[ 10,
            18,
            11,
            1 ],
          2021:[ 10,
            24,
            11,
            7 ],
          2022:[ 10,
            22,
            11,
            6 ],
          2023:[ 10,
            21,
            11,
            5 ],
          2024:[ 10,
            19,
            11,
            3 ],
          2025:[ 10,
            18,
            11,
            2 ],
          name:"Vacances de la Toussaint" },
        { 2018:[ 12,
            23,
            1,
            6 ],
          2019:[ 12,
            22,
            1,
            5 ],
          2020:[ 12,
            20,
            1,
            3 ],
          2021:[ 12,
            19,
            1,
            2 ],
          2022:[ 12,
            17,
            1,
            2 ],
          2023:[ 12,
            23,
            1,
            7 ],
          2024:[ 12,
            21,
            1,
            5 ],
          2025:[ 12,
            20,
            1,
            4 ],
          name:"Vacances de Noël" } ] },
    "Hauts-de-France":{ _state_code:"hdf",
      SH:[ { 2018:[ 2,
            25,
            3,
            11 ],
          2019:[ 2,
            10,
            2,
            24 ],
          2020:[ 2,
            16,
            3,
            1 ],
          2021:[ 2,
            21,
            3,
            7 ],
          2022:[ 2,
            5,
            2,
            20 ],
          2023:[ 2,
            11,
            2,
            26 ],
          2024:[ 2,
            24,
            3,
            10 ],
          2025:[ 2,
            8,
            2,
            23 ],
          name:"Vacances d'Hiver" },
        { 2018:[ 4,
            22,
            5,
            6 ],
          2019:[ 4,
            7,
            4,
            22 ],
          2020:[ 4,
            12,
            4,
            26 ],
          2021:[ 4,
            11,
            4,
            25 ],
          2022:[ 4,
            9,
            4,
            24 ],
          2023:[ 4,
            15,
            5,
            1 ],
          2024:[ 4,
            20,
            5,
            5 ],
          2025:[ 4,
            5,
            4,
            21 ],
          name:"Vacances de Printemps" },
        { 2018:[ 5,
            10,
            5,
            10 ],
          2019:[ 5,
            30,
            6,
            2 ],
          2020:[ 5,
            21,
            5,
            24 ],
          2021:[ 5,
            14,
            5,
            16 ],
          2022:[ 5,
            26,
            5,
            27 ],
          2023:[ 5,
            17,
            5,
            21 ],
          2024:[ 5,
            8,
            5,
            12 ],
          2025:[ 2,
            18,
            6,
            1 ],
          name:"Pont de l'Ascension" },
        { 2018:[ 7,
            8,
            9,
            2 ],
          2019:[ 7,
            7,
            9,
            1 ],
          2020:[ 7,
            5,
            8,
            31 ],
          2021:[ 7,
            5,
            9,
            1 ],
          2022:[ 7,
            7,
            8,
            31 ],
          2023:[ 7,
            8,
            9,
            3 ],
          2024:[ 7,
            6,
            9,
            1 ],
          2025:[ 7,
            5,
            8,
            31 ],
          name:"Vacances d'Été" },
        { 2018:[ 10,
            21,
            11,
            4 ],
          2019:[ 10,
            20,
            11,
            3 ],
          2020:[ 10,
            18,
            11,
            1 ],
          2021:[ 10,
            24,
            11,
            7 ],
          2022:[ 10,
            22,
            11,
            6 ],
          2023:[ 10,
            21,
            11,
            5 ],
          2024:[ 10,
            19,
            11,
            3 ],
          2025:[ 10,
            18,
            11,
            2 ],
          name:"Vacances de la Toussaint" },
        { 2018:[ 12,
            23,
            1,
            6 ],
          2019:[ 12,
            22,
            1,
            5 ],
          2020:[ 12,
            20,
            1,
            3 ],
          2021:[ 12,
            19,
            1,
            2 ],
          2022:[ 12,
            17,
            1,
            2 ],
          2023:[ 12,
            23,
            1,
            7 ],
          2024:[ 12,
            21,
            1,
            5 ],
          2025:[ 12,
            20,
            1,
            4 ],
          name:"Vacances de Noël" } ] },
    Normandie:{ _state_code:"nor",
      SH:[ { 2018:[ 2,
            25,
            3,
            11 ],
          2019:[ 2,
            10,
            2,
            24 ],
          2020:[ 2,
            16,
            3,
            1 ],
          2021:[ 2,
            21,
            3,
            7 ],
          2022:[ 2,
            5,
            2,
            20 ],
          2023:[ 2,
            11,
            2,
            26 ],
          2024:[ 2,
            24,
            3,
            10 ],
          2025:[ 2,
            8,
            2,
            23 ],
          name:"Vacances d'Hiver" },
        { 2018:[ 4,
            22,
            5,
            6 ],
          2019:[ 4,
            7,
            4,
            22 ],
          2020:[ 4,
            12,
            4,
            26 ],
          2021:[ 4,
            11,
            4,
            25 ],
          2022:[ 4,
            9,
            4,
            24 ],
          2023:[ 4,
            15,
            5,
            1 ],
          2024:[ 4,
            20,
            5,
            5 ],
          2025:[ 4,
            5,
            4,
            21 ],
          name:"Vacances de Printemps" },
        { 2018:[ 5,
            10,
            5,
            10 ],
          2019:[ 5,
            30,
            6,
            2 ],
          2020:[ 5,
            21,
            5,
            24 ],
          2021:[ 5,
            14,
            5,
            16 ],
          2022:[ 5,
            26,
            5,
            27 ],
          2023:[ 5,
            17,
            5,
            21 ],
          2024:[ 5,
            8,
            5,
            12 ],
          2025:[ 2,
            18,
            6,
            1 ],
          name:"Pont de l'Ascension" },
        { 2018:[ 7,
            8,
            9,
            2 ],
          2019:[ 7,
            7,
            9,
            1 ],
          2020:[ 7,
            5,
            8,
            31 ],
          2021:[ 7,
            5,
            9,
            1 ],
          2022:[ 7,
            7,
            8,
            31 ],
          2023:[ 7,
            8,
            9,
            3 ],
          2024:[ 7,
            6,
            9,
            1 ],
          2025:[ 7,
            5,
            8,
            31 ],
          name:"Vacances d'Été" },
        { 2018:[ 10,
            21,
            11,
            4 ],
          2019:[ 10,
            20,
            11,
            3 ],
          2020:[ 10,
            18,
            11,
            1 ],
          2021:[ 10,
            24,
            11,
            7 ],
          2022:[ 10,
            22,
            11,
            6 ],
          2023:[ 10,
            21,
            11,
            5 ],
          2024:[ 10,
            19,
            11,
            3 ],
          2025:[ 10,
            18,
            11,
            2 ],
          name:"Vacances de la Toussaint" },
        { 2018:[ 12,
            23,
            1,
            6 ],
          2019:[ 12,
            22,
            1,
            5 ],
          2020:[ 12,
            20,
            1,
            3 ],
          2021:[ 12,
            19,
            1,
            2 ],
          2022:[ 12,
            17,
            1,
            2 ],
          2023:[ 12,
            23,
            1,
            7 ],
          2024:[ 12,
            21,
            1,
            5 ],
          2025:[ 12,
            20,
            1,
            4 ],
          name:"Vacances de Noël" } ] },
    "Pays de la Loire":{ _state_code:"pdl",
      SH:[ { 2018:[ 2,
            25,
            3,
            11 ],
          2019:[ 2,
            10,
            2,
            24 ],
          2020:[ 2,
            16,
            3,
            1 ],
          2021:[ 2,
            21,
            3,
            7 ],
          2022:[ 2,
            5,
            2,
            20 ],
          2023:[ 2,
            11,
            2,
            26 ],
          2024:[ 2,
            24,
            3,
            10 ],
          2025:[ 2,
            8,
            2,
            23 ],
          name:"Vacances d'Hiver" },
        { 2018:[ 4,
            22,
            5,
            6 ],
          2019:[ 4,
            7,
            4,
            22 ],
          2020:[ 4,
            12,
            4,
            26 ],
          2021:[ 4,
            11,
            4,
            25 ],
          2022:[ 4,
            9,
            4,
            24 ],
          2023:[ 4,
            15,
            5,
            1 ],
          2024:[ 4,
            20,
            5,
            5 ],
          2025:[ 4,
            5,
            4,
            21 ],
          name:"Vacances de Printemps" },
        { 2018:[ 5,
            10,
            5,
            10 ],
          2019:[ 5,
            30,
            6,
            2 ],
          2020:[ 5,
            21,
            5,
            24 ],
          2021:[ 5,
            14,
            5,
            16 ],
          2022:[ 5,
            26,
            5,
            27 ],
          2023:[ 5,
            17,
            5,
            21 ],
          2024:[ 5,
            8,
            5,
            12 ],
          2025:[ 2,
            18,
            6,
            1 ],
          name:"Pont de l'Ascension" },
        { 2018:[ 7,
            8,
            9,
            2 ],
          2019:[ 7,
            7,
            9,
            1 ],
          2020:[ 7,
            5,
            8,
            31 ],
          2021:[ 7,
            5,
            9,
            1 ],
          2022:[ 7,
            7,
            8,
            31 ],
          2023:[ 7,
            8,
            9,
            3 ],
          2024:[ 7,
            6,
            9,
            1 ],
          2025:[ 7,
            5,
            8,
            31 ],
          name:"Vacances d'Été" },
        { 2018:[ 10,
            21,
            11,
            4 ],
          2019:[ 10,
            20,
            11,
            3 ],
          2020:[ 10,
            18,
            11,
            1 ],
          2021:[ 10,
            24,
            11,
            7 ],
          2022:[ 10,
            22,
            11,
            6 ],
          2023:[ 10,
            21,
            11,
            5 ],
          2024:[ 10,
            19,
            11,
            3 ],
          2025:[ 10,
            18,
            11,
            2 ],
          name:"Vacances de la Toussaint" },
        { 2018:[ 12,
            23,
            1,
            6 ],
          2019:[ 12,
            22,
            1,
            5 ],
          2020:[ 12,
            20,
            1,
            3 ],
          2021:[ 12,
            19,
            1,
            2 ],
          2022:[ 12,
            17,
            1,
            2 ],
          2023:[ 12,
            23,
            1,
            7 ],
          2024:[ 12,
            21,
            1,
            5 ],
          2025:[ 12,
            20,
            1,
            4 ],
          name:"Vacances de Noël" } ] },
    "Provence-Alpes-Côte d'Azur":{ _state_code:"pac",
      SH:[ { 2018:[ 2,
            25,
            3,
            11 ],
          2019:[ 2,
            10,
            2,
            24 ],
          2020:[ 2,
            16,
            3,
            1 ],
          2021:[ 2,
            21,
            3,
            7 ],
          2022:[ 2,
            5,
            2,
            20 ],
          2023:[ 2,
            11,
            2,
            26 ],
          2024:[ 2,
            24,
            3,
            10 ],
          2025:[ 2,
            8,
            2,
            23 ],
          name:"Vacances d'Hiver" },
        { 2018:[ 4,
            22,
            5,
            6 ],
          2019:[ 4,
            7,
            4,
            22 ],
          2020:[ 4,
            12,
            4,
            26 ],
          2021:[ 4,
            11,
            4,
            25 ],
          2022:[ 4,
            9,
            4,
            24 ],
          2023:[ 4,
            15,
            5,
            1 ],
          2024:[ 4,
            20,
            5,
            5 ],
          2025:[ 4,
            5,
            4,
            21 ],
          name:"Vacances de Printemps" },
        { 2018:[ 5,
            10,
            5,
            10 ],
          2019:[ 5,
            30,
            6,
            2 ],
          2020:[ 5,
            21,
            5,
            24 ],
          2021:[ 5,
            14,
            5,
            16 ],
          2022:[ 5,
            26,
            5,
            27 ],
          2023:[ 5,
            17,
            5,
            21 ],
          2024:[ 5,
            8,
            5,
            12 ],
          2025:[ 2,
            18,
            6,
            1 ],
          name:"Pont de l'Ascension" },
        { 2018:[ 7,
            8,
            9,
            2 ],
          2019:[ 7,
            7,
            9,
            1 ],
          2020:[ 7,
            5,
            8,
            31 ],
          2021:[ 7,
            5,
            9,
            1 ],
          2022:[ 7,
            7,
            8,
            31 ],
          2023:[ 7,
            8,
            9,
            3 ],
          2024:[ 7,
            6,
            9,
            1 ],
          2025:[ 7,
            5,
            8,
            31 ],
          name:"Vacances d'Été" },
        { 2018:[ 10,
            21,
            11,
            4 ],
          2019:[ 10,
            20,
            11,
            3 ],
          2020:[ 10,
            18,
            11,
            1 ],
          2021:[ 10,
            24,
            11,
            7 ],
          2022:[ 10,
            22,
            11,
            6 ],
          2023:[ 10,
            21,
            11,
            5 ],
          2024:[ 10,
            19,
            11,
            3 ],
          2025:[ 10,
            18,
            11,
            2 ],
          name:"Vacances de la Toussaint" },
        { 2018:[ 12,
            23,
            1,
            6 ],
          2019:[ 12,
            22,
            1,
            5 ],
          2020:[ 12,
            20,
            1,
            3 ],
          2021:[ 12,
            19,
            1,
            2 ],
          2022:[ 12,
            17,
            1,
            2 ],
          2023:[ 12,
            23,
            1,
            7 ],
          2024:[ 12,
            21,
            1,
            5 ],
          2025:[ 12,
            20,
            1,
            4 ],
          name:"Vacances de Noël" } ] },
    "Île-de-France":{ _state_code:"idf",
      SH:[ { 2018:[ 2,
            18,
            3,
            4 ],
          2019:[ 2,
            24,
            3,
            10 ],
          2020:[ 2,
            9,
            2,
            23 ],
          2021:[ 2,
            14,
            2,
            28 ],
          2022:[ 2,
            19,
            3,
            6 ],
          2023:[ 2,
            18,
            3,
            5 ],
          2024:[ 2,
            10,
            2,
            25 ],
          2025:[ 2,
            15,
            3,
            2 ],
          name:"Vacances d'Hiver" },
        { 2018:[ 4,
            15,
            4,
            29 ],
          2019:[ 4,
            21,
            5,
            5 ],
          2020:[ 4,
            5,
            4,
            19 ],
          2021:[ 4,
            11,
            4,
            25 ],
          2022:[ 4,
            23,
            5,
            8 ],
          2023:[ 4,
            22,
            5,
            8 ],
          2024:[ 4,
            6,
            4,
            21 ],
          2025:[ 4,
            12,
            4,
            27 ],
          name:"Vacances de Printemps" },
        { 2018:[ 5,
            10,
            5,
            10 ],
          2019:[ 5,
            30,
            6,
            2 ],
          2020:[ 5,
            21,
            5,
            24 ],
          2021:[ 5,
            14,
            5,
            16 ],
          2022:[ 5,
            26,
            5,
            27 ],
          2023:[ 5,
            17,
            5,
            21 ],
          2024:[ 5,
            8,
            5,
            12 ],
          2025:[ 2,
            18,
            6,
            1 ],
          name:"Pont de l'Ascension" },
        { 2018:[ 7,
            8,
            9,
            2 ],
          2019:[ 7,
            7,
            9,
            1 ],
          2020:[ 7,
            5,
            8,
            31 ],
          2021:[ 7,
            5,
            9,
            1 ],
          2022:[ 7,
            7,
            8,
            31 ],
          2023:[ 7,
            8,
            9,
            3 ],
          2024:[ 7,
            6,
            9,
            1 ],
          2025:[ 7,
            5,
            8,
            31 ],
          name:"Vacances d'Été" },
        { 2018:[ 10,
            21,
            11,
            4 ],
          2019:[ 10,
            20,
            11,
            3 ],
          2020:[ 10,
            18,
            11,
            1 ],
          2021:[ 10,
            24,
            11,
            7 ],
          2022:[ 10,
            22,
            11,
            6 ],
          2023:[ 10,
            21,
            11,
            5 ],
          2024:[ 10,
            19,
            11,
            3 ],
          2025:[ 10,
            18,
            11,
            2 ],
          name:"Vacances de la Toussaint" },
        { 2018:[ 12,
            23,
            1,
            6 ],
          2019:[ 12,
            22,
            1,
            5 ],
          2020:[ 12,
            20,
            1,
            3 ],
          2021:[ 12,
            19,
            1,
            2 ],
          2022:[ 12,
            17,
            1,
            2 ],
          2023:[ 12,
            23,
            1,
            7 ],
          2024:[ 12,
            21,
            1,
            5 ],
          2025:[ 12,
            20,
            1,
            4 ],
          name:"Vacances de Noël" } ] },
    Occitanie:{ _state_code:"occ",
      SH:[ { 2018:[ 2,
            18,
            3,
            4 ],
          2019:[ 2,
            24,
            3,
            10 ],
          2020:[ 2,
            9,
            2,
            23 ],
          2021:[ 2,
            14,
            2,
            28 ],
          2022:[ 2,
            19,
            3,
            6 ],
          2023:[ 2,
            18,
            3,
            5 ],
          2024:[ 2,
            10,
            2,
            25 ],
          2025:[ 2,
            15,
            3,
            2 ],
          name:"Vacances d'Hiver" },
        { 2018:[ 4,
            15,
            4,
            29 ],
          2019:[ 4,
            21,
            5,
            5 ],
          2020:[ 4,
            5,
            4,
            19 ],
          2021:[ 4,
            11,
            4,
            25 ],
          2022:[ 4,
            23,
            5,
            8 ],
          2023:[ 4,
            22,
            5,
            8 ],
          2024:[ 4,
            6,
            4,
            21 ],
          2025:[ 4,
            12,
            4,
            27 ],
          name:"Vacances de Printemps" },
        { 2018:[ 5,
            10,
            5,
            10 ],
          2019:[ 5,
            30,
            6,
            2 ],
          2020:[ 5,
            21,
            5,
            24 ],
          2021:[ 5,
            14,
            5,
            16 ],
          2022:[ 5,
            26,
            5,
            27 ],
          2023:[ 5,
            17,
            5,
            21 ],
          2024:[ 5,
            8,
            5,
            12 ],
          2025:[ 2,
            18,
            6,
            1 ],
          name:"Pont de l'Ascension" },
        { 2018:[ 7,
            8,
            9,
            2 ],
          2019:[ 7,
            7,
            9,
            1 ],
          2020:[ 7,
            5,
            8,
            31 ],
          2021:[ 7,
            5,
            9,
            1 ],
          2022:[ 7,
            7,
            8,
            31 ],
          2023:[ 7,
            8,
            9,
            3 ],
          2024:[ 7,
            6,
            9,
            1 ],
          2025:[ 7,
            5,
            8,
            31 ],
          name:"Vacances d'Été" },
        { 2018:[ 10,
            21,
            11,
            4 ],
          2019:[ 10,
            20,
            11,
            3 ],
          2020:[ 10,
            18,
            11,
            1 ],
          2021:[ 10,
            24,
            11,
            7 ],
          2022:[ 10,
            22,
            11,
            6 ],
          2023:[ 10,
            21,
            11,
            5 ],
          2024:[ 10,
            19,
            11,
            3 ],
          2025:[ 10,
            18,
            11,
            2 ],
          name:"Vacances de la Toussaint" },
        { 2018:[ 12,
            23,
            1,
            6 ],
          2019:[ 12,
            22,
            1,
            5 ],
          2020:[ 12,
            20,
            1,
            3 ],
          2021:[ 12,
            19,
            1,
            2 ],
          2022:[ 12,
            17,
            1,
            2 ],
          2023:[ 12,
            23,
            1,
            7 ],
          2024:[ 12,
            21,
            1,
            5 ],
          2025:[ 12,
            20,
            1,
            4 ],
          name:"Vacances de Noël" } ] },
    Corse:{ _state_code:"cor",
      SH:[ { 2018:[ 2,
            27,
            3,
            11 ],
          2019:[ 2,
            24,
            3,
            10 ],
          2020:[ 2,
            16,
            3,
            1 ],
          2021:[ 2,
            14,
            2,
            28 ],
          2022:[ 2,
            19,
            3,
            6 ],
          2023:[ 2,
            18,
            3,
            5 ],
          name:"Vacances d'Hiver" },
        { 2018:[ 4,
            24,
            5,
            6 ],
          2019:[ 4,
            21,
            5,
            5 ],
          2020:[ 4,
            19,
            5,
            3 ],
          2021:[ 4,
            11,
            4,
            25 ],
          2022:[ 4,
            23,
            5,
            8 ],
          2023:[ 4,
            15,
            5,
            1 ],
          name:"Vacances de Printemps" },
        { 2018:[ 5,
            10,
            5,
            10 ],
          2019:[ 5,
            30,
            6,
            2 ],
          2020:[ 5,
            21,
            5,
            24 ],
          2021:[ 5,
            14,
            5,
            16 ],
          2023:[ 5,
            17,
            5,
            21 ],
          name:"Pont de l'Ascension" },
        { 2018:[ 7,
            11,
            9,
            4 ],
          2019:[ 7,
            7,
            9,
            2 ],
          2020:[ 7,
            5,
            8,
            31 ],
          2021:[ 7,
            8,
            8,
            30 ],
          2022:[ 7,
            8,
            8,
            31 ],
          2023:[ 7,
            8,
            9,
            3 ],
          name:"Vacances d'Été" },
        { 2018:[ 10,
            24,
            11,
            4 ],
          2019:[ 10,
            20,
            11,
            3 ],
          2020:[ 10,
            18,
            11,
            1 ],
          name:"Vacances de la Toussaint" },
        { 2018:[ 12,
            23,
            1,
            6 ],
          2019:[ 12,
            22,
            1,
            5 ],
          2020:[ 12,
            20,
            1,
            3 ],
          name:"Vacances de Noël" } ] },
    Guadeloupe:{ _state_code:"gua",
      SH:[ { 2018:[ 2,
            9,
            2,
            21 ],
          2019:[ 2,
            24,
            3,
            10 ],
          2020:[ 2,
            16,
            3,
            1 ],
          2021:[ 2,
            10,
            2,
            21 ],
          2022:[ 2,
            19,
            3,
            6 ],
          2023:[ 2,
            11,
            2,
            26 ],
          name:"Vacances de Carnaval" },
        { 2018:[ 3,
            25,
            4,
            8 ],
          2019:[ 4,
            19,
            5,
            1 ],
          2020:[ 4,
            9,
            4,
            22 ],
          2021:[ 3,
            28,
            4,
            11 ],
          2022:[ 4,
            13,
            4,
            24 ],
          2023:[ 4,
            1,
            4,
            16 ],
          name:"Vacances de Pâques" },
        { 2019:[ 5,
            30,
            6,
            2 ],
          2020:[ 5,
            21,
            5,
            24 ],
          2021:[ 5,
            28,
            5,
            29 ],
          2022:[ 5,
            27,
            5,
            27 ],
          name:"Pont de l'Ascension" },
        { 2018:[ 7,
            7,
            9,
            3 ],
          2019:[ 7,
            7,
            9,
            1 ],
          2020:[ 7,
            5,
            8,
            31 ],
          2021:[ 7,
            6,
            8,
            30 ],
          2022:[ 7,
            7,
            8,
            31 ],
          2023:[ 7,
            8,
            9,
            3 ],
          name:"Grandes Vacances" },
        { 2018:[ 10,
            21,
            11,
            4 ],
          2019:[ 10,
            20,
            11,
            3 ],
          2020:[ 10,
            18,
            11,
            2 ],
          name:"Vacances de la Toussaint" },
        { 2018:[ 12,
            23,
            1,
            6 ],
          2019:[ 12,
            22,
            1,
            5 ],
          2020:[ 12,
            20,
            1,
            3 ],
          name:"Vacances de Noël" } ] },
    "Saint-Martin (France)":{ _state_code:"mf",
      SH:[ { 2018:[ 2,
            9,
            2,
            21 ],
          2019:[ 2,
            24,
            3,
            10 ],
          2020:[ 2,
            16,
            3,
            1 ],
          2021:[ 2,
            10,
            2,
            21 ],
          2023:[ 2,
            11,
            2,
            26 ],
          name:"Vacances de Carnaval" },
        { 2018:[ 3,
            25,
            4,
            8 ],
          2019:[ 4,
            19,
            5,
            1 ],
          2020:[ 4,
            9,
            4,
            22 ],
          2021:[ 3,
            28,
            4,
            11 ],
          2023:[ 4,
            1,
            4,
            16 ],
          name:"Vacances de Pâques" },
        { 2019:[ 5,
            30,
            6,
            2 ],
          2020:[ 5,
            21,
            5,
            24 ],
          2021:[ 5,
            25,
            5,
            27 ],
          name:"Pont de l'Ascension" },
        { 2018:[ 7,
            7,
            9,
            3 ],
          2019:[ 7,
            7,
            9,
            1 ],
          2020:[ 7,
            5,
            8,
            31 ],
          2021:[ 7,
            6,
            8,
            30 ],
          2023:[ 7,
            8,
            9,
            3 ],
          name:"Grandes Vacances" },
        { 2018:[ 10,
            21,
            11,
            4 ],
          2019:[ 10,
            20,
            11,
            3 ],
          2020:[ 10,
            18,
            11,
            2 ],
          name:"Vacances de la Toussaint" },
        { 2018:[ 12,
            23,
            1,
            6 ],
          2019:[ 12,
            22,
            1,
            5 ],
          2020:[ 12,
            20,
            1,
            3 ],
          name:"Vacances de Noël" } ] },
    "Saint-Barthélemy":{ _state_code:"bl",
      SH:[ { 2018:[ 2,
            9,
            2,
            21 ],
          2019:[ 2,
            24,
            3,
            10 ],
          2020:[ 2,
            16,
            3,
            1 ],
          2021:[ 2,
            10,
            2,
            21 ],
          2023:[ 2,
            11,
            2,
            26 ],
          name:"Vacances de Carnaval" },
        { 2018:[ 3,
            25,
            4,
            8 ],
          2019:[ 4,
            19,
            5,
            1 ],
          2020:[ 4,
            9,
            4,
            22 ],
          2021:[ 3,
            28,
            4,
            11 ],
          2023:[ 4,
            1,
            4,
            16 ],
          name:"Vacances de Pâques" },
        { 2019:[ 5,
            30,
            6,
            2 ],
          2020:[ 5,
            21,
            5,
            24 ],
          name:"Pont de l'Ascension" },
        { 2018:[ 7,
            7,
            9,
            3 ],
          2019:[ 7,
            7,
            9,
            1 ],
          2020:[ 7,
            5,
            8,
            31 ],
          2021:[ 7,
            6,
            8,
            30 ],
          2023:[ 7,
            8,
            9,
            3 ],
          name:"Grandes Vacances" },
        { 2018:[ 10,
            21,
            11,
            4 ],
          2019:[ 10,
            20,
            11,
            3 ],
          2020:[ 10,
            18,
            11,
            2 ],
          name:"Vacances de la Toussaint" },
        { 2018:[ 12,
            23,
            1,
            6 ],
          2019:[ 12,
            22,
            1,
            5 ],
          2020:[ 12,
            20,
            1,
            3 ],
          name:"Vacances de Noël" } ] },
    Guyane:{ _state_code:"guf",
      SH:[ { 2018:[ 2,
            11,
            2,
            25 ],
          2019:[ 2,
            24,
            3,
            10 ],
          2020:[ 2,
            16,
            3,
            1 ],
          2021:[ 2,
            14,
            2,
            28 ],
          2022:[ 2,
            19,
            3,
            6 ],
          2023:[ 2,
            18,
            3,
            5 ],
          name:"Vacances de Carnaval" },
        { 2018:[ 3,
            30,
            4,
            15 ],
          2019:[ 4,
            19,
            5,
            1 ],
          2020:[ 4,
            10,
            4,
            26 ],
          2021:[ 4,
            2,
            4,
            18 ],
          2022:[ 4,
            14,
            5,
            1 ],
          2023:[ 4,
            5,
            4,
            19 ],
          name:"Vacances de Pâques" },
        { 2019:[ 5,
            30,
            6,
            2 ],
          2020:[ 5,
            21,
            5,
            24 ],
          2021:[ 5,
            13,
            5,
            16 ],
          2022:[ 5,
            25,
            5,
            29 ],
          2023:[ 5,
            13,
            5,
            21 ],
          name:"Pont de l'Ascension" },
        { 2018:[ 7,
            8,
            9,
            2 ],
          2019:[ 7,
            9,
            9,
            1 ],
          2020:[ 7,
            5,
            8,
            31 ],
          2021:[ 7,
            4,
            8,
            31 ],
          2022:[ 7,
            9,
            8,
            31 ],
          2023:[ 7,
            8,
            9,
            3 ],
          name:"Grandes Vacances" },
        { 2018:[ 10,
            21,
            11,
            4 ],
          2019:[ 10,
            20,
            11,
            3 ],
          2020:[ 10,
            25,
            11,
            8 ],
          name:"Vacances de la Toussaint" },
        { 2018:[ 12,
            23,
            1,
            5 ],
          2019:[ 12,
            22,
            1,
            5 ],
          2020:[ 12,
            20,
            1,
            3 ],
          name:"Vacances de Noël" } ] },
    Martinique:{ _state_code:"mtq",
      SH:[ { 2018:[ 2,
            8,
            2,
            18 ],
          2019:[ 2,
            24,
            3,
            10 ],
          2020:[ 2,
            23,
            3,
            8 ],
          2021:[ 2,
            7,
            2,
            21 ],
          2022:[ 2,
            19,
            3,
            6 ],
          2023:[ 2,
            11,
            2,
            26 ],
          name:"Vacances de Carnaval" },
        { 2018:[ 3,
            25,
            4,
            8 ],
          2019:[ 4,
            14,
            4,
            28 ],
          2020:[ 4,
            5,
            4,
            19 ],
          2021:[ 3,
            28,
            4,
            11 ],
          2022:[ 4,
            9,
            4,
            24 ],
          2023:[ 4,
            1,
            4,
            16 ],
          name:"Vacances de Pâques" },
        { 2018:[ 5,
            8,
            5,
            13 ],
          2019:[ 5,
            30,
            6,
            2 ],
          2020:[ 5,
            14,
            5,
            15 ],
          2022:[ 5,
            27,
            5,
            27 ],
          2023:[ 5,
            17,
            5,
            21 ],
          name:"Pont de l'Ascension" },
        { 2018:[ 7,
            7,
            9,
            3 ],
          2019:[ 7,
            7,
            9,
            1 ],
          2020:[ 7,
            5,
            8,
            31 ],
          2021:[ 7,
            7,
            8,
            30 ],
          2022:[ 7,
            7,
            8,
            31 ],
          2023:[ 7,
            8,
            9,
            3 ],
          name:"Grandes Vacances" },
        { 2018:[ 10,
            21,
            11,
            4 ],
          2019:[ 10,
            20,
            11,
            3 ],
          2020:[ 10,
            25,
            11,
            8 ],
          name:"Vacances de la Toussaint" },
        { 2018:[ 12,
            23,
            1,
            5 ],
          2019:[ 12,
            22,
            1,
            5 ],
          2020:[ 12,
            20,
            1,
            3 ],
          name:"Vacances de Noël" } ] },
    Mayotte:{ _state_code:"may",
      SH:[ { 2018:[ 2,
            25,
            3,
            11 ],
          2019:[ 2,
            24,
            3,
            10 ],
          2020:[ 3,
            1,
            3,
            15 ],
          2021:[ 2,
            28,
            3,
            14 ],
          2022:[ 2,
            26,
            3,
            13 ],
          2023:[ 2,
            18,
            3,
            5 ],
          name:"Vacances de Carnaval" },
        { 2018:[ 5,
            6,
            5,
            13 ],
          2019:[ 4,
            27,
            5,
            5 ],
          2020:[ 5,
            3,
            5,
            10 ],
          2021:[ 5,
            1,
            5,
            16 ],
          2022:[ 4,
            30,
            5,
            15 ],
          2023:[ 4,
            22,
            5,
            8 ],
          name:"Vacances de Pâques" },
        { 2020:[ 5,
            21,
            5,
            24 ],
          name:"Pont de l'Ascension" },
        { 2018:[ 7,
            8,
            8,
            22 ],
          2019:[ 7,
            7,
            8,
            22 ],
          2020:[ 7,
            5,
            8,
            23 ],
          2021:[ 7,
            7,
            8,
            22 ],
          2022:[ 7,
            6,
            8,
            23 ],
          2023:[ 7,
            8,
            8,
            22 ],
          name:"Grandes Vacances" },
        { 2018:[ 10,
            7,
            10,
            21 ],
          2019:[ 10,
            13,
            10,
            27 ],
          2020:[ 10,
            11,
            10,
            25 ],
          name:"Vacances de la Toussaint" },
        { 2018:[ 12,
            9,
            1,
            6 ],
          2019:[ 12,
            15,
            1,
            12 ],
          2020:[ 12,
            13,
            1,
            10 ],
          name:"Vacances de Noël" } ] },
    "La Réunion":{ _state_code:"lre",
      SH:[ { 2018:[ 3,
            11,
            3,
            25 ],
          2019:[ 3,
            10,
            3,
            24 ],
          2020:[ 3,
            8,
            3,
            22 ],
          2021:[ 3,
            7,
            3,
            21 ],
          2022:[ 3,
            12,
            3,
            27 ],
          2023:[ 3,
            11,
            3,
            26 ],
          name:"Vacances après 3ème période" },
        { 2018:[ 5,
            6,
            5,
            16 ],
          2019:[ 5,
            8,
            5,
            19 ],
          2020:[ 5,
            1,
            5,
            13 ],
          2021:[ 5,
            5,
            5,
            16 ],
          2022:[ 5,
            14,
            5,
            29 ],
          2023:[ 5,
            13,
            5,
            29 ],
          name:"Vacances après 4ème période" },
        { 2018:[ 7,
            8,
            8,
            16 ],
          2019:[ 7,
            7,
            8,
            15 ],
          2020:[ 7,
            8,
            8,
            15 ],
          2022:[ 7,
            9,
            8,
            15 ],
          2023:[ 7,
            8,
            9,
            16 ],
          name:"Vacances hiver austral" },
        { 2018:[ 10,
            14,
            10,
            28 ],
          2019:[ 10,
            13,
            10,
            27 ],
          2020:[ 10,
            11,
            11,
            25 ],
          name:"Vacances après 1ère période" },
        { 2018:[ 12,
            23,
            1,
            27 ],
          2019:[ 12,
            20,
            1,
            26 ],
          2020:[ 12,
            20,
            1,
            24 ],
          name:"Vacances été austral" } ] },
    "Nouvelle-Calédonie":{ _state_code:"nc",
      SH:[ { 2018:[ 4,
            7,
            4,
            15 ],
          2019:[ 4,
            6,
            4,
            14 ],
          2020:[ 4,
            4,
            4,
            13 ],
          2021:[ 4,
            3,
            4,
            18 ],
          2022:[ 4,
            2,
            4,
            16 ],
          2023:[ 4,
            2,
            4,
            16 ],
          name:"Vacances 1ère période" },
        { 2018:[ 6,
            9,
            6,
            24 ],
          2019:[ 6,
            8,
            6,
            23 ],
          2020:[ 6,
            6,
            6,
            21 ],
          2021:[ 6,
            5,
            6,
            20 ],
          2022:[ 6,
            4,
            6,
            18 ],
          2023:[ 4,
            2,
            4,
            16 ],
          name:"Vacances 2ème période" },
        { 2018:[ 8,
            11,
            8,
            26 ],
          2019:[ 8,
            10,
            8,
            25 ],
          2020:[ 8,
            8,
            8,
            23 ],
          2021:[ 8,
            7,
            8,
            22 ],
          2022:[ 8,
            6,
            8,
            20 ],
          2023:[ 8,
            5,
            8,
            20 ],
          name:"Vacances 3ème période" },
        { 2018:[ 10,
            13,
            10,
            18 ],
          2019:[ 10,
            12,
            10,
            27 ],
          2020:[ 10,
            10,
            10,
            25 ],
          2021:[ 10,
            9,
            10,
            24 ],
          2022:[ 10,
            8,
            10,
            22 ],
          2023:[ 10,
            7,
            10,
            22 ],
          name:"Vacances 4ème période" },
        { 2018:[ 12,
            15,
            2,
            17 ],
          2019:[ 12,
            14,
            2,
            16 ],
          2020:[ 12,
            18,
            2,
            14 ],
          2021:[ 12,
            18,
            2,
            13 ],
          2022:[ 12,
            17,
            2,
            12 ],
          2023:[ 12,
            16,
            2,
            11 ],
          name:"Vacances d'Été" } ] },
    "Polynésie française":{ _state_code:"pf",
      SH:[ { 2018:[ 2,
            18,
            2,
            25 ],
          2019:[ 2,
            17,
            2,
            24 ],
          2020:[ 2,
            16,
            2,
            23 ],
          2021:[ 2,
            21,
            2,
            28 ],
          2022:[ 2,
            19,
            2,
            27 ],
          2023:[ 2,
            19,
            2,
            25 ],
          name:"Vacances de février" },
        { 2018:[ 3,
            30,
            4,
            15 ],
          2019:[ 4,
            7,
            4,
            22 ],
          2020:[ 3,
            29,
            4,
            13 ],
          2021:[ 4,
            6,
            4,
            18 ],
          2022:[ 4,
            2,
            4,
            18 ],
          2023:[ 4,
            2,
            4,
            15 ],
          name:"Vacances d'avril" },
        { 2018:[ 5,
            20,
            5,
            27 ],
          2019:[ 5,
            26,
            6,
            2 ],
          2020:[ 5,
            17,
            5,
            24 ],
          2021:[ 5,
            25,
            5,
            30 ],
          2022:[ 5,
            21,
            5,
            29 ],
          2023:[ 5,
            21,
            5,
            26 ],
          name:"Vacances de mai" },
        { 2018:[ 7,
            7,
            8,
            15 ],
          2019:[ 7,
            7,
            8,
            13 ],
          2020:[ 7,
            5,
            8,
            9 ],
          2021:[ 7,
            3,
            8,
            8 ],
          2022:[ 7,
            2,
            8,
            7 ],
          2023:[ 7,
            2,
            8,
            6 ],
          name:"Grandes Vacances" },
        { 2018:[ 9,
            16,
            9,
            23 ],
          2019:[ 9,
            15,
            9,
            22 ],
          2020:[ 9,
            13,
            9,
            20 ],
          2021:[ 9,
            12,
            9,
            19 ],
          2022:[ 9,
            10,
            9,
            18 ],
          name:"Vacances de septembre" },
        { 2018:[ 10,
            28,
            11,
            11 ],
          2019:[ 10,
            27,
            11,
            11 ],
          2020:[ 10,
            25,
            11,
            8 ],
          2021:[ 10,
            24,
            11,
            7 ],
          2022:[ 10,
            22,
            11,
            6 ],
          name:"Vacances d'octobre-novembre" },
        { 2018:[ 12,
            16,
            1,
            13 ],
          2019:[ 12,
            15,
            1,
            12 ],
          2020:[ 12,
            13,
            1,
            10 ],
          2021:[ 12,
            12,
            1,
            9 ],
          2022:[ 12,
            10,
            1,
            8 ],
          name:"Vacances de Noël" } ] },
    "Saint-Pierre-et-Miquelon":{ _state_code:"pm",
      SH:[ { 2018:[ 2,
            24,
            3,
            11 ],
          2019:[ 2,
            16,
            3,
            3 ],
          2020:[ 2,
            22,
            3,
            8 ],
          2021:[ 2,
            19,
            3,
            7 ],
          name:"Vacances d'Hiver" },
        { 2018:[ 4,
            28,
            5,
            13 ],
          2019:[ 4,
            20,
            5,
            5 ],
          2020:[ 4,
            18,
            5,
            3 ],
          2021:[ 4,
            24,
            5,
            9 ],
          2022:[ 4,
            15,
            5,
            1 ],
          name:"Vacances de Printemps" },
        { 2020:[ 5,
            21,
            5,
            24 ],
          2021:[ 5,
            13,
            5,
            16 ],
          2022:[ 5,
            26,
            5,
            29 ],
          name:"Pont de l'Ascension" },
        { 2018:[ 6,
            30,
            9,
            6 ],
          2019:[ 7,
            4,
            9,
            4 ],
          2020:[ 7,
            4,
            9,
            2 ],
          2021:[ 7,
            3,
            9,
            1 ],
          2022:[ 7,
            1,
            8,
            31 ],
          name:"Vacances d'Été" },
        { 2018:[ 10,
            27,
            11,
            4 ],
          2019:[ 10,
            26,
            11,
            5 ],
          2020:[ 10,
            22,
            11,
            1 ],
          name:"Vacances de la Toussaint" },
        { 2018:[ 12,
            22,
            1,
            6 ],
          2019:[ 12,
            21,
            1,
            5 ],
          2020:[ 12,
            19,
            1,
            3 ],
          name:"Vacances de Noël" } ] },
    "Wallis-et-Futuna":{ _state_code:"wf",
      SH:[ { 2018:[ 4,
            1,
            4,
            15 ],
          2019:[ 3,
            31,
            4,
            14 ],
          2020:[ 3,
            29,
            4,
            13 ],
          2021:[ 4,
            3,
            4,
            18 ],
          name:"Vacances 1ère période" },
        { 2018:[ 6,
            8,
            6,
            24 ],
          2019:[ 6,
            9,
            6,
            23 ],
          2020:[ 6,
            5,
            6,
            21 ],
          2021:[ 6,
            5,
            6,
            20 ],
          name:"Vacances 2ème période" },
        { 2018:[ 8,
            10,
            8,
            26 ],
          2019:[ 8,
            11,
            8,
            25 ],
          2020:[ 8,
            9,
            8,
            23 ],
          2021:[ 8,
            7,
            8,
            22 ],
          name:"Vacances 3ème période" },
        { 2018:[ 10,
            14,
            10,
            28 ],
          2019:[ 10,
            13,
            10,
            27 ],
          2020:[ 10,
            11,
            10,
            25 ],
          2021:[ 10,
            9,
            10,
            24 ],
          name:"Vacances 4ème période" },
        { 2018:[ 12,
            16,
            2,
            10 ],
          2019:[ 12,
            15,
            2,
            9 ],
          2020:[ 12,
            13,
            2,
            14 ],
          2021:[ 12,
            18,
            2,
            19 ],
          name:"Vacances d'Été" } ] } };
  data$n.PH;
  data$n.Bretagne;
  data$n.Normandie;
  data$n.Occitanie;
  data$n.Corse;
  data$n.Guadeloupe;
  data$n.Guyane;
  data$n.Martinique;
  data$n.Mayotte;

  var data$m = { England:{ PH:[ { name:"New Year’s Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 },
        { name:"Easter Monday",
          variable_date:"easter",
          offset:1 },
        { name:"Early May bank holiday",
          variable_date:"firstMayMonday" },
        { name:"Spring bank holiday",
          variable_date:"lastMayMonday" },
        { name:"Summer bank holiday",
          variable_date:"lastAugustMonday" },
        { name:"Christmas",
          fixed_date:[ 12,
            25 ] },
        { name:"Boxing Day",
          fixed_date:[ 12,
            26 ] } ] },
    Wales:{ PH:[ { name:"New Year’s Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 },
        { name:"Easter Monday",
          variable_date:"easter",
          offset:1 },
        { name:"Early May bank holiday",
          variable_date:"firstMayMonday" },
        { name:"Spring bank holiday",
          variable_date:"lastMayMonday" },
        { name:"Summer bank holiday",
          variable_date:"lastAugustMonday" },
        { name:"Christmas",
          fixed_date:[ 12,
            25 ] },
        { name:"Boxing Day",
          fixed_date:[ 12,
            26 ] } ] } };
  data$m.England;
  data$m.Wales;

  var data$l = { PH:[ { name:"Πρωτοχρονιά",
        fixed_date:[ 1,
          1 ] },
      { name:"Θεοφάνια",
        fixed_date:[ 1,
          6 ] },
      { name:"Καθαρά Δευτέρα",
        variable_date:"orthodox easter",
        offset:-48 },
      { name:"25η Μαρτίου",
        fixed_date:[ 3,
          25 ] },
      { name:"Μεγάλη Παρασκευή",
        variable_date:"orthodox easter",
        offset:-2 },
      { name:"Πάσχα",
        variable_date:"orthodox easter",
        offset:0 },
      { name:"Δευτέρα του Πάσχα",
        variable_date:"orthodox easter",
        offset:1 },
      { name:"Πρωτομαγιά",
        fixed_date:[ 5,
          1 ] },
      { name:"Κοίμηση της Θεοτόκου",
        fixed_date:[ 8,
          15 ] },
      { name:"28η Οκτωβρίου",
        fixed_date:[ 10,
          28 ] },
      { name:"Χριστούγεννα",
        fixed_date:[ 12,
          25 ] },
      { name:"2η μέρα Χριστουγέννων",
        fixed_date:[ 12,
          26 ] } ],
    SH:[ { 2019:[ 1,
          30,
          1,
          30 ],
        2020:[ 1,
          30,
          1,
          30 ],
        name:"Τριών Ιεραρχών" },
      { 2019:[ 4,
          22,
          5,
          6 ],
        2020:[ 4,
          13,
          4,
          26 ],
        name:"Πάσχα" },
      { 2019:[ 6,
          17,
          6,
          17 ],
        2020:[ 6,
          8,
          6,
          8 ],
        name:"Αγίου Πνεύματος" },
      { 2019:[ 7,
          1,
          8,
          31 ],
        2020:[ 7,
          1,
          8,
          31 ],
        name:"Καλοκαίρι" },
      { 2019:[ 11,
          17,
          11,
          17 ],
        name:"Πολυτεχνείο" },
      { 2018:[ 12,
          24,
          1,
          7 ],
        2019:[ 12,
          24,
          1,
          7 ],
        2020:[ 12,
          24,
          1,
          7 ],
        name:"Χριστούγεννα" } ] };
  data$l.PH;
  data$l.SH;

  var data$k = { PH:[ { name:"Nova godina",
        fixed_date:[ 1,
          1 ] },
      { name:"Sveta tri kralja",
        fixed_date:[ 1,
          6 ] },
      { name:"Uskršnji ponedjeljak",
        variable_date:"easter",
        offset:1 },
      { name:"Praznik rada",
        fixed_date:[ 5,
          1 ] },
      { name:"Tijelovo",
        variable_date:"easter",
        offset:60 },
      { name:"Dan antifašističke borbe",
        fixed_date:[ 6,
          22 ] },
      { name:"Dan pobjede i domovinske zahvalnosti",
        fixed_date:[ 8,
          5 ] },
      { name:"Velika Gospa",
        fixed_date:[ 8,
          15 ] },
      { name:"Svi sveti",
        fixed_date:[ 11,
          1 ] },
      { name:"Dan sjećanja na žrtve Domovinskog rata",
        fixed_date:[ 11,
          18 ] },
      { name:"Božić",
        fixed_date:[ 12,
          25 ] },
      { name:"Sveti Stjepan",
        fixed_date:[ 12,
          26 ] } ],
    SH:[ { 2022:[ 2,
          21,
          2,
          27 ],
        2023:[ 2,
          20,
          2,
          26 ],
        name:"Drugi dio zimskog odmora" },
      { 2022:[ 4,
          14,
          4,
          24 ],
        2023:[ 4,
          6,
          4,
          16 ],
        name:"Proljetni odmor" },
      { 2022:[ 6,
          23,
          9,
          3 ],
        2023:[ 6,
          23,
          9,
          4 ],
        name:"Ljetni praznici" },
      { 2021:[ 11,
          2,
          11,
          3 ],
        2022:[ 10,
          31,
          11,
          1 ],
        name:"Jesenski odmor" },
      { 2021:[ 12,
          24,
          1,
          9 ],
        2022:[ 12,
          27,
          1,
          8 ],
        name:"Prvi dio zimskog odmora" } ] };
  data$k.PH;
  data$k.SH;

  var data$j = { PH:[ { name:"újév",
        fixed_date:[ 1,
          1 ] },
      { name:"az 1848-as forradalom ünnepe",
        fixed_date:[ 3,
          15 ] },
      { name:"nagypéntek",
        variable_date:"easter",
        offset:-2 },
      { name:"húsvétvasárnap",
        variable_date:"easter" },
      { name:"húsvéthétfő",
        variable_date:"easter",
        offset:1 },
      { name:"pünkösdvasárnap",
        variable_date:"easter",
        offset:49 },
      { name:"pünkösdhétfő",
        variable_date:"easter",
        offset:50 },
      { name:"a munka ünnepe",
        fixed_date:[ 5,
          1 ] },
      { name:"az államalapítás ünnepe",
        fixed_date:[ 8,
          20 ] },
      { name:"az 1956-os forradalom ünnepe",
        fixed_date:[ 10,
          23 ] },
      { name:"mindenszentek",
        fixed_date:[ 11,
          1 ] },
      { name:"karácsony",
        fixed_date:[ 12,
          25 ] },
      { name:"karácsony másnap",
        fixed_date:[ 12,
          26 ] } ],
    SH:[ { 2014:[ 10,
          23,
          11,
          2 ],
        2015:[ 10,
          23,
          11,
          1 ],
        2016:[ 10,
          29,
          11,
          6 ],
        2017:[ 10,
          28,
          11,
          5 ],
        2018:[ 10,
          27,
          11,
          4 ],
        2019:[ 10,
          26,
          11,
          3 ],
        2020:[ 10,
          23,
          11,
          1 ],
        2021:[ 10,
          23,
          11,
          1 ],
        2023:[ 10,
          28,
          11,
          5 ],
        2024:[ 10,
          26,
          11,
          3 ],
        name:"őszi szünet" },
      { 2014:[ 12,
          20,
          1,
          4 ],
        2015:[ 12,
          19,
          1,
          3 ],
        2016:[ 12,
          22,
          1,
          2 ],
        2017:[ 12,
          23,
          1,
          2 ],
        2018:[ 12,
          22,
          1,
          2 ],
        2019:[ 12,
          21,
          1,
          5 ],
        2020:[ 12,
          19,
          1,
          3 ],
        2021:[ 12,
          22,
          1,
          2 ],
        2022:[ 12,
          22,
          1,
          8 ],
        2023:[ 12,
          22,
          1,
          7 ],
        2024:[ 12,
          21,
          1,
          5 ],
        name:"téli szünet" },
      { 2015:[ 4,
          2,
          4,
          7 ],
        2016:[ 3,
          24,
          3,
          29 ],
        2017:[ 4,
          13,
          4,
          18 ],
        2018:[ 3,
          29,
          4,
          3 ],
        2019:[ 4,
          18,
          4,
          23 ],
        2020:[ 4,
          7,
          4,
          14 ],
        2021:[ 4,
          1,
          4,
          6 ],
        2022:[ 4,
          14,
          4,
          19 ],
        2023:[ 4,
          6,
          4,
          11 ],
        2024:[ 3,
          28,
          4,
          7 ],
        2025:[ 4,
          17,
          4,
          27 ],
        name:"tavaszi szünet" },
      { 2015:[ 6,
          16,
          8,
          31 ],
        2016:[ 6,
          16,
          8,
          31 ],
        2017:[ 6,
          16,
          8,
          31 ],
        2018:[ 6,
          16,
          9,
          2 ],
        2019:[ 6,
          15,
          9,
          1 ],
        2020:[ 6,
          16,
          8,
          31 ],
        2021:[ 6,
          16,
          8,
          31 ],
        2022:[ 6,
          16,
          8,
          31 ],
        2023:[ 6,
          17,
          8,
          31 ],
        2024:[ 6,
          22,
          9,
          1 ],
        2025:[ 6,
          21,
          8,
          31 ],
        name:"nyári szünet" } ] };
  data$j.PH;
  data$j.SH;

  var data$i = { PH:[ { name:"New Year’s Day",
        fixed_date:[ 1,
          1 ] },
      { name:"St Patrick’s Day",
        fixed_date:[ 3,
          17 ] },
      { name:"St Patrick’s Day",
        variable_date:"nextMo-Fr17March" },
      { name:"Good Friday",
        variable_date:"easter",
        offset:-2 },
      { name:"Easter Monday",
        variable_date:"easter",
        offset:1 },
      { name:"May Bank Holiday",
        variable_date:"firstMayMonday" },
      { name:"June Bank Holiday",
        variable_date:"firstJuneMonday" },
      { name:"August Bank Holiday",
        variable_date:"firstAugustMonday" },
      { name:"October Bank Holiday (Halloween)",
        variable_date:"lastOctoberMonday" },
      { name:"Christmas",
        fixed_date:[ 12,
          25 ] },
      { name:"St Stephen’s Day",
        fixed_date:[ 12,
          26 ] },
      { name:"Bank Holiday",
        fixed_date:[ 12,
          27 ] } ] };
  data$i.PH;

  var data$h = { PH:[ { name:"Capodanno",
        fixed_date:[ 1,
          1 ] },
      { name:"Epifania",
        fixed_date:[ 1,
          6 ] },
      { name:"Liberazione dal nazifascismo (1945)",
        fixed_date:[ 4,
          25 ] },
      { name:"Pasqua",
        variable_date:"easter" },
      { name:"Lunedì di Pasqua",
        variable_date:"easter",
        offset:1 },
      { name:"Festa del lavoro",
        fixed_date:[ 5,
          1 ] },
      { name:"Festa della Repubblica",
        fixed_date:[ 6,
          2 ] },
      { name:"Assunzione di Maria",
        fixed_date:[ 8,
          15 ] },
      { name:"Ognissanti",
        fixed_date:[ 11,
          1 ] },
      { name:"Immacolata Concezione",
        fixed_date:[ 12,
          8 ] },
      { name:"Natale di Gesù",
        fixed_date:[ 12,
          25 ] },
      { name:"Santo Stefano",
        fixed_date:[ 12,
          26 ] } ] };
  data$h.PH;

  var data$g = { PH:[ { name:"元日",
        fixed_date:[ 1,
          1 ] },
      { name:"成人の日",
        variable_date:"firstJanuaryMonday",
        offset:7 },
      { name:"建国記念の日",
        fixed_date:[ 2,
          11 ] },
      { name:"天皇誕生日",
        fixed_date:[ 2,
          23 ] },
      { name:"昭和の日",
        fixed_date:[ 4,
          29 ] },
      { name:"憲法記念日",
        fixed_date:[ 5,
          3 ] },
      { name:"みどりの日",
        fixed_date:[ 5,
          4 ] },
      { name:"こどもの日",
        fixed_date:[ 5,
          5 ] },
      { name:"海の日",
        variable_date:"firstJulyMonday",
        offset:14 },
      { name:"山の日",
        fixed_date:[ 8,
          11 ] },
      { name:"敬老の日",
        variable_date:"firstSeptemberMonday",
        offset:14 },
      { name:"スポーツの日",
        variable_date:"firstNovemberMonday",
        offset:7 },
      { name:"文化の日",
        fixed_date:[ 11,
          3 ] },
      { name:"勤労感謝の日",
        fixed_date:[ 11,
          23 ] },
      { name:"春分の日",
        variable_date:"springEquinox" },
      { name:"秋分の日",
        variable_date:"autumnalEquinox" } ] };
  data$g.PH;

  var data$f = { PH:[ { name:"Nieuwjaarsdag",
        fixed_date:[ 1,
          1 ] },
      { name:"Goede vrijdag",
        variable_date:"easter",
        offset:-2 },
      { name:"Tweede Paasdag",
        variable_date:"easter",
        offset:1 },
      { name:"Koningsdag",
        fixed_date:[ 4,
          27 ] },
      { name:"Bevrijdingsdag",
        fixed_date:[ 5,
          5 ] },
      { name:"Hemelvaartsdag",
        variable_date:"easter",
        offset:39 },
      { name:"Tweede Pinksterdag",
        variable_date:"easter",
        offset:50 },
      { name:"Eerste Kerstdag",
        fixed_date:[ 12,
          25 ] },
      { name:"Tweede Kerstdag",
        fixed_date:[ 12,
          26 ] } ] };
  data$f.PH;

  var data$e = { PH:[ { name:"Nyttårsdag",
        fixed_date:[ 1,
          1 ] },
      { name:"Skjærtorsdag",
        variable_date:"easter",
        offset:-3 },
      { name:"Langfredag",
        variable_date:"easter",
        offset:-2 },
      { name:"Påskedag",
        variable_date:"easter" },
      { name:"2. Påskedag",
        variable_date:"easter",
        offset:1 },
      { name:"1. Mai",
        fixed_date:[ 5,
          1 ] },
      { name:"Grunnlovsdagen",
        fixed_date:[ 5,
          17 ] },
      { name:"Kristi Himmelfartsdag",
        variable_date:"easter",
        offset:39 },
      { name:"Pinsedag",
        variable_date:"easter",
        offset:49 },
      { name:"2. Pinsedag",
        variable_date:"easter",
        offset:50 },
      { name:"Juledag",
        fixed_date:[ 12,
          25 ] },
      { name:"2. Juledag",
        fixed_date:[ 12,
          26 ] } ] };
  data$e.PH;

  var data$d = { PH:[ { name:"New Year's Day",
        fixed_date:[ 1,
          1 ] },
      { name:"Day after New Year's Day",
        fixed_date:[ 1,
          2 ] },
      { name:"Waitangi Day",
        fixed_date:[ 2,
          6 ] },
      { name:"Good Friday",
        variable_date:"easter",
        offset:-2 },
      { name:"Easter Monday",
        variable_date:"easter",
        offset:1 },
      { name:"Anzac Day",
        fixed_date:[ 4,
          25 ] },
      { name:"Queen's Birthday",
        variable_date:"firstJuneMonday" },
      { name:"Labour Day",
        variable_date:"firstOctoberMonday",
        offset:21 },
      { name:"Christmas Day",
        fixed_date:[ 12,
          25 ] },
      { name:"Boxing Day",
        fixed_date:[ 12,
          26 ] } ] };
  data$d.PH;

  var data$c = { PH:[ { name:"Nowy Rok",
        fixed_date:[ 1,
          1 ] },
      { name:"Święto Trzech Króli",
        fixed_date:[ 1,
          6 ] },
      { name:"Wielkanoc",
        variable_date:"easter" },
      { name:"Lany Poniedziałek - drugi dzień Wielkiej Nocy",
        variable_date:"easter",
        offset:1 },
      { name:"Pierwszy Maja",
        fixed_date:[ 5,
          1 ] },
      { name:"Trzeci Maja",
        fixed_date:[ 5,
          3 ] },
      { name:"Zielone Świątki",
        variable_date:"easter",
        offset:49 },
      { name:"Boże Ciało",
        variable_date:"easter",
        offset:60 },
      { name:"Wniebowzięcie Najświętszej Maryi Panny",
        fixed_date:[ 8,
          15 ] },
      { name:"Wszystkich Świętych",
        fixed_date:[ 11,
          1 ] },
      { name:"Święto Niepodległości",
        fixed_date:[ 11,
          11 ] },
      { name:"pierwszy dzień Bożego Narodzenia",
        fixed_date:[ 12,
          25 ] },
      { name:"drugi dzień Bożego Narodzenia",
        fixed_date:[ 12,
          26 ] } ] };
  data$c.PH;

  var data$b = { PH:[ { name:"Anul Nou",
        fixed_date:[ 1,
          1 ] },
      { name:"A doua zi de Anul Nou",
        fixed_date:[ 1,
          2 ] },
      { name:"Ziua Unirii Principatelor Române (Ziua Unirii)",
        fixed_date:[ 1,
          24 ] },
      { name:"Paștele ortodox",
        variable_date:"orthodox easter" },
      { name:"A doua zi de Paște ortodox",
        variable_date:"orthodox easter",
        offset:1 },
      { name:"Ziua Muncii",
        fixed_date:[ 5,
          1 ] },
      { name:"Rusaliile",
        variable_date:"orthodox easter",
        offset:50 },
      { name:"A doua zi de Rusalii",
        variable_date:"orthodox easter",
        offset:51 },
      { name:"Adormirea Maicii Domnului",
        fixed_date:[ 8,
          15 ] },
      { name:"Sfântul Apostol Andrei",
        fixed_date:[ 11,
          30 ] },
      { name:"Ziua Națională (Ziua Marii Uniri)",
        fixed_date:[ 12,
          1 ] },
      { name:"Crăciunul",
        fixed_date:[ 12,
          25 ] },
      { name:"A doua zi de Crăciun",
        fixed_date:[ 12,
          26 ] } ],
    SH:[ { 2015:[ 1,
          31,
          2,
          8 ],
        2016:[ 1,
          30,
          2,
          7 ],
        2021:[ 1,
          30,
          2,
          7 ],
        name:"Vacanţa intersemestrială" },
      { 2015:[ 4,
          11,
          4,
          19 ],
        2016:[ 4,
          23,
          5,
          3 ],
        2021:[ 4,
          30,
          5,
          9 ],
        name:"Vacanța de primăvară" },
      { 2015:[ 6,
          20,
          9,
          13 ],
        2016:[ 6,
          18,
          9,
          4 ],
        2021:[ 6,
          26,
          9,
          13 ],
        name:"Vacanța de vară" },
      { 2014:[ 12,
          20,
          1,
          4 ],
        2015:[ 12,
          19,
          1,
          3 ],
        2020:[ 12,
          23,
          1,
          10 ],
        2021:[ 12,
          23,
          1,
          9 ],
        name:"Vacanța de iarnă" } ] };
  data$b.PH;
  data$b.SH;

  var data$a = { PH:[ { name:"1. Новогодние каникулы",
        fixed_date:[ 1,
          1 ] },
      { name:"2. Новогодние каникулы",
        fixed_date:[ 1,
          2 ] },
      { name:"3. Новогодние каникулы",
        fixed_date:[ 1,
          3 ] },
      { name:"4. Новогодние каникулы",
        fixed_date:[ 1,
          4 ] },
      { name:"5. Новогодние каникулы",
        fixed_date:[ 1,
          5 ] },
      { name:"6. Новогодние каникулы",
        fixed_date:[ 1,
          6 ] },
      { name:"Рождество Христово",
        fixed_date:[ 1,
          7 ] },
      { name:"8. Новогодние каникулы",
        fixed_date:[ 1,
          8 ] },
      { name:"День защитника Отечества",
        fixed_date:[ 2,
          23 ] },
      { name:"Международный женский день",
        fixed_date:[ 3,
          8 ] },
      { name:"День Победы",
        fixed_date:[ 5,
          9 ] },
      { name:"Праздник Весны и Труда",
        fixed_date:[ 5,
          1 ] },
      { name:"День народного единства",
        fixed_date:[ 11,
          4 ] },
      { name:"День России",
        fixed_date:[ 6,
          12 ] } ],
    "Татарстан":{ _state_code:"tatarstan",
      PH:[ { name:"1. Новогодние каникулы",
          fixed_date:[ 1,
            1 ] },
        { name:"2. Новогодние каникулы",
          fixed_date:[ 1,
            2 ] },
        { name:"3. Новогодние каникулы",
          fixed_date:[ 1,
            3 ] },
        { name:"4. Новогодние каникулы",
          fixed_date:[ 1,
            4 ] },
        { name:"5. Новогодние каникулы",
          fixed_date:[ 1,
            5 ] },
        { name:"6. Новогодние каникулы",
          fixed_date:[ 1,
            6 ] },
        { name:"Рождество Христово",
          fixed_date:[ 1,
            7 ] },
        { name:"8. Новогодние каникулы",
          fixed_date:[ 1,
            8 ] },
        { name:"День защитника Отечества",
          fixed_date:[ 2,
            23 ] },
        { name:"Международный женский день",
          fixed_date:[ 3,
            8 ] },
        { name:"День Победы",
          fixed_date:[ 5,
            9 ] },
        { name:"Праздник Весны и Труда",
          fixed_date:[ 5,
            1 ] },
        { name:"День народного единства",
          fixed_date:[ 11,
            4 ] },
        { name:"День России",
          fixed_date:[ 6,
            12 ] },
        { name:"Ураза-байрам",
          fixed_date:[ 7,
            28 ] },
        { name:"День Республики Татарстан",
          fixed_date:[ 8,
            30 ] },
        { name:"Курбан-байрам",
          fixed_date:[ 10,
            4 ] },
        { name:"День Конституции Республики Татарстан",
          fixed_date:[ 11,
            6 ] } ] },
    "Башкортостан":{ _state_code:"bashkortostan",
      PH:[ { name:"1. Новогодние каникулы",
          fixed_date:[ 1,
            1 ] },
        { name:"2. Новогодние каникулы",
          fixed_date:[ 1,
            2 ] },
        { name:"3. Новогодние каникулы",
          fixed_date:[ 1,
            3 ] },
        { name:"4. Новогодние каникулы",
          fixed_date:[ 1,
            4 ] },
        { name:"5. Новогодние каникулы",
          fixed_date:[ 1,
            5 ] },
        { name:"6. Новогодние каникулы",
          fixed_date:[ 1,
            6 ] },
        { name:"Рождество Христово",
          fixed_date:[ 1,
            7 ] },
        { name:"8. Новогодние каникулы",
          fixed_date:[ 1,
            8 ] },
        { name:"День защитника Отечества",
          fixed_date:[ 2,
            23 ] },
        { name:"Международный женский день",
          fixed_date:[ 3,
            8 ] },
        { name:"День Победы",
          fixed_date:[ 5,
            9 ] },
        { name:"Праздник Весны и Труда",
          fixed_date:[ 5,
            1 ] },
        { name:"День народного единства",
          fixed_date:[ 11,
            4 ] },
        { name:"День России",
          fixed_date:[ 6,
            12 ] },
        { name:"Ураза-байрам",
          fixed_date:[ 7,
            28 ] },
        { name:"Курбан-байрам",
          fixed_date:[ 10,
            4 ] },
        { name:"День Республики Башкирии",
          fixed_date:[ 10,
            11 ] },
        { name:"День Конституции Башкортостана",
          fixed_date:[ 12,
            24 ] } ] },
    "Чувашия":{ _state_code:"chuvashia",
      PH:[ { name:"1. Новогодние каникулы",
          fixed_date:[ 1,
            1 ] },
        { name:"2. Новогодние каникулы",
          fixed_date:[ 1,
            2 ] },
        { name:"3. Новогодние каникулы",
          fixed_date:[ 1,
            3 ] },
        { name:"4. Новогодние каникулы",
          fixed_date:[ 1,
            4 ] },
        { name:"5. Новогодние каникулы",
          fixed_date:[ 1,
            5 ] },
        { name:"6. Новогодние каникулы",
          fixed_date:[ 1,
            6 ] },
        { name:"Рождество Христово",
          fixed_date:[ 1,
            7 ] },
        { name:"8. Новогодние каникулы",
          fixed_date:[ 1,
            8 ] },
        { name:"День защитника Отечества",
          fixed_date:[ 2,
            23 ] },
        { name:"Международный женский день",
          fixed_date:[ 3,
            8 ] },
        { name:"День Победы",
          fixed_date:[ 5,
            9 ] },
        { name:"Праздник Весны и Труда",
          fixed_date:[ 5,
            1 ] },
        { name:"День народного единства",
          fixed_date:[ 11,
            4 ] },
        { name:"День России",
          fixed_date:[ 6,
            12 ] },
        { name:"День Чувашской республики",
          fixed_date:[ 6,
            24 ] } ] },
    "Республика Саха (Якутия)":{ _state_code:"sakha",
      PH:[ { name:"1. Новогодние каникулы",
          fixed_date:[ 1,
            1 ] },
        { name:"2. Новогодние каникулы",
          fixed_date:[ 1,
            2 ] },
        { name:"3. Новогодние каникулы",
          fixed_date:[ 1,
            3 ] },
        { name:"4. Новогодние каникулы",
          fixed_date:[ 1,
            4 ] },
        { name:"5. Новогодние каникулы",
          fixed_date:[ 1,
            5 ] },
        { name:"6. Новогодние каникулы",
          fixed_date:[ 1,
            6 ] },
        { name:"Рождество Христово",
          fixed_date:[ 1,
            7 ] },
        { name:"8. Новогодние каникулы",
          fixed_date:[ 1,
            8 ] },
        { name:"День защитника Отечества",
          fixed_date:[ 2,
            23 ] },
        { name:"Международный женский день",
          fixed_date:[ 3,
            8 ] },
        { name:"День Победы",
          fixed_date:[ 5,
            9 ] },
        { name:"Праздник Весны и Труда",
          fixed_date:[ 5,
            1 ] },
        { name:"День народного единства",
          fixed_date:[ 11,
            4 ] },
        { name:"День России",
          fixed_date:[ 6,
            12 ] },
        { name:"День Республики Саха",
          fixed_date:[ 4,
            27 ] },
        { name:"Ысыах",
          fixed_date:[ 6,
            23 ] },
        { name:"День государственности Республики Саха",
          fixed_date:[ 9,
            27 ] } ] },
    "Калмыкия":{ _state_code:"kalmykia",
      PH:[ { name:"1. Новогодние каникулы",
          fixed_date:[ 1,
            1 ] },
        { name:"2. Новогодние каникулы",
          fixed_date:[ 1,
            2 ] },
        { name:"3. Новогодние каникулы",
          fixed_date:[ 1,
            3 ] },
        { name:"4. Новогодние каникулы",
          fixed_date:[ 1,
            4 ] },
        { name:"5. Новогодние каникулы",
          fixed_date:[ 1,
            5 ] },
        { name:"6. Новогодние каникулы",
          fixed_date:[ 1,
            6 ] },
        { name:"Рождество Христово",
          fixed_date:[ 1,
            7 ] },
        { name:"8. Новогодние каникулы",
          fixed_date:[ 1,
            8 ] },
        { name:"День защитника Отечества",
          fixed_date:[ 2,
            23 ] },
        { name:"Международный женский день",
          fixed_date:[ 3,
            8 ] },
        { name:"День Победы",
          fixed_date:[ 5,
            9 ] },
        { name:"Праздник Весны и Труда",
          fixed_date:[ 5,
            1 ] },
        { name:"День народного единства",
          fixed_date:[ 11,
            4 ] },
        { name:"День России",
          fixed_date:[ 6,
            12 ] },
        { name:"Цаган Сар",
          fixed_date:[ 1,
            14 ] },
        { name:"День принятия Степного Уложения (Конституции) Республики Калмыкия",
          fixed_date:[ 4,
            5 ] },
        { name:"День рождения Будды Шакьямун",
          fixed_date:[ 6,
            6 ] },
        { name:"Зул",
          fixed_date:[ 12,
            15 ] },
        { name:"День памяти жертв депортации калмыцкого народа",
          fixed_date:[ 12,
            28 ] } ] },
    "Республика Бурятия":{ _state_code:"buryatia",
      PH:[ { name:"1. Новогодние каникулы",
          fixed_date:[ 1,
            1 ] },
        { name:"2. Новогодние каникулы",
          fixed_date:[ 1,
            2 ] },
        { name:"3. Новогодние каникулы",
          fixed_date:[ 1,
            3 ] },
        { name:"4. Новогодние каникулы",
          fixed_date:[ 1,
            4 ] },
        { name:"5. Новогодние каникулы",
          fixed_date:[ 1,
            5 ] },
        { name:"6. Новогодние каникулы",
          fixed_date:[ 1,
            6 ] },
        { name:"Рождество Христово",
          fixed_date:[ 1,
            7 ] },
        { name:"8. Новогодние каникулы",
          fixed_date:[ 1,
            8 ] },
        { name:"День защитника Отечества",
          fixed_date:[ 2,
            23 ] },
        { name:"Международный женский день",
          fixed_date:[ 3,
            8 ] },
        { name:"День Победы",
          fixed_date:[ 5,
            9 ] },
        { name:"Праздник Весны и Труда",
          fixed_date:[ 5,
            1 ] },
        { name:"День народного единства",
          fixed_date:[ 11,
            4 ] },
        { name:"День России",
          fixed_date:[ 6,
            12 ] },
        { name:"Сагаалган",
          fixed_date:[ 1,
            14 ] } ] },
    "Республика Карелия":{ _state_code:"karelia",
      PH:[ { name:"1. Новогодние каникулы",
          fixed_date:[ 1,
            1 ] },
        { name:"2. Новогодние каникулы",
          fixed_date:[ 1,
            2 ] },
        { name:"3. Новогодние каникулы",
          fixed_date:[ 1,
            3 ] },
        { name:"4. Новогодние каникулы",
          fixed_date:[ 1,
            4 ] },
        { name:"5. Новогодние каникулы",
          fixed_date:[ 1,
            5 ] },
        { name:"6. Новогодние каникулы",
          fixed_date:[ 1,
            6 ] },
        { name:"Рождество Христово",
          fixed_date:[ 1,
            7 ] },
        { name:"8. Новогодние каникулы",
          fixed_date:[ 1,
            8 ] },
        { name:"День защитника Отечества",
          fixed_date:[ 2,
            23 ] },
        { name:"Международный женский день",
          fixed_date:[ 3,
            8 ] },
        { name:"День Победы",
          fixed_date:[ 5,
            9 ] },
        { name:"Праздник Весны и Труда",
          fixed_date:[ 5,
            1 ] },
        { name:"День народного единства",
          fixed_date:[ 11,
            4 ] },
        { name:"День России",
          fixed_date:[ 6,
            12 ] },
        { name:"День Республики Карелия",
          fixed_date:[ 6,
            8 ] },
        { name:"День освобождения Карелии от фашистских захватчиков",
          fixed_date:[ 9,
            30 ] } ] },
    "Приволжский федеральный округ":{ _state_code:"udmurtia",
      PH:[ { name:"1. Новогодние каникулы",
          fixed_date:[ 1,
            1 ] },
        { name:"2. Новогодние каникулы",
          fixed_date:[ 1,
            2 ] },
        { name:"3. Новогодние каникулы",
          fixed_date:[ 1,
            3 ] },
        { name:"4. Новогодние каникулы",
          fixed_date:[ 1,
            4 ] },
        { name:"5. Новогодние каникулы",
          fixed_date:[ 1,
            5 ] },
        { name:"6. Новогодние каникулы",
          fixed_date:[ 1,
            6 ] },
        { name:"Рождество Христово",
          fixed_date:[ 1,
            7 ] },
        { name:"8. Новогодние каникулы",
          fixed_date:[ 1,
            8 ] },
        { name:"День защитника Отечества",
          fixed_date:[ 2,
            23 ] },
        { name:"Международный женский день",
          fixed_date:[ 3,
            8 ] },
        { name:"День Победы",
          fixed_date:[ 5,
            9 ] },
        { name:"Праздник Весны и Труда",
          fixed_date:[ 5,
            1 ] },
        { name:"День народного единства",
          fixed_date:[ 11,
            4 ] },
        { name:"День России",
          fixed_date:[ 6,
            12 ] },
        { name:"День Государственности Удмуртской Республики",
          fixed_date:[ 5,
            31 ] } ] },
    "Адыгея":{ _state_code:"adygea",
      PH:[ { name:"1. Новогодние каникулы",
          fixed_date:[ 1,
            1 ] },
        { name:"2. Новогодние каникулы",
          fixed_date:[ 1,
            2 ] },
        { name:"3. Новогодние каникулы",
          fixed_date:[ 1,
            3 ] },
        { name:"4. Новогодние каникулы",
          fixed_date:[ 1,
            4 ] },
        { name:"5. Новогодние каникулы",
          fixed_date:[ 1,
            5 ] },
        { name:"6. Новогодние каникулы",
          fixed_date:[ 1,
            6 ] },
        { name:"Рождество Христово",
          fixed_date:[ 1,
            7 ] },
        { name:"8. Новогодние каникулы",
          fixed_date:[ 1,
            8 ] },
        { name:"День защитника Отечества",
          fixed_date:[ 2,
            23 ] },
        { name:"Международный женский день",
          fixed_date:[ 3,
            8 ] },
        { name:"День Победы",
          fixed_date:[ 5,
            9 ] },
        { name:"Праздник Весны и Труда",
          fixed_date:[ 5,
            1 ] },
        { name:"День народного единства",
          fixed_date:[ 11,
            4 ] },
        { name:"День России",
          fixed_date:[ 6,
            12 ] },
        { name:"Ураза-байрам",
          fixed_date:[ 7,
            28 ] },
        { name:"Курбан-байрам",
          fixed_date:[ 10,
            4 ] },
        { name:"День образования Республики Адыгея",
          fixed_date:[ 10,
            5 ] } ] },
    "Дагестан":{ _state_code:"dagestan",
      PH:[ { name:"1. Новогодние каникулы",
          fixed_date:[ 1,
            1 ] },
        { name:"2. Новогодние каникулы",
          fixed_date:[ 1,
            2 ] },
        { name:"3. Новогодние каникулы",
          fixed_date:[ 1,
            3 ] },
        { name:"4. Новогодние каникулы",
          fixed_date:[ 1,
            4 ] },
        { name:"5. Новогодние каникулы",
          fixed_date:[ 1,
            5 ] },
        { name:"6. Новогодние каникулы",
          fixed_date:[ 1,
            6 ] },
        { name:"Рождество Христово",
          fixed_date:[ 1,
            7 ] },
        { name:"8. Новогодние каникулы",
          fixed_date:[ 1,
            8 ] },
        { name:"День защитника Отечества",
          fixed_date:[ 2,
            23 ] },
        { name:"Международный женский день",
          fixed_date:[ 3,
            8 ] },
        { name:"День Победы",
          fixed_date:[ 5,
            9 ] },
        { name:"Праздник Весны и Труда",
          fixed_date:[ 5,
            1 ] },
        { name:"День народного единства",
          fixed_date:[ 11,
            4 ] },
        { name:"День России",
          fixed_date:[ 6,
            12 ] },
        { name:"День Конституции Республики Дагестан",
          fixed_date:[ 7,
            26 ] },
        { name:"Ураза-байрам",
          fixed_date:[ 7,
            28 ] },
        { name:"День единства народов Дагестана",
          fixed_date:[ 9,
            15 ] },
        { name:"Курбан-байрам",
          fixed_date:[ 10,
            4 ] } ] },
    "Ингушетия":{ _state_code:"ingushetia",
      PH:[ { name:"1. Новогодние каникулы",
          fixed_date:[ 1,
            1 ] },
        { name:"2. Новогодние каникулы",
          fixed_date:[ 1,
            2 ] },
        { name:"3. Новогодние каникулы",
          fixed_date:[ 1,
            3 ] },
        { name:"4. Новогодние каникулы",
          fixed_date:[ 1,
            4 ] },
        { name:"5. Новогодние каникулы",
          fixed_date:[ 1,
            5 ] },
        { name:"6. Новогодние каникулы",
          fixed_date:[ 1,
            6 ] },
        { name:"Рождество Христово",
          fixed_date:[ 1,
            7 ] },
        { name:"8. Новогодние каникулы",
          fixed_date:[ 1,
            8 ] },
        { name:"День защитника Отечества",
          fixed_date:[ 2,
            23 ] },
        { name:"Международный женский день",
          fixed_date:[ 3,
            8 ] },
        { name:"День Победы",
          fixed_date:[ 5,
            9 ] },
        { name:"Праздник Весны и Труда",
          fixed_date:[ 5,
            1 ] },
        { name:"День народного единства",
          fixed_date:[ 11,
            4 ] },
        { name:"День России",
          fixed_date:[ 6,
            12 ] },
        { name:"День образования Республики Ингушетия",
          fixed_date:[ 6,
            4 ] },
        { name:"Ураза-байрам",
          fixed_date:[ 7,
            28 ] },
        { name:"Курбан-байрам",
          fixed_date:[ 10,
            4 ] } ] },
    "Карачаево-Черкесия":{ _state_code:"karachay_cherkess",
      PH:[ { name:"1. Новогодние каникулы",
          fixed_date:[ 1,
            1 ] },
        { name:"2. Новогодние каникулы",
          fixed_date:[ 1,
            2 ] },
        { name:"3. Новогодние каникулы",
          fixed_date:[ 1,
            3 ] },
        { name:"4. Новогодние каникулы",
          fixed_date:[ 1,
            4 ] },
        { name:"5. Новогодние каникулы",
          fixed_date:[ 1,
            5 ] },
        { name:"6. Новогодние каникулы",
          fixed_date:[ 1,
            6 ] },
        { name:"Рождество Христово",
          fixed_date:[ 1,
            7 ] },
        { name:"8. Новогодние каникулы",
          fixed_date:[ 1,
            8 ] },
        { name:"День защитника Отечества",
          fixed_date:[ 2,
            23 ] },
        { name:"Международный женский день",
          fixed_date:[ 3,
            8 ] },
        { name:"День Победы",
          fixed_date:[ 5,
            9 ] },
        { name:"Праздник Весны и Труда",
          fixed_date:[ 5,
            1 ] },
        { name:"День народного единства",
          fixed_date:[ 11,
            4 ] },
        { name:"День России",
          fixed_date:[ 6,
            12 ] },
        { name:"День возрождения карачаевского народа",
          fixed_date:[ 5,
            3 ] },
        { name:"Ураза-байрам",
          fixed_date:[ 7,
            28 ] },
        { name:"Курбан-байрам",
          fixed_date:[ 10,
            4 ] } ] },
    "Чечня":{ _state_code:"chechnya",
      PH:[ { name:"1. Новогодние каникулы",
          fixed_date:[ 1,
            1 ] },
        { name:"2. Новогодние каникулы",
          fixed_date:[ 1,
            2 ] },
        { name:"3. Новогодние каникулы",
          fixed_date:[ 1,
            3 ] },
        { name:"4. Новогодние каникулы",
          fixed_date:[ 1,
            4 ] },
        { name:"5. Новогодние каникулы",
          fixed_date:[ 1,
            5 ] },
        { name:"6. Новогодние каникулы",
          fixed_date:[ 1,
            6 ] },
        { name:"Рождество Христово",
          fixed_date:[ 1,
            7 ] },
        { name:"8. Новогодние каникулы",
          fixed_date:[ 1,
            8 ] },
        { name:"День защитника Отечества",
          fixed_date:[ 2,
            23 ] },
        { name:"Международный женский день",
          fixed_date:[ 3,
            8 ] },
        { name:"День Победы",
          fixed_date:[ 5,
            9 ] },
        { name:"Праздник Весны и Труда",
          fixed_date:[ 5,
            1 ] },
        { name:"День народного единства",
          fixed_date:[ 11,
            4 ] },
        { name:"День России",
          fixed_date:[ 6,
            12 ] },
        { name:"День мира в Чеченской Республике",
          fixed_date:[ 4,
            16 ] },
        { name:"Ураза-байрам",
          fixed_date:[ 7,
            28 ] },
        { name:"Курбан-байрам",
          fixed_date:[ 10,
            4 ] } ] },
    "Кабардино-Балкария":{ _state_code:"kabardino_balkaria",
      PH:[ { name:"1. Новогодние каникулы",
          fixed_date:[ 1,
            1 ] },
        { name:"2. Новогодние каникулы",
          fixed_date:[ 1,
            2 ] },
        { name:"3. Новогодние каникулы",
          fixed_date:[ 1,
            3 ] },
        { name:"4. Новогодние каникулы",
          fixed_date:[ 1,
            4 ] },
        { name:"5. Новогодние каникулы",
          fixed_date:[ 1,
            5 ] },
        { name:"6. Новогодние каникулы",
          fixed_date:[ 1,
            6 ] },
        { name:"Рождество Христово",
          fixed_date:[ 1,
            7 ] },
        { name:"8. Новогодние каникулы",
          fixed_date:[ 1,
            8 ] },
        { name:"День защитника Отечества",
          fixed_date:[ 2,
            23 ] },
        { name:"Международный женский день",
          fixed_date:[ 3,
            8 ] },
        { name:"День Победы",
          fixed_date:[ 5,
            9 ] },
        { name:"Праздник Весны и Труда",
          fixed_date:[ 5,
            1 ] },
        { name:"День народного единства",
          fixed_date:[ 11,
            4 ] },
        { name:"День России",
          fixed_date:[ 6,
            12 ] },
        { name:"День возрождения балкарского народа",
          fixed_date:[ 3,
            28 ] },
        { name:"Черкесский день траура",
          fixed_date:[ 5,
            21 ] },
        { name:"Ураза-байрам",
          fixed_date:[ 7,
            28 ] },
        { name:"День государственности Кабардино-Балкарской Республики",
          fixed_date:[ 9,
            1 ] },
        { name:"Курбан-байрам",
          fixed_date:[ 10,
            4 ] } ] },
    "Республика Алтай":{ _state_code:"altai",
      PH:[ { name:"1. Новогодние каникулы",
          fixed_date:[ 1,
            1 ] },
        { name:"2. Новогодние каникулы",
          fixed_date:[ 1,
            2 ] },
        { name:"3. Новогодние каникулы",
          fixed_date:[ 1,
            3 ] },
        { name:"4. Новогодние каникулы",
          fixed_date:[ 1,
            4 ] },
        { name:"5. Новогодние каникулы",
          fixed_date:[ 1,
            5 ] },
        { name:"6. Новогодние каникулы",
          fixed_date:[ 1,
            6 ] },
        { name:"Рождество Христово",
          fixed_date:[ 1,
            7 ] },
        { name:"8. Новогодние каникулы",
          fixed_date:[ 1,
            8 ] },
        { name:"День защитника Отечества",
          fixed_date:[ 2,
            23 ] },
        { name:"Международный женский день",
          fixed_date:[ 3,
            8 ] },
        { name:"День Победы",
          fixed_date:[ 5,
            9 ] },
        { name:"Праздник Весны и Труда",
          fixed_date:[ 5,
            1 ] },
        { name:"День народного единства",
          fixed_date:[ 11,
            4 ] },
        { name:"День России",
          fixed_date:[ 6,
            12 ] },
        { name:"Чага-Байрам",
          fixed_date:[ 1,
            14 ] } ] },
    "Республика Тыва":{ _state_code:"tuva",
      PH:[ { name:"1. Новогодние каникулы",
          fixed_date:[ 1,
            1 ] },
        { name:"2. Новогодние каникулы",
          fixed_date:[ 1,
            2 ] },
        { name:"3. Новогодние каникулы",
          fixed_date:[ 1,
            3 ] },
        { name:"4. Новогодние каникулы",
          fixed_date:[ 1,
            4 ] },
        { name:"5. Новогодние каникулы",
          fixed_date:[ 1,
            5 ] },
        { name:"6. Новогодние каникулы",
          fixed_date:[ 1,
            6 ] },
        { name:"Рождество Христово",
          fixed_date:[ 1,
            7 ] },
        { name:"8. Новогодние каникулы",
          fixed_date:[ 1,
            8 ] },
        { name:"День защитника Отечества",
          fixed_date:[ 2,
            23 ] },
        { name:"Международный женский день",
          fixed_date:[ 3,
            8 ] },
        { name:"День Победы",
          fixed_date:[ 5,
            9 ] },
        { name:"Праздник Весны и Труда",
          fixed_date:[ 5,
            1 ] },
        { name:"День народного единства",
          fixed_date:[ 11,
            4 ] },
        { name:"День России",
          fixed_date:[ 6,
            12 ] },
        { name:"Народный праздник Шагаа",
          fixed_date:[ 1,
            14 ] },
        { name:"День Республики Тыва",
          fixed_date:[ 8,
            15 ] } ] },
    "Саратовская область":{ _state_code:"saratov",
      PH:[ { name:"1. Новогодние каникулы",
          fixed_date:[ 1,
            1 ] },
        { name:"2. Новогодние каникулы",
          fixed_date:[ 1,
            2 ] },
        { name:"3. Новогодние каникулы",
          fixed_date:[ 1,
            3 ] },
        { name:"4. Новогодние каникулы",
          fixed_date:[ 1,
            4 ] },
        { name:"5. Новогодние каникулы",
          fixed_date:[ 1,
            5 ] },
        { name:"6. Новогодние каникулы",
          fixed_date:[ 1,
            6 ] },
        { name:"Рождество Христово",
          fixed_date:[ 1,
            7 ] },
        { name:"8. Новогодние каникулы",
          fixed_date:[ 1,
            8 ] },
        { name:"День защитника Отечества",
          fixed_date:[ 2,
            23 ] },
        { name:"Международный женский день",
          fixed_date:[ 3,
            8 ] },
        { name:"День Победы",
          fixed_date:[ 5,
            9 ] },
        { name:"Праздник Весны и Труда",
          fixed_date:[ 5,
            1 ] },
        { name:"День народного единства",
          fixed_date:[ 11,
            4 ] },
        { name:"День России",
          fixed_date:[ 6,
            12 ] },
        { name:"Радоница",
          fixed_date:[ 4,
            29 ] } ] },
    "Брянская область":{ _state_code:"bryansk",
      PH:[ { name:"1. Новогодние каникулы",
          fixed_date:[ 1,
            1 ] },
        { name:"2. Новогодние каникулы",
          fixed_date:[ 1,
            2 ] },
        { name:"3. Новогодние каникулы",
          fixed_date:[ 1,
            3 ] },
        { name:"4. Новогодние каникулы",
          fixed_date:[ 1,
            4 ] },
        { name:"5. Новогодние каникулы",
          fixed_date:[ 1,
            5 ] },
        { name:"6. Новогодние каникулы",
          fixed_date:[ 1,
            6 ] },
        { name:"Рождество Христово",
          fixed_date:[ 1,
            7 ] },
        { name:"8. Новогодние каникулы",
          fixed_date:[ 1,
            8 ] },
        { name:"День защитника Отечества",
          fixed_date:[ 2,
            23 ] },
        { name:"Международный женский день",
          fixed_date:[ 3,
            8 ] },
        { name:"День Победы",
          fixed_date:[ 5,
            9 ] },
        { name:"Праздник Весны и Труда",
          fixed_date:[ 5,
            1 ] },
        { name:"День народного единства",
          fixed_date:[ 11,
            4 ] },
        { name:"День России",
          fixed_date:[ 6,
            12 ] },
        { name:"Радоница",
          fixed_date:[ 4,
            29 ] },
        { name:"День освобождения города Брянска",
          fixed_date:[ 9,
            17 ] } ] },
    "Республика Коми":{ _state_code:"komi",
      PH:[ { name:"1. Новогодние каникулы",
          fixed_date:[ 1,
            1 ] },
        { name:"2. Новогодние каникулы",
          fixed_date:[ 1,
            2 ] },
        { name:"3. Новогодние каникулы",
          fixed_date:[ 1,
            3 ] },
        { name:"4. Новогодние каникулы",
          fixed_date:[ 1,
            4 ] },
        { name:"5. Новогодние каникулы",
          fixed_date:[ 1,
            5 ] },
        { name:"6. Новогодние каникулы",
          fixed_date:[ 1,
            6 ] },
        { name:"Рождество Христово",
          fixed_date:[ 1,
            7 ] },
        { name:"8. Новогодние каникулы",
          fixed_date:[ 1,
            8 ] },
        { name:"День защитника Отечества",
          fixed_date:[ 2,
            23 ] },
        { name:"Международный женский день",
          fixed_date:[ 3,
            8 ] },
        { name:"День Победы",
          fixed_date:[ 5,
            9 ] },
        { name:"Праздник Весны и Труда",
          fixed_date:[ 5,
            1 ] },
        { name:"День народного единства",
          fixed_date:[ 11,
            4 ] },
        { name:"День России",
          fixed_date:[ 6,
            12 ] },
        { name:"День Республики Коми",
          fixed_date:[ 8,
            22 ] } ] } };
  data$a.PH;

  var data$9 = { PH:[ { name:"nyårsdagen",
        fixed_date:[ 1,
          1 ] },
      { name:"trettondedag jul",
        fixed_date:[ 1,
          6 ] },
      { name:"långfredagen",
        variable_date:"easter",
        offset:-2 },
      { name:"påskdagen",
        variable_date:"easter" },
      { name:"annandag påsk",
        variable_date:"easter",
        offset:1 },
      { name:"första maj",
        fixed_date:[ 5,
          1 ] },
      { name:"Kristi himmelsfärdsdag",
        variable_date:"easter",
        offset:39 },
      { name:"pingstdagen",
        variable_date:"easter",
        offset:49 },
      { name:"nationaldagen",
        fixed_date:[ 6,
          6 ] },
      { name:"midsommardagen",
        variable_date:"nextSaturday20Jun" },
      { name:"alla helgons dag",
        variable_date:"nextSaturday31Oct" },
      { name:"juldagen",
        fixed_date:[ 12,
          25 ] },
      { name:"annandag jul",
        fixed_date:[ 12,
          26 ] } ] };
  data$9.PH;

  var data$8 = { PH:[ { name:"novo leto",
        fixed_date:[ 1,
          1 ] },
      { name:"Prešernov dan, slovenski kulturni praznik",
        fixed_date:[ 2,
          8 ] },
      { name:"velikonočna nedelja",
        variable_date:"easter" },
      { name:"velikonočni ponedeljek",
        variable_date:"easter",
        offset:1 },
      { name:"dan upora proti okupatorju",
        fixed_date:[ 4,
          27 ] },
      { name:"praznik dela 1",
        fixed_date:[ 5,
          1 ] },
      { name:"praznik dela 2",
        fixed_date:[ 5,
          2 ] },
      { name:"binkoštna nedelja - binkošti",
        variable_date:"easter",
        offset:49 },
      { name:"dan državnosti",
        fixed_date:[ 6,
          25 ] },
      { name:"Marijino vnebovzetje",
        fixed_date:[ 8,
          15 ] },
      { name:"dan reformacije",
        fixed_date:[ 10,
          31 ] },
      { name:"dan spomina na mrtve",
        fixed_date:[ 11,
          1 ] },
      { name:"božič",
        fixed_date:[ 12,
          25 ] },
      { name:"dan samostojnosti in enotnosti",
        fixed_date:[ 12,
          26 ] } ] };
  data$8.PH;

  var data$7 = { PH:[ { name:"Deň vzniku Slovenskej republiky",
        fixed_date:[ 1,
          1 ] },
      { name:"Zjavenie Pána",
        fixed_date:[ 1,
          6 ] },
      { name:"Veľký piatok",
        variable_date:"easter",
        offset:-2 },
      { name:"Veľkonočná nedeľa",
        variable_date:"easter" },
      { name:"Veľkonočný pondelok",
        variable_date:"easter",
        offset:1 },
      { name:"Sviatok práce",
        fixed_date:[ 5,
          1 ] },
      { name:"Deň víťazstva nad fašizmom",
        fixed_date:[ 5,
          8 ] },
      { name:"Sviatok svätého Cyrila a Metoda",
        fixed_date:[ 7,
          5 ] },
      { name:"Výročie Slovenského národného povstania",
        fixed_date:[ 8,
          29 ] },
      { name:"Deň Ústavy Slovenskej republiky",
        fixed_date:[ 9,
          1 ] },
      { name:"Sviatok Panny Márie Sedembolestnej",
        fixed_date:[ 9,
          15 ] },
      { name:"Sviatok všetkých svätých",
        fixed_date:[ 11,
          1 ] },
      { name:"Deň boja za slobodu a demokraciu",
        fixed_date:[ 11,
          17 ] },
      { name:"Štedrý deň",
        fixed_date:[ 12,
          24 ] },
      { name:"Prvý sviatok vianočný",
        fixed_date:[ 12,
          25 ] },
      { name:"Druhý sviatok vianočný",
        fixed_date:[ 12,
          26 ] } ] };
  data$7.PH;

  var data$6 = { PH:[ { name:"Новий рік",
        fixed_date:[ 1,
          1 ] },
      { name:"Різдво",
        fixed_date:[ 1,
          7 ] },
      { name:"Міжнародний жіночий день",
        fixed_date:[ 3,
          8 ] },
      { name:"Великдень",
        variable_date:"orthodox easter",
        offset:1 },
      { name:"День Праці 1",
        fixed_date:[ 5,
          1 ] },
      { name:"День Праці 2",
        fixed_date:[ 5,
          2 ] },
      { name:"День Перемоги",
        fixed_date:[ 5,
          9 ] },
      { name:"День Конституції України",
        fixed_date:[ 6,
          28 ] },
      { name:"День Незалежності України",
        fixed_date:[ 8,
          24 ] } ] };
  data$6.PH;

  var data$5 = { PH:[ { name:"New Year's Day",
        fixed_date:[ 1,
          1 ] },
      { name:"Memorial Day",
        variable_date:"lastMayMonday" },
      { name:"Independence Day",
        fixed_date:[ 7,
          4 ] },
      { name:"Labor Day",
        variable_date:"firstSeptemberMonday" },
      { name:"Veterans Day",
        fixed_date:[ 11,
          11 ] },
      { name:"Thanksgiving",
        variable_date:"firstNovemberThursday",
        offset:21 },
      { name:"Christmas Day",
        fixed_date:[ 12,
          25 ] } ],
    Alabama:{ _state_code:"al",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Robert E. Lee/Martin Luther King Birthday",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"George Washington/Thomas Jefferson Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Confederate Memorial Day",
          variable_date:"firstAprilMonday",
          offset:21 },
        { name:"Jefferson Davis' Birthday",
          variable_date:"firstJuneMonday" } ] },
    Alaska:{ _state_code:"ak",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Seward's Day",
          variable_date:"lastMarchMonday" },
        { name:"Alaska Day",
          fixed_date:[ 10,
            18 ] } ] },
    Arizona:{ _state_code:"az",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Dr. Martin Luther King Jr./Civil Rights Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] } ] },
    Arkansas:{ _state_code:"ar",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Dr. Martin Luther King Jr. and Robert E. Lee's Birthdays",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"George Washington's Birthday and Daisy Gatson Bates Day",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Eve",
          fixed_date:[ 12,
            24 ] },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] } ] },
    California:{ _state_code:"ca",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"César Chávez Day",
          fixed_date:[ 3,
            31 ] } ] },
    Colorado:{ _state_code:"co",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] } ] },
    Connecticut:{ _state_code:"ct",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Lincoln's Birthday",
          fixed_date:[ 2,
            12 ] },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 } ] },
    Delaware:{ _state_code:"de",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Day After Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:22 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 } ] },
    "District of Columbia":{ _state_code:"dc",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Emancipation Day",
          fixed_date:[ 4,
            16 ] } ] },
    Florida:{ _state_code:"fl",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Friday after Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:22 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] } ] },
    Georgia:{ _state_code:"ga",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Robert E. Lee's Birthday",
          variable_date:"firstNovemberThursday",
          offset:22 },
        { name:"Washington's Birthday",
          fixed_date:[ 12,
            24 ] },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Confederate Memorial Day",
          variable_date:"lastAprilMonday" } ] },
    Guam:{ _state_code:"gu",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Guam Discovery Day",
          fixed_date:[ 3,
            5 ] },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 },
        { name:"Liberation Day",
          fixed_date:[ 7,
            21 ] },
        { name:"All Souls' Day",
          fixed_date:[ 11,
            2 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Lady of Camarin Day",
          fixed_date:[ 12,
            8 ] },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] } ] },
    Hawaii:{ _state_code:"hi",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Prince Jonah Kuhio Kalanianaole Day",
          fixed_date:[ 3,
            26 ] },
        { name:"Kamehameha Day",
          fixed_date:[ 6,
            11 ] },
        { name:"Statehood Day",
          variable_date:"firstAugustFriday",
          offset:14 },
        { name:"Election Day",
          variable_date:"firstNovemberMonday",
          offset:1 } ] },
    Idaho:{ _state_code:"id",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr.-Idaho Human Rights Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] } ] },
    Illinois:{ _state_code:"il",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Lincoln's Birthday",
          fixed_date:[ 2,
            12 ] },
        { name:"Casimir Pulaski Day",
          variable_date:"firstMarchMonday" },
        { name:"Election Day",
          variable_date:"firstNovemberMonday",
          offset:1 } ] },
    Indiana:{ _state_code:"in",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Lincoln's Birthday",
          variable_date:"firstNovemberThursday",
          offset:22 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 },
        { name:"Primary Election Day",
          variable_date:"firstMayMonday",
          offset:1 },
        { name:"Election Day",
          variable_date:"firstNovemberMonday",
          offset:1 } ] },
    Iowa:{ _state_code:"ia",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Lincoln's Birthday",
          fixed_date:[ 2,
            12 ] } ] },
    Kansas:{ _state_code:"ks",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] } ] },
    Kentucky:{ _state_code:"ky",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Eve",
          fixed_date:[ 12,
            24 ] },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"New Year's Eve",
          fixed_date:[ 12,
            31 ] },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 } ] },
    Louisiana:{ _state_code:"la",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Mardi Gras",
          variable_date:"easter",
          offset:-47 },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 },
        { name:"Election Day",
          variable_date:"firstNovemberMonday",
          offset:1 } ] },
    Maine:{ _state_code:"me",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Patriots' Day",
          variable_date:"firstAprilMonday",
          offset:14 } ] },
    Maryland:{ _state_code:"md",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Native American Heritage Day",
          variable_date:"firstNovemberThursday",
          offset:22 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] } ] },
    Massachusetts:{ _state_code:"ma",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Patriots' Day",
          variable_date:"firstAprilMonday",
          offset:14 } ] },
    Michigan:{ _state_code:"mi",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Eve",
          fixed_date:[ 12,
            24 ] },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"New Year's Eve",
          fixed_date:[ 12,
            31 ] } ] },
    Minnesota:{ _state_code:"mn",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] } ] },
    Mississippi:{ _state_code:"ms",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King's and Robert E. Lee's Birthdays",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Confederate Memorial Day",
          variable_date:"lastAprilMonday" } ] },
    Missouri:{ _state_code:"mo",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Truman Day",
          fixed_date:[ 5,
            8 ] } ] },
    Montana:{ _state_code:"mt",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Election Day",
          variable_date:"firstNovemberMonday",
          offset:1 },
        { name:"Christmas Eve",
          fixed_date:[ 12,
            24 ] },
        { name:"New Year's Eve",
          fixed_date:[ 12,
            31 ] } ] },
    Nebraska:{ _state_code:"ne",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Arbor Day",
          variable_date:"lastAprilFriday" } ] },
    Nevada:{ _state_code:"nv",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Nevada Day",
          variable_date:"lastOctoberFriday" },
        { name:"Family Day",
          variable_date:"firstNovemberThursday",
          offset:22 } ] },
    "New Hampshire":{ _state_code:"nh",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Civil Rights Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Day after Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:22 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Election Day",
          variable_date:"firstNovemberMonday",
          offset:1 } ] },
    "New Jersey":{ _state_code:"nj",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Lincoln's Birthday",
          fixed_date:[ 2,
            12 ] },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 },
        { name:"Election Day",
          variable_date:"firstNovemberMonday",
          offset:1 } ] },
    "New Mexico":{ _state_code:"nm",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Day after Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:22 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] } ] },
    "New York":{ _state_code:"ny",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Lincoln's Birthday",
          fixed_date:[ 2,
            12 ] },
        { name:"Election Day",
          variable_date:"firstNovemberMonday",
          offset:1 } ] },
    "North Carolina":{ _state_code:"nc",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Day after Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:22 },
        { name:"Christmas Eve",
          fixed_date:[ 12,
            24 ] },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Day after Christmas",
          fixed_date:[ 12,
            26 ] },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 } ] },
    "North Dakota":{ _state_code:"nd",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] } ] },
    Ohio:{ _state_code:"oh",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] } ] },
    Oklahoma:{ _state_code:"ok",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Day after Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:22 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] } ] },
    Oregon:{ _state_code:"or",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] } ] },
    Pennsylvania:{ _state_code:"pa",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Flag Day",
          fixed_date:[ 6,
            14 ] } ] },
    "Puerto Rico":{ _state_code:"pr",
      PH:[ { name:"Día de Año Nuevo",
          fixed_date:[ 1,
            1 ] },
        { name:"Día de Reyes",
          fixed_date:[ 1,
            6 ] },
        { name:"Natalicio de Eugenio María de Hostos",
          variable_date:"firstJanuaryMonday",
          offset:7 },
        { name:"Natalicio de Martin Luther King, Jr.",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Día de los Presidentes",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Día de la Abolición de Esclavitud",
          fixed_date:[ 3,
            22 ] },
        { name:"Viernes Santo",
          variable_date:"easter",
          offset:-2 },
        { name:"Natalicio de José de Diego",
          variable_date:"firstAprilMonday",
          offset:14 },
        { name:"Recordación de los Muertos de la Guerra",
          variable_date:"lastMayMonday" },
        { name:"Día de la Independencia",
          fixed_date:[ 7,
            4 ] },
        { name:"Constitución de Puerto Rico",
          fixed_date:[ 7,
            25 ] },
        { name:"Natalicio de Dr. José Celso Barbosa",
          fixed_date:[ 7,
            27 ] },
        { name:"Día del Trabajo",
          variable_date:"firstSeptemberMonday" },
        { name:"Día de la Raza Descubrimiento de América",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Día del Veterano",
          fixed_date:[ 11,
            11 ] },
        { name:"Día del Descubrimiento de Puerto Rico",
          fixed_date:[ 11,
            19 ] },
        { name:"Día de Acción de Gracias",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Noche Buena",
          fixed_date:[ 12,
            24 ] },
        { name:"Día de Navidad",
          fixed_date:[ 12,
            25 ] } ] },
    "Rhode Island":{ _state_code:"ri",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Victory Day",
          variable_date:"firstAugustMonday",
          offset:7 } ] },
    "South Carolina":{ _state_code:"sc",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Confederate Memorial Day",
          fixed_date:[ 5,
            10 ] } ] },
    "South Dakota":{ _state_code:"sd",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Native American Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] } ] },
    Tennessee:{ _state_code:"tn",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Eve",
          fixed_date:[ 12,
            24 ] },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 } ] },
    Texas:{ _state_code:"tx",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Friday after Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:22 },
        { name:"Christmas Eve",
          fixed_date:[ 12,
            24 ] },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Day after Christmas",
          fixed_date:[ 12,
            26 ] } ] },
    "United States Virgin Islands":{ _state_code:"vi",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Virgin Islands-Puerto Rico Friendship Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Three Kings Day",
          fixed_date:[ 1,
            6 ] },
        { name:"Transfer Day",
          fixed_date:[ 3,
            31 ] },
        { name:"Holy Thursday",
          variable_date:"easter",
          offset:-3 },
        { name:"Good Friday",
          variable_date:"easter",
          offset:-2 },
        { name:"Easter Monday",
          variable_date:"easter",
          offset:1 },
        { name:"Emancipation Day",
          fixed_date:[ 7,
            3 ] },
        { name:"Hurricane Supplication Day",
          variable_date:"firstJulyMonday",
          offset:21 },
        { name:"Hurricane Thanksgiving",
          fixed_date:[ 10,
            25 ] },
        { name:"Liberty Day",
          fixed_date:[ 11,
            1 ] },
        { name:"Christmas Second Day",
          fixed_date:[ 12,
            26 ] },
        { name:"New Year's Eve",
          fixed_date:[ 12,
            31 ] } ] },
    Utah:{ _state_code:"ut",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Pioneer Day",
          fixed_date:[ 7,
            24 ] } ] },
    Vermont:{ _state_code:"vt",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Town Meeting Day",
          variable_date:"firstMarchTuesday" },
        { name:"Battle of Bennington",
          variable_date:"firstAugustMonday",
          offset:14 } ] },
    Virginia:{ _state_code:"va",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Election Day",
          variable_date:"firstNovemberMonday",
          offset:1 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] } ] },
    Washington:{ _state_code:"wa",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] } ] },
    "West Virginia":{ _state_code:"wv",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"West Virginia Day",
          fixed_date:[ 6,
            20 ] },
        { name:"Lincoln's Day",
          variable_date:"firstNovemberThursday",
          offset:22 } ] },
    Wisconsin:{ _state_code:"wi",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] },
        { name:"Primary Election Day",
          variable_date:"firstAugustTuesday",
          offset:7 },
        { name:"Election Day",
          variable_date:"firstNovemberMonday",
          offset:1 } ] },
    Wyoming:{ _state_code:"wy",
      PH:[ { name:"New Year's Day",
          fixed_date:[ 1,
            1 ] },
        { name:"Martin Luther King, Jr. Day",
          variable_date:"firstJanuaryMonday",
          offset:14 },
        { name:"Washington's Birthday",
          variable_date:"firstFebruaryMonday",
          offset:14 },
        { name:"Memorial Day",
          variable_date:"lastMayMonday" },
        { name:"Independence Day",
          fixed_date:[ 7,
            4 ] },
        { name:"Labor Day",
          variable_date:"firstSeptemberMonday" },
        { name:"Columbus Day",
          variable_date:"firstOctoberMonday",
          offset:7 },
        { name:"Veterans Day",
          fixed_date:[ 11,
            11 ] },
        { name:"Thanksgiving",
          variable_date:"firstNovemberThursday",
          offset:21 },
        { name:"Christmas Day",
          fixed_date:[ 12,
            25 ] } ] } };
  data$5.PH;
  data$5.Alabama;
  data$5.Alaska;
  data$5.Arizona;
  data$5.Arkansas;
  data$5.California;
  data$5.Colorado;
  data$5.Connecticut;
  data$5.Delaware;
  data$5.Florida;
  data$5.Georgia;
  data$5.Guam;
  data$5.Hawaii;
  data$5.Idaho;
  data$5.Illinois;
  data$5.Indiana;
  data$5.Iowa;
  data$5.Kansas;
  data$5.Kentucky;
  data$5.Louisiana;
  data$5.Maine;
  data$5.Maryland;
  data$5.Massachusetts;
  data$5.Michigan;
  data$5.Minnesota;
  data$5.Mississippi;
  data$5.Missouri;
  data$5.Montana;
  data$5.Nebraska;
  data$5.Nevada;
  data$5.Ohio;
  data$5.Oklahoma;
  data$5.Oregon;
  data$5.Pennsylvania;
  data$5.Tennessee;
  data$5.Texas;
  data$5.Utah;
  data$5.Vermont;
  data$5.Virginia;
  data$5.Washington;
  data$5.Wisconsin;
  data$5.Wyoming;

  var data$4 = { PH:[ { name:"Tết Dương Lịch",
        fixed_date:[ 1,
          1 ] },
      { name:"Ngày Quốc tế Phụ nữ",
        fixed_date:[ 3,
          8 ] },
      { name:"Ngày thành lập Đoàn Thanh niên Cộng sản Hồ Chí Minh",
        fixed_date:[ 3,
          26 ] },
      { name:"Ngày Quốc tế Thiếu nhi",
        fixed_date:[ 6,
          1 ] },
      { name:"Ngày Nhà giáo Việt Nam",
        fixed_date:[ 11,
          20 ] },
      { name:"Ngày Giải phóng miền Nam, Thống nhất Đất nước",
        fixed_date:[ 4,
          30 ] },
      { name:"Ngày Quốc tế lao động",
        fixed_date:[ 5,
          1 ] },
      { name:"Quốc Khánh",
        fixed_date:[ 9,
          2 ] },
      { name:"Lễ Giáng Sinh",
        fixed_date:[ 12,
          25 ] } ] };
  data$4.PH;

  var data$3 = { PH:[ { name:"New Year",
        fixed_date:[ 1,
          1 ] } ],
    SH:[ { 2020:[ 6,
          21,
          9,
          23 ],
        2021:[ 6,
          21,
          9,
          23 ],
        2022:[ 6,
          21,
          9,
          23 ],
        2023:[ 6,
          21,
          9,
          23 ],
        2024:[ 6,
          21,
          9,
          23 ],
        2025:[ 6,
          21,
          9,
          23 ],
        2026:[ 6,
          21,
          9,
          23 ],
        2027:[ 6,
          21,
          9,
          23 ],
        2028:[ 6,
          21,
          9,
          23 ],
        2029:[ 6,
          21,
          9,
          23 ],
        2030:[ 6,
          21,
          9,
          23 ],
        2031:[ 6,
          21,
          9,
          23 ],
        2032:[ 6,
          21,
          9,
          23 ],
        name:"Summer" } ] };
  data$3.PH;
  data$3.SH;

  var holiday_definitions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ar: data$A,
    at: data$z,
    au: data$y,
    be: data$x,
    br: data$w,
    ca: data$v,
    ch: data$u,
    ci: data$t,
    cz: data$s,
    de: data$r,
    dk: data$q,
    es: data$p,
    fi: data$o,
    fr: data$n,
    gb: data$m,
    gr: data$l,
    hr: data$k,
    hu: data$j,
    ie: data$i,
    it: data$h,
    jp: data$g,
    nl: data$f,
    no: data$e,
    nz: data$d,
    pl: data$c,
    ro: data$b,
    ru: data$a,
    se: data$9,
    si: data$8,
    sk: data$7,
    ua: data$6,
    us: data$5,
    vn: data$4,
    xa: data$3
  });

  var data$2 = { "assuming ok for ko":{ daytime:"sunrise-sunset",
      spring:"Mar-May",
      summer:"Jun-Aug",
      autumn:"Sep-Nov",
      winter:"Dec-Feb",
      _:"-",
      "=":"-",
      "frühling":"Mar-May",
      "frühjahr":"Mar-May",
      sommer:"Jun-Aug",
      herbst:"Sep-Nov",
      gesloten:"off",
      feestdag:"PH",
      feestdagen:"PH",
      m:"Mo",
      w:"We",
      f:"Fr",
      primavera:"Mar-May",
      estate:"Jun-Aug",
      autunno:"Sep-Nov",
      inverno:"Dec-Feb" },
    "please use English written ok for ko":{ "(?:an )?feiertag(?:s|en?)?":"PH" },
    "please use off for ko":{ "ruhetage?":"off",
      geschlossen:"off",
      geschl:"off",
      except:"off" },
    "please use ok for workday":{ wd:"Mo-Fr",
      "on work days?":"Mo-Fr",
      "weekdays?":"Mo-Fr",
      "werktags?":"Mo-Sa",
      vardagar:"Mo-Fr" },
    "omit hour keyword":{ h:"" },
    "omit ko":{ season:"",
      hs:"",
      hrs:"",
      hours:"",
      uhr:"",
      "geöffnet":"",
      zwischen:"",
      ist:"",
      durchgehend:"",
      "öffnungszeit(?:en)?:?":"" },
    "omit tag key":{ "opening_hours\\s*=":"" },
    "omit wrong keyword open end":{ from:"",
      ab:"",
      von:"" },
    "assuming open end for ko":{ "(?:bis|till?|-|–)? ?(?:open ?end|late)":"+" },
    "please use ok for uncertainty":{ "~":"-",
      "～":"-" },
    "please use fallback rule":{ otherwise:"||" },
    "please use ok for missing data":{ "\\?":"" },
    "please use ok for ko":{ "→":"-",
      "−":"-",
      "—":"-",
      "ー":"-",
      to:"-",
      "до":"-",
      a:"-",
      as:"-",
      "á":"-",
      "ás":"-",
      "às":"-",
      ate:"-",
      "till?":"-",
      until:"-",
      through:"-",
      and:",",
      "&":",",
      "：":":",
      "'":"\"",
      always:"24/7",
      "always open":"24/7",
      "always closed":"closed",
      nonstop:"24/7",
      "24x7":"24/7",
      anytime:"24/7",
      "all day":"24/7",
      daily:"Mo-Su",
      everyday:"Mo-Su",
      "every day":"Mo-Su",
      "all days":"Mo-Su",
      "7j/7":"Mo-Su",
      "7/7":"Mo-Su",
      "7days":"Mo-Su",
      "7 days":"Mo-Su",
      "7 days a week":"Mo-Su",
      "7 days/week":"Mo-Su",
      "24 hours 7 days a week":"24/7",
      "24 hours":"00:00-24:00",
      midday:"12:00",
      midnight:"00:00",
      "(?:public )?holidays?":"PH",
      "(?:one )?day after public holiday":"PH +1 day",
      "(?:one )?day before public holiday":"PH -1 day",
      "school ?holidays?":"SH",
      "weekends?":"Sa,Su",
      daylight:"sunrise-sunset",
      "on(?:_| )?appointments?":"\"on appointment\"",
      "by(?:_| )?appointments?":"\"by appointment\"",
      "nach(?: |_)vereinbarung":"\"Nach Vereinbarung\"",
      "nach(?: |_)absprache":"\"Nach Absprache\"",
      bis:"-",
      "täglich":"Mo-Su",
      "(?:schul)?ferien":"SH",
      "(?:an|nur)? ?sonn-?(?: und |/)feiertag(?:s|en?)?":"PH,Su",
      und:",",
      u:",",
      auch:",",
      "fermé":"off",
      et:",",
      "à":"-",
      "jours fériés":"PH",
      sundown:"sunset",
      "morgendämmerung":"dawn",
      "abenddämmerung":"dusk",
      sonnenaufgang:"sunrise",
      sonnenuntergang:"sunset",
      ostern:"easter" },
    "please use English abbreviation ok for so":{ so:"Su" },
    "please use English abbreviation ok for ko":{ sun:"Su",
      "sundays?":"Su",
      mon:"Mo",
      "mondays?":"Mo",
      "tues?":"Tu",
      "tuesdays?":"Tu",
      "weds?":"We",
      "wednesdays?":"We",
      thu:"Th",
      "thurs?":"Th",
      "thursdays?":"Th",
      fri:"Fr",
      "fridays?":"Fr",
      sat:"Sa",
      "saturdays?":"Sa",
      son:"Su",
      "sonn-":"Su",
      "sonntags?":"Su",
      "montags?":"Mo",
      di:"Tu",
      "die?":"Tu",
      "dienstags?":"Tu",
      mi:"We",
      "mit?":"We",
      "mittwochs?":"We",
      "don?":"Th",
      "donnerstags?":"Th",
      fre:"Fr",
      "freitags?":"Fr",
      sam:"Sa",
      "samstags?":"Sa",
      dim:"Su",
      dimanche:"Su",
      "lun?":"Mo",
      lundi:"Mo",
      mardi:"Tu",
      mer:"We",
      mercredi:"We",
      "jeu?":"Th",
      jeudi:"Th",
      "ven?":"Fr",
      vendredi:"Fr",
      samedi:"Sa",
      "zon?":"Su",
      zontag:"Su",
      zondag:"Su",
      maandag:"Mo",
      din:"Tu",
      dinsdag:"Tu",
      "woe?":"We",
      woensdag:"We",
      donderdag:"Th",
      "vri?":"Fr",
      vrijdag:"Fr",
      "zat?":"Sa",
      zaterdag:"Sa",
      "neděle":"Su",
      ne:"Su",
      "pondělí":"Mo",
      po:"Mo",
      "úterý":"Tu",
      "út":"Tu",
      "středa":"We",
      st:"We",
      "čtvrtek":"Th",
      "čt":"Th",
      "pátek":"Fr",
      "pá":"Fr",
      sobota:"Sa",
      martes:"Tu",
      "miércoles":"We",
      jueves:"Th",
      viernes:"Fr",
      "sábado":"Sa",
      domingo:"Su",
      lunes:"Mo",
      selasa:"Su",
      rabu:"Mo",
      kami:"Tu",
      jumat:"We",
      sabtu:"Th",
      minggu:"Fr",
      senin:"Sa",
      "söndag":"Su",
      "söndagar":"Su",
      "måndag":"Mo",
      ma:"Mo",
      tisdag:"Tu",
      onsdag:"We",
      torsdag:"Th",
      fredag:"Fr",
      "lördag":"Sa",
      "lördagar":"Sa",
      niedziela:"Su",
      niedz:"Su",
      n:"Su",
      ndz:"Su",
      "poniedziałek":"Mo",
      poniedzialek:"Mo",
      pon:"Mo",
      pn:"Mo",
      wtorek:"Tu",
      wt:"Tu",
      "środa":"We",
      sroda:"We",
      "śr":"We",
      sr:"We",
      czwartek:"Th",
      czw:"Th",
      cz:"Th",
      "piątek":"Fr",
      piatek:"Fr",
      pt:"Fr",
      sob:"Sa",
      "воскресенье":"Su",
      "Вс":"Su",
      "voskresen'ye":"Su",
      "понедельник":"Mo",
      "Пн":"Mo",
      "ponedel'nik":"Mo",
      "вторник":"Tu",
      vtornik:"Tu",
      "среда":"We",
      sreda:"We",
      "четверг":"Th",
      chetverk:"Th",
      "пятница":"Fr",
      pyatnitsa:"Fr",
      "суббота":"Sa",
      subbota:"Sa",
      "søndag":"Su",
      mandag:"Mo",
      tirsdag:"Tu",
      "lørdag":"Sa",
      dom:"Su",
      "domenica?":"Su",
      "domeniche?":"Su",
      lun:"Mo",
      "lunedì?":"Mo",
      "mar?":"Tu",
      "martedì?":"Tu",
      "mer?":"We",
      "mercoledì?":"We",
      gio:"Th",
      "giovedì?":"Th",
      ven:"Fr",
      "venerdì?":"Fr",
      sab:"Sa",
      "sabato?":"Sa",
      "jänner":"Jan",
      january:"Jan",
      february:"Feb",
      march:"Mar",
      april:"Apr",
      "june?":"Jun",
      "july?":"Jul",
      august:"Aug",
      september:"Sep",
      sept:"Sep",
      october:"Oct",
      november:"Nov",
      december:"Dec",
      januar:"Jan",
      februar:"Feb",
      "märz?":"Mar",
      maerz:"Mar",
      mai:"May",
      juni:"Jun",
      juli:"Jul",
      okt:"Oct",
      oktober:"Oct",
      dez:"Dec",
      dezember:"Dec",
      janvier:"Jan",
      "février":"Feb",
      "fév":"Feb",
      mars:"Mar",
      avril:"Apr",
      avr:"Apr",
      juin:"Jun",
      juillet:"Jul",
      "août":"Aug",
      "aoû":"Aug",
      septembre:"Sep",
      octobre:"Oct",
      novembre:"Nov",
      "décembre":"Dec",
      januari:"Jan",
      februari:"Feb",
      maart:"Mar",
      mei:"May",
      augustus:"Aug",
      gennaio:"Jan",
      febbraio:"Feb",
      marzo:"Mar",
      aprile:"Apr",
      "giugno?":"Jun",
      "luglio?":"Jul",
      agosto:"Aug",
      settembre:"Sep",
      ottobre:"Oct",
      dicembre:"Dec" },
    "please use ok for similar looking ko":{ "оff":"off" },
    "please use 24 hours time for ko":{ pm:"pm",
      "p.m.":"pm",
      "рм":"pm",
      am:"am",
      "a.m.":"am",
      "ам":"am" },
    "please use restriction comment time for ko":{ damen:"open \"Damen\"",
      herren:"open \"Herren\"" },
    "please use ok for typographically correct":{ "–":"-",
      "„":"\"",
      "“":"\"",
      "”":"\"",
      "«":"\"",
      "»":"\"",
      "‚":"\"",
      "‘":"\"",
      "’":"\"",
      "「":"\"",
      "」":"\"",
      "『":"\"",
      "』":"\"" } };

  var data$1 = { "unexpected token":"Unexpected token: \"{{token}}\" This means that the syntax is not valid at that point or it is currently not supported.",
    "no string":"The value (first parameter) is not a string.",
    nothing:"The value contains nothing meaningful which can be parsed.",
    "nothing useful":"This rule does not contain anything useful. Please remove this empty rule.",
    "combine rules":"Separate rules detected each of which only consists of a time selector. These rules should be written as one rule by combining them using \"{{ok}}\".",
    "value ends with token":"The value ends with \"{{token}}\". Please either continue after \"{{token}}\" or remove \"{{token}}\".",
    "programmers joke":"Might it be possible that you are a programmer and adding a semicolon after each statement is hardwired in your muscle memory ;) ? The thing is that the semicolon in the opening_hours syntax is defined as rule separator. So for compatibility reasons you should omit this last semicolon.",
    "interpreted as year":"The number {{number}} will be interpreted as year. This is probably not intended. Times can be specified as \"12:00\".",
    "rule before fallback empty":"Rule before fallback rule does not contain anything useful",
    "hour min separator":"Please use \":\" as hour/minute-separator",
    "warnings severity":"The parameter optional_conf_parm[\"warnings_severity\"] must be an integer number between 0 and 7 (inclusive). Given {{severity}}, expected one of the following numbers: {{allowed}}.",
    "optional conf parm type":"The optional_conf_parm parameter is of unknown type. Given {{given}}",
    "conf param tag key missing":"The optional_conf_parm[\"tag_key\"] is missing, required by optional_conf_parm[\"map_value\"].",
    "conf param mode invalid":"The optional_conf_parm[\"mode\"] parameter is a invalid number. Gave {{given}}, expected one of the following numbers: {{allowed}}.",
    "conf param unknown type":"The optional_conf_parm[\"{{key}}\"] parameter is of unknown type. Given {{given}}, expected {{expected}}.",
    "library bug":"An error occurred during evaluation of the value \"{{value}}\". Please file a bug report or pull request: {{url}}.{{message}}",
    "library bug PR only":"An error occurred during evaluation of the value \"{{value}}\". Please submit a pull request: {{url}}.{{message}}",
    "use multi":"You have used {{count}} {{part2}} Rules can be separated by \";\".",
    "selector multi 2a":"{{what}} in one rule. You may only use one in one rule.",
    "selector multi 2b":"not connected {{what}} in one rule. This is probably an error. Equal selector types can (and should) always be written in conjunction separated by comma. Example for time ranges \"12:00-13:00,15:00-18:00\". Example for weekdays \"Mo-We,Fr\".",
    "selector state":"state keywords",
    comments:"comments",
    "holiday ranges":"holiday ranges",
    months:"months",
    weekdays:"weekdays",
    ranges:"ranges",
    "default state":"This rule which changes the default state (which is closed) for all following rules is not the first rule. The rule will overwrite all previous rules. It can be legitimate to change the default state to open for example and then only specify for which times the facility is closed.",
    vague:"This rule is not very explicit because there is no time selector being used. A time selector is the part specifying hours when the object is opened, for example \"10:00-19:00\". Please add a time selector to this rule or use a comment to make it more explicit.",
    "empty comment":"You have used an empty comment. Please either write something in the comment or use the keyword unknown instead.",
    separator_for_readability:"You have used the optional symbol <separator_for_readability> in the wrong place. Please check the syntax specification to see where it could be used or remove it.",
    "strange 24/7":"You used 24/7 in a way that is probably not interpreted as \"24 hours 7 days a week\". For correctness you might want to use \"open\" or \"closed\" for this rule and then write your exceptions which should achieve the same goal and is more clear e.g. \"open; Mo 12:00-14:00 off\".",
    "public holiday":"There was no PH (public holiday) specified. This is not very explicit.{{part2}} Please either append a \"PH off\" rule if the amenity is closed on all public holidays or use something like \"Sa,Su,PH 12:00-16:00\" to say that on Saturdays, Sundays and on public holidays the amenity is open 12:00-16:00. Be careful with opening hours like \"Fr-Sa 18:00-06:00\" because \"PH off\" applies to 00:00-24:00. So \"Fr-Sa 18:00-06:00; PH 18:00-06:00 off\" is probably what you want. If the amenity is open everyday including public holidays then you can make this explicit by writing \"Mo-Su,PH\". If you are not certain try to find it out. If you can’t then do not add PH to the value and ignore this warning.",
    "public holiday part2":" Unfortunately the tag key (e.g. \"opening_hours\", or \"lit\") is unknown to opening_hours.js. This warning only applies to the key {{keys}}. If your value is for that key than read on. If not you can ignore the following.",
    "additional_rule_separator not used after time wrapping midnight":"This rule overwrites parts of the previous rule. This happens because normal rules apply to the whole day and overwrite any definition made by previous rules. You can make this rule an additional rule by using a \",\" instead of the normal \";\" to separate the rules. Note that the overwriting can also be desirable in which case you can ignore this warning.",
    "additional rule which evaluates to closed":"This rule will be evaluated as closed but it was specified as additional rule. It should be specified as normal rule using \";\" as rule separator. See https://wiki.openstreetmap.org/wiki/Key:opening_hours/specification#explain:rule_modifier:closed.",
    switched:"The selector \"{{first}}\" was switched with the selector \"{{second}}\" for readability and compatibility reasons.",
    "no colon after":"Please don’t use \":\" after {{token}}.",
    "number -5 to 5":"Number between -5 and 5 (except 0) expected.",
    "one weekday constraint":"You can not use more than one constrained weekday in a month range",
    "range constrained weekdays":"You can not use a range of constrained weekdays in a month range",
    expected:"\"{{symbol}}\" expected.",
    "range zero":"You can not use {{type}} ranges with period equals zero.",
    "period one year+":"Please don’t use {{type}} ranges with period equals one. If you want to express that a facility is open starting from a year without limit use \"<year>+\".",
    "period one":"Please don’t use {{type}} ranges with period equals one.",
    "month 31":"The day for {{month}} must be between 1 and 31.",
    "month 30":"Month {{month}} doesn't have 31 days. The last day of {{month}} is day 30.",
    "month feb":"Month {{month}} either has 28 or 29 days (leap years).",
    "point in time":"hyphen (-) or open end (+) in time range {{calc}}expected. For working with points in time, the mode for {{libraryname}} has to be altered. Maybe wrong tag?",
    calculation:"calculation",
    "time range continue":"Time range does not continue as expected",
    "period continue":"Time period does not continue as expected. Example \"/01:30\".",
    "time range mode":"{{libraryname}} is running in \"time range mode\". Found point in time.",
    "point in time mode":"{{libraryname}} is running in \"points in time mode\". Found time range.",
    "outside current day":"Time range starts outside of the current day",
    "two midnights":"Time spanning more than two midnights not supported",
    "without minutes":"Time range without minutes specified. Not very explicit! Please use this syntax instead \"{{syntax}}\".",
    "outside day":"Time range starts outside of the current day",
    "zero calculation":"Adding zero in a variable time calculation does not change the variable time. Please omit the calculation (example: \"sunrise-(sunset-00:00)\").",
    "calculation syntax":"Calculation with variable time is not in the right syntax",
    missing:"Missing \"{{symbol}}\"",
    "(time)":"(time)",
    "bad range":"Bad range: {{from}}-{{to}}",
    "] or more numbers":"\"]\" or more numbers expected.",
    "additional rule no sense":"An additional rule does not make sense here. Just use a \";\" as rule separator. See https://wiki.openstreetmap.org/wiki/Key:opening_hours/specification#explain:additional_rule_separator",
    "unexpected token weekday range":"Unexpected token in weekday range: {{token}}",
    "max differ":"There should be no reason to differ more than {{maxdiffer}} days from a {{name}}. If so tell us …",
    "adding 0":"Adding 0 does not change the date. Please omit this.",
    "unexpected token holiday":"Unexpected token (holiday parser): {{token}}",
    "no holiday definition":"There are no holidays ({{name}}) defined for country {{cc}}.",
    "no holiday definition state":"There are no holidays ({{name}}) defined for country {{cc}} and state {{state}}.",
    "no country code":"Country code missing which is needed to select the correct holidays (see README how to provide it)",
    "no SH definition":"School holiday {{name}}not defined for the year {{year}}.",
    "movable no formula":"Movable day {{name}} can not not be calculated. Please add the formula how to calculate it.",
    "movable not in year":"The movable day {{name}} plus {{days}} days is not in the year of the movable day anymore. Currently not supported.",
    "year range one year":"A year range in which the start year is equal to the end year does not make sense. Please remove the end year. E.g. \"{{year}} May 23\"",
    "year range reverse":"A year range in which the start year is greater than the end year does not make sense. Please turn it over.",
    "year past":"The year is in the past.",
    "unexpected token year range":"Unexpected token in year range: {{token}}",
    "week range reverse":"You have specified a week range in reverse order or leaping over a year. This is (currently) not supported.",
    "week negative":"You have specified a week date less then one. A valid week date range is 1-53.",
    "week exceed":"You have specified a week date greater then 53. A valid week date range is 1-53.",
    "week period less than 2":"You have specified a week period which is less than two. If you want to select the whole range from week {{weekfrom}} to week {{weekto}} then just omit the \"/{{period}}\".",
    "week period greater than 26":"You have specified a week period which is greater than 26. 26.5 is the half of the maximum 53 week dates per year so a week date period greater than 26 would only apply once per year. Please specify the week selector as \"week {{weekfrom}}\" if that is what you want to express.",
    "unexpected token week range":"Unexpected token in week range: {{token}}",
    "unexpected token month range":"Unexpected token in month range: {{token}}",
    "day range reverse":"Range in wrong order. From day is greater than to day.",
    "open end":"Specified as open end. Closing time was guessed.",
    "date parameter needed":"Date parameter needed.",
    "assuming ok for ko":"Assuming \"{{ok}}\" for \"{{ko}}\".",
    "please use ok for ko":"Please use notation \"{{ok}}\" for \"{{ko}}\".",
    "please use ok for similar looking ko":"Please use notation \"{{ok}}\" for \"{{ko}}\". Those characters look very similar but are not the same!",
    "rant degree sign used for zero":"Note that this is not a (superscript) zero but a degree sign which is misused as zero. A superscript zero is defined in Unicode (°) and would have been more appropriate/uniform here. But note that the use of none-ASCII digits is not allowed.",
    "please use English written ok for ko":"Please use the English written \"{{ok}}\" for \"{{ko}}\".",
    "please use English abbreviation ok for ko":"Please use the English abbreviation \"{{ok}}\" for \"{{ko}}\".",
    "please use English abbreviation ok for so":"Please use the English abbreviation \"{{ok}}\" for \"{{ko}}\". Note that it might also mean Saturday in Polish.",
    "please use off for ko":"Please use \"{{ok}}\" for \"{{ko}}\". Example: \"Mo-Fr 08:00-12:00; Tu off\".",
    "please use ok for workday":"Assuming \"{{ok}}\" for \"{{ko}}\". Please avoid using \"workday\": https://wiki.openstreetmap.org/wiki/Talk:Key:opening_hours#need_syntax_for_holidays_and_workingdays",
    "omit hour keyword":"Please omit \"{{ko}}\" or use a colon instead. Example: \"12:00-14:00\".",
    "omit ko":"Please omit \"{{ko}}\".",
    "omit tag key":"Please omit \"{{ko}}\". The tag key must not be in the tag value.",
    "omit wrong keyword open end":"Please omit \"{{ko}}\". The tag key must not be in the tag value.",
    "assuming open end for ko":"Assuming \"{{ok}}\" (open end time) for \"{{ko}}\". Example: \"12:00+\".",
    "please use ok for uncertainty":"Please use notation \"{{ok}}\" for \"{{ko}}\". If there is reason to suspect uncertainty consider adding a comment. Example: 12:00-14:00 \"only on sunshine\".",
    "please use fallback rule":"Please use notation \"{{ok}}\" (Fallback rule) for \"{{ko}}\". Example: Mo-Fr 12:00-14:00; PH off || \"by appointment\"",
    "please use ok for missing data":"Please consider adding a FIXME tag instead.",
    "please use 24 hours time for ko":"Please use time format in 24 hours notation instead of the legacy 12 hours variant. If the 12 hours variant is used you might have to convert the hours to the 24 hours notation.",
    "please use restriction comment time for ko":"It looks like you might want to define additional restrictions. If that is the case and they can not be expressed by other syntax elements then you could use a comment together with the `open` keyword. Example: open \"female only\"",
    "please use ok for typographically correct":"Please use notation \"{{ok}}\" for \"{{ko}}\". Although using \"{{ko}}\" is typographical correct, it is not defined in the opening_hours syntax. Correct typography should be done on application level …" };

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var suncalc = {exports: {}};

  /*
   (c) 2011-2015, Vladimir Agafonkin
   SunCalc is a JavaScript library for calculating sun/moon position and light phases.
   https://github.com/mourner/suncalc
  */

  var hasRequiredSuncalc;

  function requireSuncalc () {
  	if (hasRequiredSuncalc) return suncalc.exports;
  	hasRequiredSuncalc = 1;
  	(function (module, exports) {
  		(function () {
  		// shortcuts for easier to read formulas

  		var PI   = Math.PI,
  		    sin  = Math.sin,
  		    cos  = Math.cos,
  		    tan  = Math.tan,
  		    asin = Math.asin,
  		    atan = Math.atan2,
  		    acos = Math.acos,
  		    rad  = PI / 180;

  		// sun calculations are based on http://aa.quae.nl/en/reken/zonpositie.html formulas


  		// date/time constants and conversions

  		var dayMs = 1000 * 60 * 60 * 24,
  		    J1970 = 2440588,
  		    J2000 = 2451545;

  		function toJulian(date) { return date.valueOf() / dayMs - 0.5 + J1970; }
  		function fromJulian(j)  { return new Date((j + 0.5 - J1970) * dayMs); }
  		function toDays(date)   { return toJulian(date) - J2000; }


  		// general calculations for position

  		var e = rad * 23.4397; // obliquity of the Earth

  		function rightAscension(l, b) { return atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l)); }
  		function declination(l, b)    { return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l)); }

  		function azimuth(H, phi, dec)  { return atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi)); }
  		function altitude(H, phi, dec) { return asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H)); }

  		function siderealTime(d, lw) { return rad * (280.16 + 360.9856235 * d) - lw; }

  		function astroRefraction(h) {
  		    if (h < 0) // the following formula works for positive altitudes only.
  		        h = 0; // if h = -0.08901179 a div/0 would occur.

  		    // formula 16.4 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
  		    // 1.02 / tan(h + 10.26 / (h + 5.10)) h in degrees, result in arc minutes -> converted to rad:
  		    return 0.0002967 / Math.tan(h + 0.00312536 / (h + 0.08901179));
  		}

  		// general sun calculations

  		function solarMeanAnomaly(d) { return rad * (357.5291 + 0.98560028 * d); }

  		function eclipticLongitude(M) {

  		    var C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M)), // equation of center
  		        P = rad * 102.9372; // perihelion of the Earth

  		    return M + C + P + PI;
  		}

  		function sunCoords(d) {

  		    var M = solarMeanAnomaly(d),
  		        L = eclipticLongitude(M);

  		    return {
  		        dec: declination(L, 0),
  		        ra: rightAscension(L, 0)
  		    };
  		}


  		var SunCalc = {};


  		// calculates sun position for a given date and latitude/longitude

  		SunCalc.getPosition = function (date, lat, lng) {

  		    var lw  = rad * -lng,
  		        phi = rad * lat,
  		        d   = toDays(date),

  		        c  = sunCoords(d),
  		        H  = siderealTime(d, lw) - c.ra;

  		    return {
  		        azimuth: azimuth(H, phi, c.dec),
  		        altitude: altitude(H, phi, c.dec)
  		    };
  		};


  		// sun times configuration (angle, morning name, evening name)

  		var times = SunCalc.times = [
  		    [-0.833, 'sunrise',       'sunset'      ],
  		    [  -0.3, 'sunriseEnd',    'sunsetStart' ],
  		    [    -6, 'dawn',          'dusk'        ],
  		    [   -12, 'nauticalDawn',  'nauticalDusk'],
  		    [   -18, 'nightEnd',      'night'       ],
  		    [     6, 'goldenHourEnd', 'goldenHour'  ]
  		];

  		// adds a custom time to the times config

  		SunCalc.addTime = function (angle, riseName, setName) {
  		    times.push([angle, riseName, setName]);
  		};


  		// calculations for sun times

  		var J0 = 0.0009;

  		function julianCycle(d, lw) { return Math.round(d - J0 - lw / (2 * PI)); }

  		function approxTransit(Ht, lw, n) { return J0 + (Ht + lw) / (2 * PI) + n; }
  		function solarTransitJ(ds, M, L)  { return J2000 + ds + 0.0053 * sin(M) - 0.0069 * sin(2 * L); }

  		function hourAngle(h, phi, d) { return acos((sin(h) - sin(phi) * sin(d)) / (cos(phi) * cos(d))); }
  		function observerAngle(height) { return -2.076 * Math.sqrt(height) / 60; }

  		// returns set time for the given sun altitude
  		function getSetJ(h, lw, phi, dec, n, M, L) {

  		    var w = hourAngle(h, phi, dec),
  		        a = approxTransit(w, lw, n);
  		    return solarTransitJ(a, M, L);
  		}


  		// calculates sun times for a given date, latitude/longitude, and, optionally,
  		// the observer height (in meters) relative to the horizon

  		SunCalc.getTimes = function (date, lat, lng, height) {

  		    height = height || 0;

  		    var lw = rad * -lng,
  		        phi = rad * lat,

  		        dh = observerAngle(height),

  		        d = toDays(date),
  		        n = julianCycle(d, lw),
  		        ds = approxTransit(0, lw, n),

  		        M = solarMeanAnomaly(ds),
  		        L = eclipticLongitude(M),
  		        dec = declination(L, 0),

  		        Jnoon = solarTransitJ(ds, M, L),

  		        i, len, time, h0, Jset, Jrise;


  		    var result = {
  		        solarNoon: fromJulian(Jnoon),
  		        nadir: fromJulian(Jnoon - 0.5)
  		    };

  		    for (i = 0, len = times.length; i < len; i += 1) {
  		        time = times[i];
  		        h0 = (time[0] + dh) * rad;

  		        Jset = getSetJ(h0, lw, phi, dec, n, M, L);
  		        Jrise = Jnoon - (Jset - Jnoon);

  		        result[time[1]] = fromJulian(Jrise);
  		        result[time[2]] = fromJulian(Jset);
  		    }

  		    return result;
  		};


  		// moon calculations, based on http://aa.quae.nl/en/reken/hemelpositie.html formulas

  		function moonCoords(d) { // geocentric ecliptic coordinates of the moon

  		    var L = rad * (218.316 + 13.176396 * d), // ecliptic longitude
  		        M = rad * (134.963 + 13.064993 * d), // mean anomaly
  		        F = rad * (93.272 + 13.229350 * d),  // mean distance

  		        l  = L + rad * 6.289 * sin(M), // longitude
  		        b  = rad * 5.128 * sin(F),     // latitude
  		        dt = 385001 - 20905 * cos(M);  // distance to the moon in km

  		    return {
  		        ra: rightAscension(l, b),
  		        dec: declination(l, b),
  		        dist: dt
  		    };
  		}

  		SunCalc.getMoonPosition = function (date, lat, lng) {

  		    var lw  = rad * -lng,
  		        phi = rad * lat,
  		        d   = toDays(date),

  		        c = moonCoords(d),
  		        H = siderealTime(d, lw) - c.ra,
  		        h = altitude(H, phi, c.dec),
  		        // formula 14.1 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
  		        pa = atan(sin(H), tan(phi) * cos(c.dec) - sin(c.dec) * cos(H));

  		    h = h + astroRefraction(h); // altitude correction for refraction

  		    return {
  		        azimuth: azimuth(H, phi, c.dec),
  		        altitude: h,
  		        distance: c.dist,
  		        parallacticAngle: pa
  		    };
  		};


  		// calculations for illumination parameters of the moon,
  		// based on http://idlastro.gsfc.nasa.gov/ftp/pro/astro/mphase.pro formulas and
  		// Chapter 48 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.

  		SunCalc.getMoonIllumination = function (date) {

  		    var d = toDays(date || new Date()),
  		        s = sunCoords(d),
  		        m = moonCoords(d),

  		        sdist = 149598000, // distance from Earth to Sun in km

  		        phi = acos(sin(s.dec) * sin(m.dec) + cos(s.dec) * cos(m.dec) * cos(s.ra - m.ra)),
  		        inc = atan(sdist * sin(phi), m.dist - sdist * cos(phi)),
  		        angle = atan(cos(s.dec) * sin(s.ra - m.ra), sin(s.dec) * cos(m.dec) -
  		                cos(s.dec) * sin(m.dec) * cos(s.ra - m.ra));

  		    return {
  		        fraction: (1 + cos(inc)) / 2,
  		        phase: 0.5 + 0.5 * inc * (angle < 0 ? -1 : 1) / Math.PI,
  		        angle: angle
  		    };
  		};


  		function hoursLater(date, h) {
  		    return new Date(date.valueOf() + h * dayMs / 24);
  		}

  		// calculations for moon rise/set times are based on http://www.stargazing.net/kepler/moonrise.html article

  		SunCalc.getMoonTimes = function (date, lat, lng, inUTC) {
  		    var t = new Date(date);
  		    if (inUTC) t.setUTCHours(0, 0, 0, 0);
  		    else t.setHours(0, 0, 0, 0);

  		    var hc = 0.133 * rad,
  		        h0 = SunCalc.getMoonPosition(t, lat, lng).altitude - hc,
  		        h1, h2, rise, set, a, b, xe, ye, d, roots, x1, x2, dx;

  		    // go in 2-hour chunks, each time seeing if a 3-point quadratic curve crosses zero (which means rise or set)
  		    for (var i = 1; i <= 24; i += 2) {
  		        h1 = SunCalc.getMoonPosition(hoursLater(t, i), lat, lng).altitude - hc;
  		        h2 = SunCalc.getMoonPosition(hoursLater(t, i + 1), lat, lng).altitude - hc;

  		        a = (h0 + h2) / 2 - h1;
  		        b = (h2 - h0) / 2;
  		        xe = -b / (2 * a);
  		        ye = (a * xe + b) * xe + h1;
  		        d = b * b - 4 * a * h1;
  		        roots = 0;

  		        if (d >= 0) {
  		            dx = Math.sqrt(d) / (Math.abs(a) * 2);
  		            x1 = xe - dx;
  		            x2 = xe + dx;
  		            if (Math.abs(x1) <= 1) roots++;
  		            if (Math.abs(x2) <= 1) roots++;
  		            if (x1 < -1) x1 = x2;
  		        }

  		        if (roots === 1) {
  		            if (h0 < 0) rise = i + x1;
  		            else set = i + x1;

  		        } else if (roots === 2) {
  		            rise = i + (ye < 0 ? x2 : x1);
  		            set = i + (ye < 0 ? x1 : x2);
  		        }

  		        if (rise && set) break;

  		        h0 = h2;
  		    }

  		    var result = {};

  		    if (rise) result.rise = hoursLater(t, rise);
  		    if (set) result.set = hoursLater(t, set);

  		    if (!rise && !set) result[ye > 0 ? 'alwaysUp' : 'alwaysDown'] = true;

  		    return result;
  		};


  		// export as Node module / AMD module / browser variable
  		module.exports = SunCalc;

  		}()); 
  	} (suncalc));
  	return suncalc.exports;
  }

  var suncalcExports = requireSuncalc();
  var SunCalc = /*@__PURE__*/getDefaultExportFromCjs(suncalcExports);

  const isString = obj => typeof obj === 'string';
  const defer = () => {
    let res;
    let rej;
    const promise = new Promise((resolve, reject) => {
      res = resolve;
      rej = reject;
    });
    promise.resolve = res;
    promise.reject = rej;
    return promise;
  };
  const makeString = object => {
    if (object == null) return '';
    return '' + object;
  };
  const copy = (a, s, t) => {
    a.forEach(m => {
      if (s[m]) t[m] = s[m];
    });
  };
  const lastOfPathSeparatorRegExp = /###/g;
  const cleanKey = key => key && key.indexOf('###') > -1 ? key.replace(lastOfPathSeparatorRegExp, '.') : key;
  const canNotTraverseDeeper = object => !object || isString(object);
  const getLastOfPath = (object, path, Empty) => {
    const stack = !isString(path) ? path : path.split('.');
    let stackIndex = 0;
    while (stackIndex < stack.length - 1) {
      if (canNotTraverseDeeper(object)) return {};
      const key = cleanKey(stack[stackIndex]);
      if (!object[key] && Empty) object[key] = new Empty();
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        object = object[key];
      } else {
        object = {};
      }
      ++stackIndex;
    }
    if (canNotTraverseDeeper(object)) return {};
    return {
      obj: object,
      k: cleanKey(stack[stackIndex])
    };
  };
  const setPath = (object, path, newValue) => {
    const {
      obj,
      k
    } = getLastOfPath(object, path, Object);
    if (obj !== undefined || path.length === 1) {
      obj[k] = newValue;
      return;
    }
    let e = path[path.length - 1];
    let p = path.slice(0, path.length - 1);
    let last = getLastOfPath(object, p, Object);
    while (last.obj === undefined && p.length) {
      e = `${p[p.length - 1]}.${e}`;
      p = p.slice(0, p.length - 1);
      last = getLastOfPath(object, p, Object);
      if (last?.obj && typeof last.obj[`${last.k}.${e}`] !== 'undefined') {
        last.obj = undefined;
      }
    }
    last.obj[`${last.k}.${e}`] = newValue;
  };
  const pushPath = (object, path, newValue, concat) => {
    const {
      obj,
      k
    } = getLastOfPath(object, path, Object);
    obj[k] = obj[k] || [];
    obj[k].push(newValue);
  };
  const getPath = (object, path) => {
    const {
      obj,
      k
    } = getLastOfPath(object, path);
    if (!obj) return undefined;
    if (!Object.prototype.hasOwnProperty.call(obj, k)) return undefined;
    return obj[k];
  };
  const getPathWithDefaults = (data, defaultData, key) => {
    const value = getPath(data, key);
    if (value !== undefined) {
      return value;
    }
    return getPath(defaultData, key);
  };
  const deepExtend = (target, source, overwrite) => {
    for (const prop in source) {
      if (prop !== '__proto__' && prop !== 'constructor') {
        if (prop in target) {
          if (isString(target[prop]) || target[prop] instanceof String || isString(source[prop]) || source[prop] instanceof String) {
            if (overwrite) target[prop] = source[prop];
          } else {
            deepExtend(target[prop], source[prop], overwrite);
          }
        } else {
          target[prop] = source[prop];
        }
      }
    }
    return target;
  };
  const regexEscape = str => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  var _entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;'
  };
  const escape = data => {
    if (isString(data)) {
      return data.replace(/[&<>"'\/]/g, s => _entityMap[s]);
    }
    return data;
  };
  class RegExpCache {
    constructor(capacity) {
      this.capacity = capacity;
      this.regExpMap = new Map();
      this.regExpQueue = [];
    }
    getRegExp(pattern) {
      const regExpFromCache = this.regExpMap.get(pattern);
      if (regExpFromCache !== undefined) {
        return regExpFromCache;
      }
      const regExpNew = new RegExp(pattern);
      if (this.regExpQueue.length === this.capacity) {
        this.regExpMap.delete(this.regExpQueue.shift());
      }
      this.regExpMap.set(pattern, regExpNew);
      this.regExpQueue.push(pattern);
      return regExpNew;
    }
  }
  const chars = [' ', ',', '?', '!', ';'];
  const looksLikeObjectPathRegExpCache = new RegExpCache(20);
  const looksLikeObjectPath = (key, nsSeparator, keySeparator) => {
    nsSeparator = nsSeparator || '';
    keySeparator = keySeparator || '';
    const possibleChars = chars.filter(c => nsSeparator.indexOf(c) < 0 && keySeparator.indexOf(c) < 0);
    if (possibleChars.length === 0) return true;
    const r = looksLikeObjectPathRegExpCache.getRegExp(`(${possibleChars.map(c => c === '?' ? '\\?' : c).join('|')})`);
    let matched = !r.test(key);
    if (!matched) {
      const ki = key.indexOf(keySeparator);
      if (ki > 0 && !r.test(key.substring(0, ki))) {
        matched = true;
      }
    }
    return matched;
  };
  const deepFind = function (obj, path) {
    let keySeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.';
    if (!obj) return undefined;
    if (obj[path]) {
      if (!Object.prototype.hasOwnProperty.call(obj, path)) return undefined;
      return obj[path];
    }
    const tokens = path.split(keySeparator);
    let current = obj;
    for (let i = 0; i < tokens.length;) {
      if (!current || typeof current !== 'object') {
        return undefined;
      }
      let next;
      let nextPath = '';
      for (let j = i; j < tokens.length; ++j) {
        if (j !== i) {
          nextPath += keySeparator;
        }
        nextPath += tokens[j];
        next = current[nextPath];
        if (next !== undefined) {
          if (['string', 'number', 'boolean'].indexOf(typeof next) > -1 && j < tokens.length - 1) {
            continue;
          }
          i += j - i + 1;
          break;
        }
      }
      current = next;
    }
    return current;
  };
  const getCleanedCode = code => code?.replace('_', '-');

  const consoleLogger = {
    type: 'logger',
    log(args) {
      this.output('log', args);
    },
    warn(args) {
      this.output('warn', args);
    },
    error(args) {
      this.output('error', args);
    },
    output(type, args) {
      console?.[type]?.apply?.(console, args);
    }
  };
  class Logger {
    constructor(concreteLogger) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.init(concreteLogger, options);
    }
    init(concreteLogger) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.prefix = options.prefix || 'i18next:';
      this.logger = concreteLogger || consoleLogger;
      this.options = options;
      this.debug = options.debug;
    }
    log() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return this.forward(args, 'log', '', true);
    }
    warn() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return this.forward(args, 'warn', '', true);
    }
    error() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      return this.forward(args, 'error', '');
    }
    deprecate() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return this.forward(args, 'warn', 'WARNING DEPRECATED: ', true);
    }
    forward(args, lvl, prefix, debugOnly) {
      if (debugOnly && !this.debug) return null;
      if (isString(args[0])) args[0] = `${prefix}${this.prefix} ${args[0]}`;
      return this.logger[lvl](args);
    }
    create(moduleName) {
      return new Logger(this.logger, {
        ...{
          prefix: `${this.prefix}:${moduleName}:`
        },
        ...this.options
      });
    }
    clone(options) {
      options = options || this.options;
      options.prefix = options.prefix || this.prefix;
      return new Logger(this.logger, options);
    }
  }
  var baseLogger = new Logger();

  class EventEmitter {
    constructor() {
      this.observers = {};
    }
    on(events, listener) {
      events.split(' ').forEach(event => {
        if (!this.observers[event]) this.observers[event] = new Map();
        const numListeners = this.observers[event].get(listener) || 0;
        this.observers[event].set(listener, numListeners + 1);
      });
      return this;
    }
    off(event, listener) {
      if (!this.observers[event]) return;
      if (!listener) {
        delete this.observers[event];
        return;
      }
      this.observers[event].delete(listener);
    }
    emit(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      if (this.observers[event]) {
        const cloned = Array.from(this.observers[event].entries());
        cloned.forEach(_ref => {
          let [observer, numTimesAdded] = _ref;
          for (let i = 0; i < numTimesAdded; i++) {
            observer(...args);
          }
        });
      }
      if (this.observers['*']) {
        const cloned = Array.from(this.observers['*'].entries());
        cloned.forEach(_ref2 => {
          let [observer, numTimesAdded] = _ref2;
          for (let i = 0; i < numTimesAdded; i++) {
            observer.apply(observer, [event, ...args]);
          }
        });
      }
    }
  }

  class ResourceStore extends EventEmitter {
    constructor(data) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        ns: ['translation'],
        defaultNS: 'translation'
      };
      super();
      this.data = data || {};
      this.options = options;
      if (this.options.keySeparator === undefined) {
        this.options.keySeparator = '.';
      }
      if (this.options.ignoreJSONStructure === undefined) {
        this.options.ignoreJSONStructure = true;
      }
    }
    addNamespaces(ns) {
      if (this.options.ns.indexOf(ns) < 0) {
        this.options.ns.push(ns);
      }
    }
    removeNamespaces(ns) {
      const index = this.options.ns.indexOf(ns);
      if (index > -1) {
        this.options.ns.splice(index, 1);
      }
    }
    getResource(lng, ns, key) {
      let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      const keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
      const ignoreJSONStructure = options.ignoreJSONStructure !== undefined ? options.ignoreJSONStructure : this.options.ignoreJSONStructure;
      let path;
      if (lng.indexOf('.') > -1) {
        path = lng.split('.');
      } else {
        path = [lng, ns];
        if (key) {
          if (Array.isArray(key)) {
            path.push(...key);
          } else if (isString(key) && keySeparator) {
            path.push(...key.split(keySeparator));
          } else {
            path.push(key);
          }
        }
      }
      const result = getPath(this.data, path);
      if (!result && !ns && !key && lng.indexOf('.') > -1) {
        lng = path[0];
        ns = path[1];
        key = path.slice(2).join('.');
      }
      if (result || !ignoreJSONStructure || !isString(key)) return result;
      return deepFind(this.data?.[lng]?.[ns], key, keySeparator);
    }
    addResource(lng, ns, key, value) {
      let options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
        silent: false
      };
      const keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
      let path = [lng, ns];
      if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);
      if (lng.indexOf('.') > -1) {
        path = lng.split('.');
        value = ns;
        ns = path[1];
      }
      this.addNamespaces(ns);
      setPath(this.data, path, value);
      if (!options.silent) this.emit('added', lng, ns, key, value);
    }
    addResources(lng, ns, resources) {
      let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
        silent: false
      };
      for (const m in resources) {
        if (isString(resources[m]) || Array.isArray(resources[m])) this.addResource(lng, ns, m, resources[m], {
          silent: true
        });
      }
      if (!options.silent) this.emit('added', lng, ns, resources);
    }
    addResourceBundle(lng, ns, resources, deep, overwrite) {
      let options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {
        silent: false,
        skipCopy: false
      };
      let path = [lng, ns];
      if (lng.indexOf('.') > -1) {
        path = lng.split('.');
        deep = resources;
        resources = ns;
        ns = path[1];
      }
      this.addNamespaces(ns);
      let pack = getPath(this.data, path) || {};
      if (!options.skipCopy) resources = JSON.parse(JSON.stringify(resources));
      if (deep) {
        deepExtend(pack, resources, overwrite);
      } else {
        pack = {
          ...pack,
          ...resources
        };
      }
      setPath(this.data, path, pack);
      if (!options.silent) this.emit('added', lng, ns, resources);
    }
    removeResourceBundle(lng, ns) {
      if (this.hasResourceBundle(lng, ns)) {
        delete this.data[lng][ns];
      }
      this.removeNamespaces(ns);
      this.emit('removed', lng, ns);
    }
    hasResourceBundle(lng, ns) {
      return this.getResource(lng, ns) !== undefined;
    }
    getResourceBundle(lng, ns) {
      if (!ns) ns = this.options.defaultNS;
      return this.getResource(lng, ns);
    }
    getDataByLanguage(lng) {
      return this.data[lng];
    }
    hasLanguageSomeTranslations(lng) {
      const data = this.getDataByLanguage(lng);
      const n = data && Object.keys(data) || [];
      return !!n.find(v => data[v] && Object.keys(data[v]).length > 0);
    }
    toJSON() {
      return this.data;
    }
  }

  var postProcessor = {
    processors: {},
    addPostProcessor(module) {
      this.processors[module.name] = module;
    },
    handle(processors, value, key, options, translator) {
      processors.forEach(processor => {
        value = this.processors[processor]?.process(value, key, options, translator) ?? value;
      });
      return value;
    }
  };

  const checkedLoadedFor = {};
  class Translator extends EventEmitter {
    constructor(services) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      super();
      copy(['resourceStore', 'languageUtils', 'pluralResolver', 'interpolator', 'backendConnector', 'i18nFormat', 'utils'], services, this);
      this.options = options;
      if (this.options.keySeparator === undefined) {
        this.options.keySeparator = '.';
      }
      this.logger = baseLogger.create('translator');
    }
    changeLanguage(lng) {
      if (lng) this.language = lng;
    }
    exists(key) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        interpolation: {}
      };
      if (key === undefined || key === null) {
        return false;
      }
      const resolved = this.resolve(key, options);
      return resolved?.res !== undefined;
    }
    extractFromKey(key, options) {
      let nsSeparator = options.nsSeparator !== undefined ? options.nsSeparator : this.options.nsSeparator;
      if (nsSeparator === undefined) nsSeparator = ':';
      const keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
      let namespaces = options.ns || this.options.defaultNS || [];
      const wouldCheckForNsInKey = nsSeparator && key.indexOf(nsSeparator) > -1;
      const seemsNaturalLanguage = !this.options.userDefinedKeySeparator && !options.keySeparator && !this.options.userDefinedNsSeparator && !options.nsSeparator && !looksLikeObjectPath(key, nsSeparator, keySeparator);
      if (wouldCheckForNsInKey && !seemsNaturalLanguage) {
        const m = key.match(this.interpolator.nestingRegexp);
        if (m && m.length > 0) {
          return {
            key,
            namespaces: isString(namespaces) ? [namespaces] : namespaces
          };
        }
        const parts = key.split(nsSeparator);
        if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.indexOf(parts[0]) > -1) namespaces = parts.shift();
        key = parts.join(keySeparator);
      }
      return {
        key,
        namespaces: isString(namespaces) ? [namespaces] : namespaces
      };
    }
    translate(keys, options, lastKey) {
      if (typeof options !== 'object' && this.options.overloadTranslationOptionHandler) {
        options = this.options.overloadTranslationOptionHandler(arguments);
      }
      if (typeof options === 'object') options = {
        ...options
      };
      if (!options) options = {};
      if (keys === undefined || keys === null) return '';
      if (!Array.isArray(keys)) keys = [String(keys)];
      const returnDetails = options.returnDetails !== undefined ? options.returnDetails : this.options.returnDetails;
      const keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
      const {
        key,
        namespaces
      } = this.extractFromKey(keys[keys.length - 1], options);
      const namespace = namespaces[namespaces.length - 1];
      const lng = options.lng || this.language;
      const appendNamespaceToCIMode = options.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
      if (lng?.toLowerCase() === 'cimode') {
        if (appendNamespaceToCIMode) {
          const nsSeparator = options.nsSeparator || this.options.nsSeparator;
          if (returnDetails) {
            return {
              res: `${namespace}${nsSeparator}${key}`,
              usedKey: key,
              exactUsedKey: key,
              usedLng: lng,
              usedNS: namespace,
              usedParams: this.getUsedParamsDetails(options)
            };
          }
          return `${namespace}${nsSeparator}${key}`;
        }
        if (returnDetails) {
          return {
            res: key,
            usedKey: key,
            exactUsedKey: key,
            usedLng: lng,
            usedNS: namespace,
            usedParams: this.getUsedParamsDetails(options)
          };
        }
        return key;
      }
      const resolved = this.resolve(keys, options);
      let res = resolved?.res;
      const resUsedKey = resolved?.usedKey || key;
      const resExactUsedKey = resolved?.exactUsedKey || key;
      const resType = Object.prototype.toString.apply(res);
      const noObject = ['[object Number]', '[object Function]', '[object RegExp]'];
      const joinArrays = options.joinArrays !== undefined ? options.joinArrays : this.options.joinArrays;
      const handleAsObjectInI18nFormat = !this.i18nFormat || this.i18nFormat.handleAsObject;
      const handleAsObject = !isString(res) && typeof res !== 'boolean' && typeof res !== 'number';
      if (handleAsObjectInI18nFormat && res && handleAsObject && noObject.indexOf(resType) < 0 && !(isString(joinArrays) && Array.isArray(res))) {
        if (!options.returnObjects && !this.options.returnObjects) {
          if (!this.options.returnedObjectHandler) {
            this.logger.warn('accessing an object - but returnObjects options is not enabled!');
          }
          const r = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, res, {
            ...options,
            ns: namespaces
          }) : `key '${key} (${this.language})' returned an object instead of string.`;
          if (returnDetails) {
            resolved.res = r;
            resolved.usedParams = this.getUsedParamsDetails(options);
            return resolved;
          }
          return r;
        }
        if (keySeparator) {
          const resTypeIsArray = Array.isArray(res);
          const copy = resTypeIsArray ? [] : {};
          const newKeyToUse = resTypeIsArray ? resExactUsedKey : resUsedKey;
          for (const m in res) {
            if (Object.prototype.hasOwnProperty.call(res, m)) {
              const deepKey = `${newKeyToUse}${keySeparator}${m}`;
              copy[m] = this.translate(deepKey, {
                ...options,
                ...{
                  joinArrays: false,
                  ns: namespaces
                }
              });
              if (copy[m] === deepKey) copy[m] = res[m];
            }
          }
          res = copy;
        }
      } else if (handleAsObjectInI18nFormat && isString(joinArrays) && Array.isArray(res)) {
        res = res.join(joinArrays);
        if (res) res = this.extendTranslation(res, keys, options, lastKey);
      } else {
        let usedDefault = false;
        let usedKey = false;
        const needsPluralHandling = options.count !== undefined && !isString(options.count);
        const hasDefaultValue = Translator.hasDefaultValue(options);
        const defaultValueSuffix = needsPluralHandling ? this.pluralResolver.getSuffix(lng, options.count, options) : '';
        const defaultValueSuffixOrdinalFallback = options.ordinal && needsPluralHandling ? this.pluralResolver.getSuffix(lng, options.count, {
          ordinal: false
        }) : '';
        const needsZeroSuffixLookup = needsPluralHandling && !options.ordinal && options.count === 0;
        const defaultValue = needsZeroSuffixLookup && options[`defaultValue${this.options.pluralSeparator}zero`] || options[`defaultValue${defaultValueSuffix}`] || options[`defaultValue${defaultValueSuffixOrdinalFallback}`] || options.defaultValue;
        if (!this.isValidLookup(res) && hasDefaultValue) {
          usedDefault = true;
          res = defaultValue;
        }
        if (!this.isValidLookup(res)) {
          usedKey = true;
          res = key;
        }
        const missingKeyNoValueFallbackToKey = options.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey;
        const resForMissing = missingKeyNoValueFallbackToKey && usedKey ? undefined : res;
        const updateMissing = hasDefaultValue && defaultValue !== res && this.options.updateMissing;
        if (usedKey || usedDefault || updateMissing) {
          this.logger.log(updateMissing ? 'updateKey' : 'missingKey', lng, namespace, key, updateMissing ? defaultValue : res);
          if (keySeparator) {
            const fk = this.resolve(key, {
              ...options,
              keySeparator: false
            });
            if (fk && fk.res) this.logger.warn('Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.');
          }
          let lngs = [];
          const fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, options.lng || this.language);
          if (this.options.saveMissingTo === 'fallback' && fallbackLngs && fallbackLngs[0]) {
            for (let i = 0; i < fallbackLngs.length; i++) {
              lngs.push(fallbackLngs[i]);
            }
          } else if (this.options.saveMissingTo === 'all') {
            lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);
          } else {
            lngs.push(options.lng || this.language);
          }
          const send = (l, k, specificDefaultValue) => {
            const defaultForMissing = hasDefaultValue && specificDefaultValue !== res ? specificDefaultValue : resForMissing;
            if (this.options.missingKeyHandler) {
              this.options.missingKeyHandler(l, namespace, k, defaultForMissing, updateMissing, options);
            } else if (this.backendConnector?.saveMissing) {
              this.backendConnector.saveMissing(l, namespace, k, defaultForMissing, updateMissing, options);
            }
            this.emit('missingKey', l, namespace, k, res);
          };
          if (this.options.saveMissing) {
            if (this.options.saveMissingPlurals && needsPluralHandling) {
              lngs.forEach(language => {
                const suffixes = this.pluralResolver.getSuffixes(language, options);
                if (needsZeroSuffixLookup && options[`defaultValue${this.options.pluralSeparator}zero`] && suffixes.indexOf(`${this.options.pluralSeparator}zero`) < 0) {
                  suffixes.push(`${this.options.pluralSeparator}zero`);
                }
                suffixes.forEach(suffix => {
                  send([language], key + suffix, options[`defaultValue${suffix}`] || defaultValue);
                });
              });
            } else {
              send(lngs, key, defaultValue);
            }
          }
        }
        res = this.extendTranslation(res, keys, options, resolved, lastKey);
        if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = `${namespace}:${key}`;
        if ((usedKey || usedDefault) && this.options.parseMissingKeyHandler) {
          res = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${namespace}:${key}` : key, usedDefault ? res : undefined);
        }
      }
      if (returnDetails) {
        resolved.res = res;
        resolved.usedParams = this.getUsedParamsDetails(options);
        return resolved;
      }
      return res;
    }
    extendTranslation(res, key, options, resolved, lastKey) {
      var _this = this;
      if (this.i18nFormat?.parse) {
        res = this.i18nFormat.parse(res, {
          ...this.options.interpolation.defaultVariables,
          ...options
        }, options.lng || this.language || resolved.usedLng, resolved.usedNS, resolved.usedKey, {
          resolved
        });
      } else if (!options.skipInterpolation) {
        if (options.interpolation) this.interpolator.init({
          ...options,
          ...{
            interpolation: {
              ...this.options.interpolation,
              ...options.interpolation
            }
          }
        });
        const skipOnVariables = isString(res) && (options?.interpolation?.skipOnVariables !== undefined ? options.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
        let nestBef;
        if (skipOnVariables) {
          const nb = res.match(this.interpolator.nestingRegexp);
          nestBef = nb && nb.length;
        }
        let data = options.replace && !isString(options.replace) ? options.replace : options;
        if (this.options.interpolation.defaultVariables) data = {
          ...this.options.interpolation.defaultVariables,
          ...data
        };
        res = this.interpolator.interpolate(res, data, options.lng || this.language || resolved.usedLng, options);
        if (skipOnVariables) {
          const na = res.match(this.interpolator.nestingRegexp);
          const nestAft = na && na.length;
          if (nestBef < nestAft) options.nest = false;
        }
        if (!options.lng && resolved && resolved.res) options.lng = this.language || resolved.usedLng;
        if (options.nest !== false) res = this.interpolator.nest(res, function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          if (lastKey?.[0] === args[0] && !options.context) {
            _this.logger.warn(`It seems you are nesting recursively key: ${args[0]} in key: ${key[0]}`);
            return null;
          }
          return _this.translate(...args, key);
        }, options);
        if (options.interpolation) this.interpolator.reset();
      }
      const postProcess = options.postProcess || this.options.postProcess;
      const postProcessorNames = isString(postProcess) ? [postProcess] : postProcess;
      if (res !== undefined && res !== null && postProcessorNames?.length && options.applyPostProcessor !== false) {
        res = postProcessor.handle(postProcessorNames, res, key, this.options && this.options.postProcessPassResolved ? {
          i18nResolved: {
            ...resolved,
            usedParams: this.getUsedParamsDetails(options)
          },
          ...options
        } : options, this);
      }
      return res;
    }
    resolve(keys) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      let found;
      let usedKey;
      let exactUsedKey;
      let usedLng;
      let usedNS;
      if (isString(keys)) keys = [keys];
      keys.forEach(k => {
        if (this.isValidLookup(found)) return;
        const extracted = this.extractFromKey(k, options);
        const key = extracted.key;
        usedKey = key;
        let namespaces = extracted.namespaces;
        if (this.options.fallbackNS) namespaces = namespaces.concat(this.options.fallbackNS);
        const needsPluralHandling = options.count !== undefined && !isString(options.count);
        const needsZeroSuffixLookup = needsPluralHandling && !options.ordinal && options.count === 0;
        const needsContextHandling = options.context !== undefined && (isString(options.context) || typeof options.context === 'number') && options.context !== '';
        const codes = options.lngs ? options.lngs : this.languageUtils.toResolveHierarchy(options.lng || this.language, options.fallbackLng);
        namespaces.forEach(ns => {
          if (this.isValidLookup(found)) return;
          usedNS = ns;
          if (!checkedLoadedFor[`${codes[0]}-${ns}`] && this.utils?.hasLoadedNamespace && !this.utils?.hasLoadedNamespace(usedNS)) {
            checkedLoadedFor[`${codes[0]}-${ns}`] = true;
            this.logger.warn(`key "${usedKey}" for languages "${codes.join(', ')}" won't get resolved as namespace "${usedNS}" was not yet loaded`, 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
          }
          codes.forEach(code => {
            if (this.isValidLookup(found)) return;
            usedLng = code;
            const finalKeys = [key];
            if (this.i18nFormat?.addLookupKeys) {
              this.i18nFormat.addLookupKeys(finalKeys, key, code, ns, options);
            } else {
              let pluralSuffix;
              if (needsPluralHandling) pluralSuffix = this.pluralResolver.getSuffix(code, options.count, options);
              const zeroSuffix = `${this.options.pluralSeparator}zero`;
              const ordinalPrefix = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
              if (needsPluralHandling) {
                finalKeys.push(key + pluralSuffix);
                if (options.ordinal && pluralSuffix.indexOf(ordinalPrefix) === 0) {
                  finalKeys.push(key + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
                }
                if (needsZeroSuffixLookup) {
                  finalKeys.push(key + zeroSuffix);
                }
              }
              if (needsContextHandling) {
                const contextKey = `${key}${this.options.contextSeparator}${options.context}`;
                finalKeys.push(contextKey);
                if (needsPluralHandling) {
                  finalKeys.push(contextKey + pluralSuffix);
                  if (options.ordinal && pluralSuffix.indexOf(ordinalPrefix) === 0) {
                    finalKeys.push(contextKey + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
                  }
                  if (needsZeroSuffixLookup) {
                    finalKeys.push(contextKey + zeroSuffix);
                  }
                }
              }
            }
            let possibleKey;
            while (possibleKey = finalKeys.pop()) {
              if (!this.isValidLookup(found)) {
                exactUsedKey = possibleKey;
                found = this.getResource(code, ns, possibleKey, options);
              }
            }
          });
        });
      });
      return {
        res: found,
        usedKey,
        exactUsedKey,
        usedLng,
        usedNS
      };
    }
    isValidLookup(res) {
      return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === '');
    }
    getResource(code, ns, key) {
      let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      if (this.i18nFormat?.getResource) return this.i18nFormat.getResource(code, ns, key, options);
      return this.resourceStore.getResource(code, ns, key, options);
    }
    getUsedParamsDetails() {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      const optionsKeys = ['defaultValue', 'ordinal', 'context', 'replace', 'lng', 'lngs', 'fallbackLng', 'ns', 'keySeparator', 'nsSeparator', 'returnObjects', 'returnDetails', 'joinArrays', 'postProcess', 'interpolation'];
      const useOptionsReplaceForData = options.replace && !isString(options.replace);
      let data = useOptionsReplaceForData ? options.replace : options;
      if (useOptionsReplaceForData && typeof options.count !== 'undefined') {
        data.count = options.count;
      }
      if (this.options.interpolation.defaultVariables) {
        data = {
          ...this.options.interpolation.defaultVariables,
          ...data
        };
      }
      if (!useOptionsReplaceForData) {
        data = {
          ...data
        };
        for (const key of optionsKeys) {
          delete data[key];
        }
      }
      return data;
    }
    static hasDefaultValue(options) {
      const prefix = 'defaultValue';
      for (const option in options) {
        if (Object.prototype.hasOwnProperty.call(options, option) && prefix === option.substring(0, prefix.length) && undefined !== options[option]) {
          return true;
        }
      }
      return false;
    }
  }

  class LanguageUtil {
    constructor(options) {
      this.options = options;
      this.supportedLngs = this.options.supportedLngs || false;
      this.logger = baseLogger.create('languageUtils');
    }
    getScriptPartFromCode(code) {
      code = getCleanedCode(code);
      if (!code || code.indexOf('-') < 0) return null;
      const p = code.split('-');
      if (p.length === 2) return null;
      p.pop();
      if (p[p.length - 1].toLowerCase() === 'x') return null;
      return this.formatLanguageCode(p.join('-'));
    }
    getLanguagePartFromCode(code) {
      code = getCleanedCode(code);
      if (!code || code.indexOf('-') < 0) return code;
      const p = code.split('-');
      return this.formatLanguageCode(p[0]);
    }
    formatLanguageCode(code) {
      if (isString(code) && code.indexOf('-') > -1) {
        let formattedCode;
        try {
          formattedCode = Intl.getCanonicalLocales(code)[0];
        } catch (e) {}
        if (formattedCode && this.options.lowerCaseLng) {
          formattedCode = formattedCode.toLowerCase();
        }
        if (formattedCode) return formattedCode;
        if (this.options.lowerCaseLng) {
          return code.toLowerCase();
        }
        return code;
      }
      return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
    }
    isSupportedCode(code) {
      if (this.options.load === 'languageOnly' || this.options.nonExplicitSupportedLngs) {
        code = this.getLanguagePartFromCode(code);
      }
      return !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(code) > -1;
    }
    getBestMatchFromCodes(codes) {
      if (!codes) return null;
      let found;
      codes.forEach(code => {
        if (found) return;
        const cleanedLng = this.formatLanguageCode(code);
        if (!this.options.supportedLngs || this.isSupportedCode(cleanedLng)) found = cleanedLng;
      });
      if (!found && this.options.supportedLngs) {
        codes.forEach(code => {
          if (found) return;
          const lngOnly = this.getLanguagePartFromCode(code);
          if (this.isSupportedCode(lngOnly)) return found = lngOnly;
          found = this.options.supportedLngs.find(supportedLng => {
            if (supportedLng === lngOnly) return supportedLng;
            if (supportedLng.indexOf('-') < 0 && lngOnly.indexOf('-') < 0) return;
            if (supportedLng.indexOf('-') > 0 && lngOnly.indexOf('-') < 0 && supportedLng.substring(0, supportedLng.indexOf('-')) === lngOnly) return supportedLng;
            if (supportedLng.indexOf(lngOnly) === 0 && lngOnly.length > 1) return supportedLng;
          });
        });
      }
      if (!found) found = this.getFallbackCodes(this.options.fallbackLng)[0];
      return found;
    }
    getFallbackCodes(fallbacks, code) {
      if (!fallbacks) return [];
      if (typeof fallbacks === 'function') fallbacks = fallbacks(code);
      if (isString(fallbacks)) fallbacks = [fallbacks];
      if (Array.isArray(fallbacks)) return fallbacks;
      if (!code) return fallbacks.default || [];
      let found = fallbacks[code];
      if (!found) found = fallbacks[this.getScriptPartFromCode(code)];
      if (!found) found = fallbacks[this.formatLanguageCode(code)];
      if (!found) found = fallbacks[this.getLanguagePartFromCode(code)];
      if (!found) found = fallbacks.default;
      return found || [];
    }
    toResolveHierarchy(code, fallbackCode) {
      const fallbackCodes = this.getFallbackCodes(fallbackCode || this.options.fallbackLng || [], code);
      const codes = [];
      const addCode = c => {
        if (!c) return;
        if (this.isSupportedCode(c)) {
          codes.push(c);
        } else {
          this.logger.warn(`rejecting language code not found in supportedLngs: ${c}`);
        }
      };
      if (isString(code) && (code.indexOf('-') > -1 || code.indexOf('_') > -1)) {
        if (this.options.load !== 'languageOnly') addCode(this.formatLanguageCode(code));
        if (this.options.load !== 'languageOnly' && this.options.load !== 'currentOnly') addCode(this.getScriptPartFromCode(code));
        if (this.options.load !== 'currentOnly') addCode(this.getLanguagePartFromCode(code));
      } else if (isString(code)) {
        addCode(this.formatLanguageCode(code));
      }
      fallbackCodes.forEach(fc => {
        if (codes.indexOf(fc) < 0) addCode(this.formatLanguageCode(fc));
      });
      return codes;
    }
  }

  const suffixesOrder = {
    zero: 0,
    one: 1,
    two: 2,
    few: 3,
    many: 4,
    other: 5
  };
  const dummyRule = {
    select: count => count === 1 ? 'one' : 'other',
    resolvedOptions: () => ({
      pluralCategories: ['one', 'other']
    })
  };
  class PluralResolver {
    constructor(languageUtils) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.languageUtils = languageUtils;
      this.options = options;
      this.logger = baseLogger.create('pluralResolver');
      this.pluralRulesCache = {};
    }
    addRule(lng, obj) {
      this.rules[lng] = obj;
    }
    clearCache() {
      this.pluralRulesCache = {};
    }
    getRule(code) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const cleanedCode = getCleanedCode(code === 'dev' ? 'en' : code);
      const type = options.ordinal ? 'ordinal' : 'cardinal';
      const cacheKey = JSON.stringify({
        cleanedCode,
        type
      });
      if (cacheKey in this.pluralRulesCache) {
        return this.pluralRulesCache[cacheKey];
      }
      let rule;
      try {
        rule = new Intl.PluralRules(cleanedCode, {
          type
        });
      } catch (err) {
        if (!Intl) {
          this.logger.error('No Intl support, please use an Intl polyfill!');
          return dummyRule;
        }
        if (!code.match(/-|_/)) return dummyRule;
        const lngPart = this.languageUtils.getLanguagePartFromCode(code);
        rule = this.getRule(lngPart, options);
      }
      this.pluralRulesCache[cacheKey] = rule;
      return rule;
    }
    needsPlural(code) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      let rule = this.getRule(code, options);
      if (!rule) rule = this.getRule('dev', options);
      return rule?.resolvedOptions().pluralCategories.length > 1;
    }
    getPluralFormsOfKey(code, key) {
      let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.getSuffixes(code, options).map(suffix => `${key}${suffix}`);
    }
    getSuffixes(code) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      let rule = this.getRule(code, options);
      if (!rule) rule = this.getRule('dev', options);
      if (!rule) return [];
      return rule.resolvedOptions().pluralCategories.sort((pluralCategory1, pluralCategory2) => suffixesOrder[pluralCategory1] - suffixesOrder[pluralCategory2]).map(pluralCategory => `${this.options.prepend}${options.ordinal ? `ordinal${this.options.prepend}` : ''}${pluralCategory}`);
    }
    getSuffix(code, count) {
      let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      const rule = this.getRule(code, options);
      if (rule) {
        return `${this.options.prepend}${options.ordinal ? `ordinal${this.options.prepend}` : ''}${rule.select(count)}`;
      }
      this.logger.warn(`no plural rule found for: ${code}`);
      return this.getSuffix('dev', count, options);
    }
  }

  const deepFindWithDefaults = function (data, defaultData, key) {
    let keySeparator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '.';
    let ignoreJSONStructure = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    let path = getPathWithDefaults(data, defaultData, key);
    if (!path && ignoreJSONStructure && isString(key)) {
      path = deepFind(data, key, keySeparator);
      if (path === undefined) path = deepFind(defaultData, key, keySeparator);
    }
    return path;
  };
  const regexSafe = val => val.replace(/\$/g, '$$$$');
  class Interpolator {
    constructor() {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.logger = baseLogger.create('interpolator');
      this.options = options;
      this.format = options?.interpolation?.format || (value => value);
      this.init(options);
    }
    init() {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (!options.interpolation) options.interpolation = {
        escapeValue: true
      };
      const {
        escape: escape$1,
        escapeValue,
        useRawValueToEscape,
        prefix,
        prefixEscaped,
        suffix,
        suffixEscaped,
        formatSeparator,
        unescapeSuffix,
        unescapePrefix,
        nestingPrefix,
        nestingPrefixEscaped,
        nestingSuffix,
        nestingSuffixEscaped,
        nestingOptionsSeparator,
        maxReplaces,
        alwaysFormat
      } = options.interpolation;
      this.escape = escape$1 !== undefined ? escape$1 : escape;
      this.escapeValue = escapeValue !== undefined ? escapeValue : true;
      this.useRawValueToEscape = useRawValueToEscape !== undefined ? useRawValueToEscape : false;
      this.prefix = prefix ? regexEscape(prefix) : prefixEscaped || '{{';
      this.suffix = suffix ? regexEscape(suffix) : suffixEscaped || '}}';
      this.formatSeparator = formatSeparator || ',';
      this.unescapePrefix = unescapeSuffix ? '' : unescapePrefix || '-';
      this.unescapeSuffix = this.unescapePrefix ? '' : unescapeSuffix || '';
      this.nestingPrefix = nestingPrefix ? regexEscape(nestingPrefix) : nestingPrefixEscaped || regexEscape('$t(');
      this.nestingSuffix = nestingSuffix ? regexEscape(nestingSuffix) : nestingSuffixEscaped || regexEscape(')');
      this.nestingOptionsSeparator = nestingOptionsSeparator || ',';
      this.maxReplaces = maxReplaces || 1000;
      this.alwaysFormat = alwaysFormat !== undefined ? alwaysFormat : false;
      this.resetRegExp();
    }
    reset() {
      if (this.options) this.init(this.options);
    }
    resetRegExp() {
      const getOrResetRegExp = (existingRegExp, pattern) => {
        if (existingRegExp?.source === pattern) {
          existingRegExp.lastIndex = 0;
          return existingRegExp;
        }
        return new RegExp(pattern, 'g');
      };
      this.regexp = getOrResetRegExp(this.regexp, `${this.prefix}(.+?)${this.suffix}`);
      this.regexpUnescape = getOrResetRegExp(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`);
      this.nestingRegexp = getOrResetRegExp(this.nestingRegexp, `${this.nestingPrefix}(.+?)${this.nestingSuffix}`);
    }
    interpolate(str, data, lng, options) {
      let match;
      let value;
      let replaces;
      const defaultData = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
      const handleFormat = key => {
        if (key.indexOf(this.formatSeparator) < 0) {
          const path = deepFindWithDefaults(data, defaultData, key, this.options.keySeparator, this.options.ignoreJSONStructure);
          return this.alwaysFormat ? this.format(path, undefined, lng, {
            ...options,
            ...data,
            interpolationkey: key
          }) : path;
        }
        const p = key.split(this.formatSeparator);
        const k = p.shift().trim();
        const f = p.join(this.formatSeparator).trim();
        return this.format(deepFindWithDefaults(data, defaultData, k, this.options.keySeparator, this.options.ignoreJSONStructure), f, lng, {
          ...options,
          ...data,
          interpolationkey: k
        });
      };
      this.resetRegExp();
      const missingInterpolationHandler = options?.missingInterpolationHandler || this.options.missingInterpolationHandler;
      const skipOnVariables = options?.interpolation?.skipOnVariables !== undefined ? options.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
      const todos = [{
        regex: this.regexpUnescape,
        safeValue: val => regexSafe(val)
      }, {
        regex: this.regexp,
        safeValue: val => this.escapeValue ? regexSafe(this.escape(val)) : regexSafe(val)
      }];
      todos.forEach(todo => {
        replaces = 0;
        while (match = todo.regex.exec(str)) {
          const matchedVar = match[1].trim();
          value = handleFormat(matchedVar);
          if (value === undefined) {
            if (typeof missingInterpolationHandler === 'function') {
              const temp = missingInterpolationHandler(str, match, options);
              value = isString(temp) ? temp : '';
            } else if (options && Object.prototype.hasOwnProperty.call(options, matchedVar)) {
              value = '';
            } else if (skipOnVariables) {
              value = match[0];
              continue;
            } else {
              this.logger.warn(`missed to pass in variable ${matchedVar} for interpolating ${str}`);
              value = '';
            }
          } else if (!isString(value) && !this.useRawValueToEscape) {
            value = makeString(value);
          }
          const safeValue = todo.safeValue(value);
          str = str.replace(match[0], safeValue);
          if (skipOnVariables) {
            todo.regex.lastIndex += value.length;
            todo.regex.lastIndex -= match[0].length;
          } else {
            todo.regex.lastIndex = 0;
          }
          replaces++;
          if (replaces >= this.maxReplaces) {
            break;
          }
        }
      });
      return str;
    }
    nest(str, fc) {
      let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      let match;
      let value;
      let clonedOptions;
      const handleHasOptions = (key, inheritedOptions) => {
        const sep = this.nestingOptionsSeparator;
        if (key.indexOf(sep) < 0) return key;
        const c = key.split(new RegExp(`${sep}[ ]*{`));
        let optionsString = `{${c[1]}`;
        key = c[0];
        optionsString = this.interpolate(optionsString, clonedOptions);
        const matchedSingleQuotes = optionsString.match(/'/g);
        const matchedDoubleQuotes = optionsString.match(/"/g);
        if ((matchedSingleQuotes?.length ?? 0) % 2 === 0 && !matchedDoubleQuotes || matchedDoubleQuotes.length % 2 !== 0) {
          optionsString = optionsString.replace(/'/g, '"');
        }
        try {
          clonedOptions = JSON.parse(optionsString);
          if (inheritedOptions) clonedOptions = {
            ...inheritedOptions,
            ...clonedOptions
          };
        } catch (e) {
          this.logger.warn(`failed parsing options string in nesting for key ${key}`, e);
          return `${key}${sep}${optionsString}`;
        }
        if (clonedOptions.defaultValue && clonedOptions.defaultValue.indexOf(this.prefix) > -1) delete clonedOptions.defaultValue;
        return key;
      };
      while (match = this.nestingRegexp.exec(str)) {
        let formatters = [];
        clonedOptions = {
          ...options
        };
        clonedOptions = clonedOptions.replace && !isString(clonedOptions.replace) ? clonedOptions.replace : clonedOptions;
        clonedOptions.applyPostProcessor = false;
        delete clonedOptions.defaultValue;
        let doReduce = false;
        if (match[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(match[1])) {
          const r = match[1].split(this.formatSeparator).map(elem => elem.trim());
          match[1] = r.shift();
          formatters = r;
          doReduce = true;
        }
        value = fc(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions);
        if (value && match[0] === str && !isString(value)) return value;
        if (!isString(value)) value = makeString(value);
        if (!value) {
          this.logger.warn(`missed to resolve ${match[1]} for nesting ${str}`);
          value = '';
        }
        if (doReduce) {
          value = formatters.reduce((v, f) => this.format(v, f, options.lng, {
            ...options,
            interpolationkey: match[1].trim()
          }), value.trim());
        }
        str = str.replace(match[0], value);
        this.regexp.lastIndex = 0;
      }
      return str;
    }
  }

  const parseFormatStr = formatStr => {
    let formatName = formatStr.toLowerCase().trim();
    const formatOptions = {};
    if (formatStr.indexOf('(') > -1) {
      const p = formatStr.split('(');
      formatName = p[0].toLowerCase().trim();
      const optStr = p[1].substring(0, p[1].length - 1);
      if (formatName === 'currency' && optStr.indexOf(':') < 0) {
        if (!formatOptions.currency) formatOptions.currency = optStr.trim();
      } else if (formatName === 'relativetime' && optStr.indexOf(':') < 0) {
        if (!formatOptions.range) formatOptions.range = optStr.trim();
      } else {
        const opts = optStr.split(';');
        opts.forEach(opt => {
          if (opt) {
            const [key, ...rest] = opt.split(':');
            const val = rest.join(':').trim().replace(/^'+|'+$/g, '');
            const trimmedKey = key.trim();
            if (!formatOptions[trimmedKey]) formatOptions[trimmedKey] = val;
            if (val === 'false') formatOptions[trimmedKey] = false;
            if (val === 'true') formatOptions[trimmedKey] = true;
            if (!isNaN(val)) formatOptions[trimmedKey] = parseInt(val, 10);
          }
        });
      }
    }
    return {
      formatName,
      formatOptions
    };
  };
  const createCachedFormatter = fn => {
    const cache = {};
    return (val, lng, options) => {
      let optForCache = options;
      if (options && options.interpolationkey && options.formatParams && options.formatParams[options.interpolationkey] && options[options.interpolationkey]) {
        optForCache = {
          ...optForCache,
          [options.interpolationkey]: undefined
        };
      }
      const key = lng + JSON.stringify(optForCache);
      let formatter = cache[key];
      if (!formatter) {
        formatter = fn(getCleanedCode(lng), options);
        cache[key] = formatter;
      }
      return formatter(val);
    };
  };
  class Formatter {
    constructor() {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.logger = baseLogger.create('formatter');
      this.options = options;
      this.formats = {
        number: createCachedFormatter((lng, opt) => {
          const formatter = new Intl.NumberFormat(lng, {
            ...opt
          });
          return val => formatter.format(val);
        }),
        currency: createCachedFormatter((lng, opt) => {
          const formatter = new Intl.NumberFormat(lng, {
            ...opt,
            style: 'currency'
          });
          return val => formatter.format(val);
        }),
        datetime: createCachedFormatter((lng, opt) => {
          const formatter = new Intl.DateTimeFormat(lng, {
            ...opt
          });
          return val => formatter.format(val);
        }),
        relativetime: createCachedFormatter((lng, opt) => {
          const formatter = new Intl.RelativeTimeFormat(lng, {
            ...opt
          });
          return val => formatter.format(val, opt.range || 'day');
        }),
        list: createCachedFormatter((lng, opt) => {
          const formatter = new Intl.ListFormat(lng, {
            ...opt
          });
          return val => formatter.format(val);
        })
      };
      this.init(options);
    }
    init(services) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        interpolation: {}
      };
      this.formatSeparator = options.interpolation.formatSeparator || ',';
    }
    add(name, fc) {
      this.formats[name.toLowerCase().trim()] = fc;
    }
    addCached(name, fc) {
      this.formats[name.toLowerCase().trim()] = createCachedFormatter(fc);
    }
    format(value, format, lng) {
      let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      const formats = format.split(this.formatSeparator);
      if (formats.length > 1 && formats[0].indexOf('(') > 1 && formats[0].indexOf(')') < 0 && formats.find(f => f.indexOf(')') > -1)) {
        const lastIndex = formats.findIndex(f => f.indexOf(')') > -1);
        formats[0] = [formats[0], ...formats.splice(1, lastIndex)].join(this.formatSeparator);
      }
      const result = formats.reduce((mem, f) => {
        const {
          formatName,
          formatOptions
        } = parseFormatStr(f);
        if (this.formats[formatName]) {
          let formatted = mem;
          try {
            const valOptions = options?.formatParams?.[options.interpolationkey] || {};
            const l = valOptions.locale || valOptions.lng || options.locale || options.lng || lng;
            formatted = this.formats[formatName](mem, l, {
              ...formatOptions,
              ...options,
              ...valOptions
            });
          } catch (error) {
            this.logger.warn(error);
          }
          return formatted;
        } else {
          this.logger.warn(`there was no format function for ${formatName}`);
        }
        return mem;
      }, value);
      return result;
    }
  }

  const removePending = (q, name) => {
    if (q.pending[name] !== undefined) {
      delete q.pending[name];
      q.pendingCount--;
    }
  };
  class Connector extends EventEmitter {
    constructor(backend, store, services) {
      let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      super();
      this.backend = backend;
      this.store = store;
      this.services = services;
      this.languageUtils = services.languageUtils;
      this.options = options;
      this.logger = baseLogger.create('backendConnector');
      this.waitingReads = [];
      this.maxParallelReads = options.maxParallelReads || 10;
      this.readingCalls = 0;
      this.maxRetries = options.maxRetries >= 0 ? options.maxRetries : 5;
      this.retryTimeout = options.retryTimeout >= 1 ? options.retryTimeout : 350;
      this.state = {};
      this.queue = [];
      this.backend?.init?.(services, options.backend, options);
    }
    queueLoad(languages, namespaces, options, callback) {
      const toLoad = {};
      const pending = {};
      const toLoadLanguages = {};
      const toLoadNamespaces = {};
      languages.forEach(lng => {
        let hasAllNamespaces = true;
        namespaces.forEach(ns => {
          const name = `${lng}|${ns}`;
          if (!options.reload && this.store.hasResourceBundle(lng, ns)) {
            this.state[name] = 2;
          } else if (this.state[name] < 0) ; else if (this.state[name] === 1) {
            if (pending[name] === undefined) pending[name] = true;
          } else {
            this.state[name] = 1;
            hasAllNamespaces = false;
            if (pending[name] === undefined) pending[name] = true;
            if (toLoad[name] === undefined) toLoad[name] = true;
            if (toLoadNamespaces[ns] === undefined) toLoadNamespaces[ns] = true;
          }
        });
        if (!hasAllNamespaces) toLoadLanguages[lng] = true;
      });
      if (Object.keys(toLoad).length || Object.keys(pending).length) {
        this.queue.push({
          pending,
          pendingCount: Object.keys(pending).length,
          loaded: {},
          errors: [],
          callback
        });
      }
      return {
        toLoad: Object.keys(toLoad),
        pending: Object.keys(pending),
        toLoadLanguages: Object.keys(toLoadLanguages),
        toLoadNamespaces: Object.keys(toLoadNamespaces)
      };
    }
    loaded(name, err, data) {
      const s = name.split('|');
      const lng = s[0];
      const ns = s[1];
      if (err) this.emit('failedLoading', lng, ns, err);
      if (!err && data) {
        this.store.addResourceBundle(lng, ns, data, undefined, undefined, {
          skipCopy: true
        });
      }
      this.state[name] = err ? -1 : 2;
      if (err && data) this.state[name] = 0;
      const loaded = {};
      this.queue.forEach(q => {
        pushPath(q.loaded, [lng], ns);
        removePending(q, name);
        if (err) q.errors.push(err);
        if (q.pendingCount === 0 && !q.done) {
          Object.keys(q.loaded).forEach(l => {
            if (!loaded[l]) loaded[l] = {};
            const loadedKeys = q.loaded[l];
            if (loadedKeys.length) {
              loadedKeys.forEach(n => {
                if (loaded[l][n] === undefined) loaded[l][n] = true;
              });
            }
          });
          q.done = true;
          if (q.errors.length) {
            q.callback(q.errors);
          } else {
            q.callback();
          }
        }
      });
      this.emit('loaded', loaded);
      this.queue = this.queue.filter(q => !q.done);
    }
    read(lng, ns, fcName) {
      let tried = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      let wait = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : this.retryTimeout;
      let callback = arguments.length > 5 ? arguments[5] : undefined;
      if (!lng.length) return callback(null, {});
      if (this.readingCalls >= this.maxParallelReads) {
        this.waitingReads.push({
          lng,
          ns,
          fcName,
          tried,
          wait,
          callback
        });
        return;
      }
      this.readingCalls++;
      const resolver = (err, data) => {
        this.readingCalls--;
        if (this.waitingReads.length > 0) {
          const next = this.waitingReads.shift();
          this.read(next.lng, next.ns, next.fcName, next.tried, next.wait, next.callback);
        }
        if (err && data && tried < this.maxRetries) {
          setTimeout(() => {
            this.read.call(this, lng, ns, fcName, tried + 1, wait * 2, callback);
          }, wait);
          return;
        }
        callback(err, data);
      };
      const fc = this.backend[fcName].bind(this.backend);
      if (fc.length === 2) {
        try {
          const r = fc(lng, ns);
          if (r && typeof r.then === 'function') {
            r.then(data => resolver(null, data)).catch(resolver);
          } else {
            resolver(null, r);
          }
        } catch (err) {
          resolver(err);
        }
        return;
      }
      return fc(lng, ns, resolver);
    }
    prepareLoading(languages, namespaces) {
      let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      let callback = arguments.length > 3 ? arguments[3] : undefined;
      if (!this.backend) {
        this.logger.warn('No backend was added via i18next.use. Will not load resources.');
        return callback && callback();
      }
      if (isString(languages)) languages = this.languageUtils.toResolveHierarchy(languages);
      if (isString(namespaces)) namespaces = [namespaces];
      const toLoad = this.queueLoad(languages, namespaces, options, callback);
      if (!toLoad.toLoad.length) {
        if (!toLoad.pending.length) callback();
        return null;
      }
      toLoad.toLoad.forEach(name => {
        this.loadOne(name);
      });
    }
    load(languages, namespaces, callback) {
      this.prepareLoading(languages, namespaces, {}, callback);
    }
    reload(languages, namespaces, callback) {
      this.prepareLoading(languages, namespaces, {
        reload: true
      }, callback);
    }
    loadOne(name) {
      let prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      const s = name.split('|');
      const lng = s[0];
      const ns = s[1];
      this.read(lng, ns, 'read', undefined, undefined, (err, data) => {
        if (err) this.logger.warn(`${prefix}loading namespace ${ns} for language ${lng} failed`, err);
        if (!err && data) this.logger.log(`${prefix}loaded namespace ${ns} for language ${lng}`, data);
        this.loaded(name, err, data);
      });
    }
    saveMissing(languages, namespace, key, fallbackValue, isUpdate) {
      let options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
      let clb = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : () => {};
      if (this.services?.utils?.hasLoadedNamespace && !this.services?.utils?.hasLoadedNamespace(namespace)) {
        this.logger.warn(`did not save key "${key}" as the namespace "${namespace}" was not yet loaded`, 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
        return;
      }
      if (key === undefined || key === null || key === '') return;
      if (this.backend?.create) {
        const opts = {
          ...options,
          isUpdate
        };
        const fc = this.backend.create.bind(this.backend);
        if (fc.length < 6) {
          try {
            let r;
            if (fc.length === 5) {
              r = fc(languages, namespace, key, fallbackValue, opts);
            } else {
              r = fc(languages, namespace, key, fallbackValue);
            }
            if (r && typeof r.then === 'function') {
              r.then(data => clb(null, data)).catch(clb);
            } else {
              clb(null, r);
            }
          } catch (err) {
            clb(err);
          }
        } else {
          fc(languages, namespace, key, fallbackValue, clb, opts);
        }
      }
      if (!languages || !languages[0]) return;
      this.store.addResource(languages[0], namespace, key, fallbackValue);
    }
  }

  const get = () => ({
    debug: false,
    initAsync: true,
    ns: ['translation'],
    defaultNS: ['translation'],
    fallbackLng: ['dev'],
    fallbackNS: false,
    supportedLngs: false,
    nonExplicitSupportedLngs: false,
    load: 'all',
    preload: false,
    simplifyPluralSuffix: true,
    keySeparator: '.',
    nsSeparator: ':',
    pluralSeparator: '_',
    contextSeparator: '_',
    partialBundledLanguages: false,
    saveMissing: false,
    updateMissing: false,
    saveMissingTo: 'fallback',
    saveMissingPlurals: true,
    missingKeyHandler: false,
    missingInterpolationHandler: false,
    postProcess: false,
    postProcessPassResolved: false,
    returnNull: false,
    returnEmptyString: true,
    returnObjects: false,
    joinArrays: false,
    returnedObjectHandler: false,
    parseMissingKeyHandler: false,
    appendNamespaceToMissingKey: false,
    appendNamespaceToCIMode: false,
    overloadTranslationOptionHandler: args => {
      let ret = {};
      if (typeof args[1] === 'object') ret = args[1];
      if (isString(args[1])) ret.defaultValue = args[1];
      if (isString(args[2])) ret.tDescription = args[2];
      if (typeof args[2] === 'object' || typeof args[3] === 'object') {
        const options = args[3] || args[2];
        Object.keys(options).forEach(key => {
          ret[key] = options[key];
        });
      }
      return ret;
    },
    interpolation: {
      escapeValue: true,
      format: value => value,
      prefix: '{{',
      suffix: '}}',
      formatSeparator: ',',
      unescapePrefix: '-',
      nestingPrefix: '$t(',
      nestingSuffix: ')',
      nestingOptionsSeparator: ',',
      maxReplaces: 1000,
      skipOnVariables: true
    }
  });
  const transformOptions = options => {
    if (isString(options.ns)) options.ns = [options.ns];
    if (isString(options.fallbackLng)) options.fallbackLng = [options.fallbackLng];
    if (isString(options.fallbackNS)) options.fallbackNS = [options.fallbackNS];
    if (options.supportedLngs?.indexOf?.('cimode') < 0) {
      options.supportedLngs = options.supportedLngs.concat(['cimode']);
    }
    if (typeof options.initImmediate === 'boolean') options.initAsync = options.initImmediate;
    return options;
  };

  const noop = () => {};
  const bindMemberFunctions = inst => {
    const mems = Object.getOwnPropertyNames(Object.getPrototypeOf(inst));
    mems.forEach(mem => {
      if (typeof inst[mem] === 'function') {
        inst[mem] = inst[mem].bind(inst);
      }
    });
  };
  class I18n extends EventEmitter {
    constructor() {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      let callback = arguments.length > 1 ? arguments[1] : undefined;
      super();
      this.options = transformOptions(options);
      this.services = {};
      this.logger = baseLogger;
      this.modules = {
        external: []
      };
      bindMemberFunctions(this);
      if (callback && !this.isInitialized && !options.isClone) {
        if (!this.options.initAsync) {
          this.init(options, callback);
          return this;
        }
        setTimeout(() => {
          this.init(options, callback);
        }, 0);
      }
    }
    init() {
      var _this = this;
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      let callback = arguments.length > 1 ? arguments[1] : undefined;
      this.isInitializing = true;
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      if (!options.defaultNS && options.defaultNS !== false && options.ns) {
        if (isString(options.ns)) {
          options.defaultNS = options.ns;
        } else if (options.ns.indexOf('translation') < 0) {
          options.defaultNS = options.ns[0];
        }
      }
      const defOpts = get();
      this.options = {
        ...defOpts,
        ...this.options,
        ...transformOptions(options)
      };
      this.options.interpolation = {
        ...defOpts.interpolation,
        ...this.options.interpolation
      };
      if (options.keySeparator !== undefined) {
        this.options.userDefinedKeySeparator = options.keySeparator;
      }
      if (options.nsSeparator !== undefined) {
        this.options.userDefinedNsSeparator = options.nsSeparator;
      }
      const createClassOnDemand = ClassOrObject => {
        if (!ClassOrObject) return null;
        if (typeof ClassOrObject === 'function') return new ClassOrObject();
        return ClassOrObject;
      };
      if (!this.options.isClone) {
        if (this.modules.logger) {
          baseLogger.init(createClassOnDemand(this.modules.logger), this.options);
        } else {
          baseLogger.init(null, this.options);
        }
        let formatter;
        if (this.modules.formatter) {
          formatter = this.modules.formatter;
        } else {
          formatter = Formatter;
        }
        const lu = new LanguageUtil(this.options);
        this.store = new ResourceStore(this.options.resources, this.options);
        const s = this.services;
        s.logger = baseLogger;
        s.resourceStore = this.store;
        s.languageUtils = lu;
        s.pluralResolver = new PluralResolver(lu, {
          prepend: this.options.pluralSeparator,
          simplifyPluralSuffix: this.options.simplifyPluralSuffix
        });
        if (formatter && (!this.options.interpolation.format || this.options.interpolation.format === defOpts.interpolation.format)) {
          s.formatter = createClassOnDemand(formatter);
          s.formatter.init(s, this.options);
          this.options.interpolation.format = s.formatter.format.bind(s.formatter);
        }
        s.interpolator = new Interpolator(this.options);
        s.utils = {
          hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
        };
        s.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
        s.backendConnector.on('*', function (event) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          _this.emit(event, ...args);
        });
        if (this.modules.languageDetector) {
          s.languageDetector = createClassOnDemand(this.modules.languageDetector);
          if (s.languageDetector.init) s.languageDetector.init(s, this.options.detection, this.options);
        }
        if (this.modules.i18nFormat) {
          s.i18nFormat = createClassOnDemand(this.modules.i18nFormat);
          if (s.i18nFormat.init) s.i18nFormat.init(this);
        }
        this.translator = new Translator(this.services, this.options);
        this.translator.on('*', function (event) {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }
          _this.emit(event, ...args);
        });
        this.modules.external.forEach(m => {
          if (m.init) m.init(this);
        });
      }
      this.format = this.options.interpolation.format;
      if (!callback) callback = noop;
      if (this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
        const codes = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
        if (codes.length > 0 && codes[0] !== 'dev') this.options.lng = codes[0];
      }
      if (!this.services.languageDetector && !this.options.lng) {
        this.logger.warn('init: no languageDetector is used and no lng is defined');
      }
      const storeApi = ['getResource', 'hasResourceBundle', 'getResourceBundle', 'getDataByLanguage'];
      storeApi.forEach(fcName => {
        this[fcName] = function () {
          return _this.store[fcName](...arguments);
        };
      });
      const storeApiChained = ['addResource', 'addResources', 'addResourceBundle', 'removeResourceBundle'];
      storeApiChained.forEach(fcName => {
        this[fcName] = function () {
          _this.store[fcName](...arguments);
          return _this;
        };
      });
      const deferred = defer();
      const load = () => {
        const finish = (err, t) => {
          this.isInitializing = false;
          if (this.isInitialized && !this.initializedStoreOnce) this.logger.warn('init: i18next is already initialized. You should call init just once!');
          this.isInitialized = true;
          if (!this.options.isClone) this.logger.log('initialized', this.options);
          this.emit('initialized', this.options);
          deferred.resolve(t);
          callback(err, t);
        };
        if (this.languages && !this.isInitialized) return finish(null, this.t.bind(this));
        this.changeLanguage(this.options.lng, finish);
      };
      if (this.options.resources || !this.options.initAsync) {
        load();
      } else {
        setTimeout(load, 0);
      }
      return deferred;
    }
    loadResources(language) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
      let usedCallback = callback;
      const usedLng = isString(language) ? language : this.language;
      if (typeof language === 'function') usedCallback = language;
      if (!this.options.resources || this.options.partialBundledLanguages) {
        if (usedLng?.toLowerCase() === 'cimode' && (!this.options.preload || this.options.preload.length === 0)) return usedCallback();
        const toLoad = [];
        const append = lng => {
          if (!lng) return;
          if (lng === 'cimode') return;
          const lngs = this.services.languageUtils.toResolveHierarchy(lng);
          lngs.forEach(l => {
            if (l === 'cimode') return;
            if (toLoad.indexOf(l) < 0) toLoad.push(l);
          });
        };
        if (!usedLng) {
          const fallbacks = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
          fallbacks.forEach(l => append(l));
        } else {
          append(usedLng);
        }
        this.options.preload?.forEach?.(l => append(l));
        this.services.backendConnector.load(toLoad, this.options.ns, e => {
          if (!e && !this.resolvedLanguage && this.language) this.setResolvedLanguage(this.language);
          usedCallback(e);
        });
      } else {
        usedCallback(null);
      }
    }
    reloadResources(lngs, ns, callback) {
      const deferred = defer();
      if (typeof lngs === 'function') {
        callback = lngs;
        lngs = undefined;
      }
      if (typeof ns === 'function') {
        callback = ns;
        ns = undefined;
      }
      if (!lngs) lngs = this.languages;
      if (!ns) ns = this.options.ns;
      if (!callback) callback = noop;
      this.services.backendConnector.reload(lngs, ns, err => {
        deferred.resolve();
        callback(err);
      });
      return deferred;
    }
    use(module) {
      if (!module) throw new Error('You are passing an undefined module! Please check the object you are passing to i18next.use()');
      if (!module.type) throw new Error('You are passing a wrong module! Please check the object you are passing to i18next.use()');
      if (module.type === 'backend') {
        this.modules.backend = module;
      }
      if (module.type === 'logger' || module.log && module.warn && module.error) {
        this.modules.logger = module;
      }
      if (module.type === 'languageDetector') {
        this.modules.languageDetector = module;
      }
      if (module.type === 'i18nFormat') {
        this.modules.i18nFormat = module;
      }
      if (module.type === 'postProcessor') {
        postProcessor.addPostProcessor(module);
      }
      if (module.type === 'formatter') {
        this.modules.formatter = module;
      }
      if (module.type === '3rdParty') {
        this.modules.external.push(module);
      }
      return this;
    }
    setResolvedLanguage(l) {
      if (!l || !this.languages) return;
      if (['cimode', 'dev'].indexOf(l) > -1) return;
      for (let li = 0; li < this.languages.length; li++) {
        const lngInLngs = this.languages[li];
        if (['cimode', 'dev'].indexOf(lngInLngs) > -1) continue;
        if (this.store.hasLanguageSomeTranslations(lngInLngs)) {
          this.resolvedLanguage = lngInLngs;
          break;
        }
      }
    }
    changeLanguage(lng, callback) {
      var _this2 = this;
      this.isLanguageChangingTo = lng;
      const deferred = defer();
      this.emit('languageChanging', lng);
      const setLngProps = l => {
        this.language = l;
        this.languages = this.services.languageUtils.toResolveHierarchy(l);
        this.resolvedLanguage = undefined;
        this.setResolvedLanguage(l);
      };
      const done = (err, l) => {
        if (l) {
          setLngProps(l);
          this.translator.changeLanguage(l);
          this.isLanguageChangingTo = undefined;
          this.emit('languageChanged', l);
          this.logger.log('languageChanged', l);
        } else {
          this.isLanguageChangingTo = undefined;
        }
        deferred.resolve(function () {
          return _this2.t(...arguments);
        });
        if (callback) callback(err, function () {
          return _this2.t(...arguments);
        });
      };
      const setLng = lngs => {
        if (!lng && !lngs && this.services.languageDetector) lngs = [];
        const l = isString(lngs) ? lngs : this.services.languageUtils.getBestMatchFromCodes(lngs);
        if (l) {
          if (!this.language) {
            setLngProps(l);
          }
          if (!this.translator.language) this.translator.changeLanguage(l);
          this.services.languageDetector?.cacheUserLanguage?.(l);
        }
        this.loadResources(l, err => {
          done(err, l);
        });
      };
      if (!lng && this.services.languageDetector && !this.services.languageDetector.async) {
        setLng(this.services.languageDetector.detect());
      } else if (!lng && this.services.languageDetector && this.services.languageDetector.async) {
        if (this.services.languageDetector.detect.length === 0) {
          this.services.languageDetector.detect().then(setLng);
        } else {
          this.services.languageDetector.detect(setLng);
        }
      } else {
        setLng(lng);
      }
      return deferred;
    }
    getFixedT(lng, ns, keyPrefix) {
      var _this3 = this;
      const fixedT = function (key, opts) {
        let options;
        if (typeof opts !== 'object') {
          for (var _len3 = arguments.length, rest = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
            rest[_key3 - 2] = arguments[_key3];
          }
          options = _this3.options.overloadTranslationOptionHandler([key, opts].concat(rest));
        } else {
          options = {
            ...opts
          };
        }
        options.lng = options.lng || fixedT.lng;
        options.lngs = options.lngs || fixedT.lngs;
        options.ns = options.ns || fixedT.ns;
        if (options.keyPrefix !== '') options.keyPrefix = options.keyPrefix || keyPrefix || fixedT.keyPrefix;
        const keySeparator = _this3.options.keySeparator || '.';
        let resultKey;
        if (options.keyPrefix && Array.isArray(key)) {
          resultKey = key.map(k => `${options.keyPrefix}${keySeparator}${k}`);
        } else {
          resultKey = options.keyPrefix ? `${options.keyPrefix}${keySeparator}${key}` : key;
        }
        return _this3.t(resultKey, options);
      };
      if (isString(lng)) {
        fixedT.lng = lng;
      } else {
        fixedT.lngs = lng;
      }
      fixedT.ns = ns;
      fixedT.keyPrefix = keyPrefix;
      return fixedT;
    }
    t() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return this.translator?.translate(...args);
    }
    exists() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      return this.translator?.exists(...args);
    }
    setDefaultNamespace(ns) {
      this.options.defaultNS = ns;
    }
    hasLoadedNamespace(ns) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!this.isInitialized) {
        this.logger.warn('hasLoadedNamespace: i18next was not initialized', this.languages);
        return false;
      }
      if (!this.languages || !this.languages.length) {
        this.logger.warn('hasLoadedNamespace: i18n.languages were undefined or empty', this.languages);
        return false;
      }
      const lng = options.lng || this.resolvedLanguage || this.languages[0];
      const fallbackLng = this.options ? this.options.fallbackLng : false;
      const lastLng = this.languages[this.languages.length - 1];
      if (lng.toLowerCase() === 'cimode') return true;
      const loadNotPending = (l, n) => {
        const loadState = this.services.backendConnector.state[`${l}|${n}`];
        return loadState === -1 || loadState === 0 || loadState === 2;
      };
      if (options.precheck) {
        const preResult = options.precheck(this, loadNotPending);
        if (preResult !== undefined) return preResult;
      }
      if (this.hasResourceBundle(lng, ns)) return true;
      if (!this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages) return true;
      if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
      return false;
    }
    loadNamespaces(ns, callback) {
      const deferred = defer();
      if (!this.options.ns) {
        if (callback) callback();
        return Promise.resolve();
      }
      if (isString(ns)) ns = [ns];
      ns.forEach(n => {
        if (this.options.ns.indexOf(n) < 0) this.options.ns.push(n);
      });
      this.loadResources(err => {
        deferred.resolve();
        if (callback) callback(err);
      });
      return deferred;
    }
    loadLanguages(lngs, callback) {
      const deferred = defer();
      if (isString(lngs)) lngs = [lngs];
      const preloaded = this.options.preload || [];
      const newLngs = lngs.filter(lng => preloaded.indexOf(lng) < 0 && this.services.languageUtils.isSupportedCode(lng));
      if (!newLngs.length) {
        if (callback) callback();
        return Promise.resolve();
      }
      this.options.preload = preloaded.concat(newLngs);
      this.loadResources(err => {
        deferred.resolve();
        if (callback) callback(err);
      });
      return deferred;
    }
    dir(lng) {
      if (!lng) lng = this.resolvedLanguage || (this.languages?.length > 0 ? this.languages[0] : this.language);
      if (!lng) return 'rtl';
      const rtlLngs = ['ar', 'shu', 'sqr', 'ssh', 'xaa', 'yhd', 'yud', 'aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'ads', 'aeb', 'aec', 'afb', 'ajp', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'bbz', 'pga', 'he', 'iw', 'ps', 'pbt', 'pbu', 'pst', 'prp', 'prd', 'ug', 'ur', 'ydd', 'yds', 'yih', 'ji', 'yi', 'hbo', 'men', 'xmn', 'fa', 'jpr', 'peo', 'pes', 'prs', 'dv', 'sam', 'ckb'];
      const languageUtils = this.services?.languageUtils || new LanguageUtil(get());
      return rtlLngs.indexOf(languageUtils.getLanguagePartFromCode(lng)) > -1 || lng.toLowerCase().indexOf('-arab') > 1 ? 'rtl' : 'ltr';
    }
    static createInstance() {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      let callback = arguments.length > 1 ? arguments[1] : undefined;
      return new I18n(options, callback);
    }
    cloneInstance() {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
      const forkResourceStore = options.forkResourceStore;
      if (forkResourceStore) delete options.forkResourceStore;
      const mergedOptions = {
        ...this.options,
        ...options,
        ...{
          isClone: true
        }
      };
      const clone = new I18n(mergedOptions);
      if (options.debug !== undefined || options.prefix !== undefined) {
        clone.logger = clone.logger.clone(options);
      }
      const membersToCopy = ['store', 'services', 'language'];
      membersToCopy.forEach(m => {
        clone[m] = this[m];
      });
      clone.services = {
        ...this.services
      };
      clone.services.utils = {
        hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
      };
      if (forkResourceStore) {
        const clonedData = Object.keys(this.store.data).reduce((prev, l) => {
          prev[l] = {
            ...this.store.data[l]
          };
          return Object.keys(prev[l]).reduce((acc, n) => {
            acc[n] = {
              ...prev[l][n]
            };
            return acc;
          }, {});
        }, {});
        clone.store = new ResourceStore(clonedData, mergedOptions);
        clone.services.resourceStore = clone.store;
      }
      clone.translator = new Translator(clone.services, mergedOptions);
      clone.translator.on('*', function (event) {
        for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          args[_key6 - 1] = arguments[_key6];
        }
        clone.emit(event, ...args);
      });
      clone.init(mergedOptions, callback);
      clone.translator.options = mergedOptions;
      clone.translator.backendConnector.services.utils = {
        hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
      };
      return clone;
    }
    toJSON() {
      return {
        options: this.options,
        store: this.store,
        language: this.language,
        languages: this.languages,
        resolvedLanguage: this.resolvedLanguage
      };
    }
  }
  const instance = I18n.createInstance();
  instance.createInstance = I18n.createInstance;

  instance.createInstance;
  instance.dir;
  instance.init;
  instance.loadResources;
  instance.reloadResources;
  instance.use;
  instance.changeLanguage;
  instance.getFixedT;
  instance.t;
  instance.exists;
  instance.setDefaultNamespace;
  instance.hasLoadedNamespace;
  instance.loadNamespaces;
  instance.loadLanguages;

  var data = { en:{ opening_hours:{ pretty:{ off:"closed",
          SH:"school holidays",
          PH:"public holidays" } } },
    de:{ opening_hours:{ texts:{ "unexpected token":"Unerwartetes Zeichen: \"{{token}}\" Das bedeutet, dass die Syntax an dieser Stelle nicht erkannt werden konnte.",
          "no string":"Der Wert (erster Parameter) ist kein String",
          nothing:"Der Wert enthält nichts, was ausgewertet werden könnte.",
          "nothing useful":"Diese Regel enthält nichts nützliches. Bitte entferne diese leere Regel.",
          "combine rules":"Getrennte Regeln erkannt welche jeweils nur aus einer Zeit Bereichsdefinition bestehen. Diese Regeln sollten mittels \"{{ok}}\" zu einer Regel kombiniert werden.",
          "value ends with token":"Der Wert endet mit \"{{token}}\". Bitte ergänze den Wert nach \"{{token}}\" oder lösche \"{{token}}\".",
          "programmers joke":"Kann es sein, dass du ein Programmierer bist und das Hinzufügen eines Semikolons nach jedem Statement ist zwanghaft ;) ? Es ist so, dass das Semikolon in der opening_hours-Syntax als Trenner für Regeln definiert ist. Bitte verzichte an dieser Stelle auf ein Semikolon.",
          "interpreted as year":"Die Zahl {{number}} wird als Jahr interpretiert. Vermutlich ist das nicht beabsichtigt. Uhrzeiten werden als \"12:00\" angegeben.",
          "rule before fallback empty":"Die Regel vor der Fallback-Regel enthält nichts nützliches",
          "hour min separator":"Bitte benutze \":\" als Stunden/Minuten-Trenner",
          "warnings severity":"Der Parameter optional_conf_parm[\"warnings_severity\"] muss eine ganze Zahl zwischen (einschließlich) 0 und (einschließlich) 7 sein. Gegeben: {{severity}}, erwartet: Eine der Zahlen: {{allowed}}.",
          "optional conf parm type":"Der optional_conf_parm Parameter hat einen unbekannten Typ. Gegeben: {{given}}",
          "conf param tag key missing":"Der optional_conf_parm[\"tag_key\"] fehlt, ist aber notwendig wegen optional_conf_parm[\"map_value\"].",
          "conf param mode invalid":"Der optional_conf_parm[\"mode\"]-Parameter ist eine ungültige Zahl. Gegeben: {{given}}, erwartet: Eine der Zahlen: {{allowed}}.",
          "conf param unknown type":"Der optional_conf_parm[\"{{key}}\"] Parameter hat einen unbekannten Typ. Gegeben: {{given}}, erwartet: {{expected}}.",
          "library bug":"Bei der Auswertung des Wertes \"{{value}}\" ist ein Fehler aufgetreten. Bitte melde diesen Fehler oder korrigiere diesen mittels eines Pull Requests oder Patches: {{-url}}.{{message}}",
          "library bug PR only":"Bei der Auswertung des Wertes \"{{value}}\" ist ein Fehler aufgetreten. Du kannst dies korrigieren, indem du das Problem löst und in Form eines Pull Requests oder Patches zum Projekt beiträgst: {{-url}}.{{message}}",
          "use multi":"Du hast {{count}} {{-part2}} Einzelne Regeln können mit \";\" getrennt werden.",
          "selector multi 2a":"{{what}} in einer Regel benutzt. Du kannst nur einen davon je Regel verwenden",
          "selector multi 2b":"nicht verbundene {{what}} in einer Regel benutzt. Das ist vermutlich ein Fehler. Gleiche Selektoren können (und sollten) immer zusammen und durch Kommas getrennt geschrieben werden. Beispiel für Zeitspannen \"12:00-13:00,15:00-18:00\". Beispiel für Wochentage \"Mo-We,Fr\".",
          "selector state":"Status-Schlüsselwörter (offen, geschlossen)",
          comments:"Kommentare",
          months:"Monate",
          weekdays:"Wochentage",
          ranges:"Zeitspannen",
          "default state":"Diese Regel, welche den Standard-Status (d.h. geschlossen) für alle folgenden Regeln ändert, ist nicht die erste Regel. Diese Regel überschreibt alle vorherigen Regeln. Es kann legitim sein, den Standard-Status z.B. auf geöffnet festzulegen und dann nur die Zeiten, zu denen geschlossen ist, anzugeben.",
          vague:"Diese Regel ist nicht sehr aussagekräftig, da kein Zeit Selektor angegeben wurde. Ein Zeit Selektor ist die Komponente die angibt, zu welcher Tageszeit ein Objekt geöffnet hat, zum Beispiel \"10:00-19:00\". Bitte füge eine Zeitangabe oder einen Kommentar hinzu, um dies zu verbessern.",
          "empty comment":"Du hast einen leeren Kommentar verwendet.\" Bitte schreibe entweder einen Kommentar-Text oder benutze stattdessen das Schlüsselwort \"unknown\".",
          separator_for_readability:"Du hast das optionale Symbol <separator_for_readability> an der falschen Stelle benutzt. Bitte lies die Syntax-Spezifikation um zu sehen, wo es verwendet werden kann, oder entferne es.",
          "strange 24/7":"Du hast 24/7 in einer Art verwendet, welche wahrscheinlich nicht als \"24 Stunden, 7 Tage die Woche\" interpretiert wird. Der Richtigkeit halber solltest du \"open\" oder \"closed\" für diese Regel verwenden und dann die Ausnahmen angeben um das selbe Ziel zu erreichen. So ist es klarer – zum Beispiel \"open; Mo 12:00-14:00 off\".",
          "public holiday":"Es wurde keine Regel für \"PH\" (feiertags) angegeben. Dies ist nicht sehr aussagekräftig.{{-part2}} Bitte füge die Regel \"PH off\" an, wenn die Einrichtung an allen Feiertagen geschlossen ist oder schreibe \"Sa,Su,PH 12:00-16:00\" um auszudrücken, dass Samstags, Sonntags und feiertags von 12:00-16:00 geöffnet ist. Bei einer Öffnungszeit wie \"Fr-Sa 18:00-06:00\" ist Vorsicht geboten, da \"PH off\" auf 00:00-24:00 zutrifft. Hier kann \"Fr-Sa 18:00-06:00; PH 18:00-06:00 off\" verwendet werden. Falls die Einrichtung täglich und an Feiertagen geöffnet ist, kann dies explizit mittels \"Mo-Su,PH\" ausgedrückt werden. Wenn du dir im Unklaren bist, versuche die Öffnungszeit zu klären. Falls das nicht möglich ist, lass die Angabe weg und ignoriere diese Warnung.",
          "public holiday part2":" Leider ist der \"tag key\" (beispielsweise \"opening_hours\", oder \"lit\") in opening_hours.js nicht bekannt. Diese Warnung betrifft nur die Keys: {{keys}}. Falls deine Angabe nicht für einen dieser ist, ignoriere bitte folgenden Hinweis:",
          "additional_rule_separator not used after time wrapping midnight":"Diese Regel überschreibt Teile der vorherigen Regel. Der Grund dafür ist, dass normale Regeln auf den ganzen Tag zutreffen und alle Definitionen von vorhergehenden Regeln für diesen Tag überschreiben. Du kannst diese Regel als additive Regel deklarieren indem du ein \",\" anstelle des üblichen \";\" für diese Regel verwendest. Beachte das die Überschreibung auch gewünscht sein kann und in so einem Fall diese Warnung ignoriert werden kann.",
          "additional rule which evaluates to closed":"Diese Regel wird als geschlossen ausgewertet aber wurde als additive Regel angegeben. Sie sollte als normale Regel mittels \";\" definiert sein. Siehe https://wiki.openstreetmap.org/wiki/DE:Key:opening_hours/specification#explain:rule_modifier:closed.",
          switched:"Der Selektor \"{{first}}\" wurde für eine bessere Lesbarkeit und der Vollständigkeit halber mit \"{{second}}\" getauscht.",
          "no colon after":"Bitte Benutze kein \":\" nach dem Token {{token}}.",
          "number -5 to 5":"Zahl zwischen -5 und 5 (außer 0) erwartet.",
          "one weekday constraint":"Du kannst höchstens einen beschränkten Wochentag in einer Monats-Spanne verwenden",
          "range constrained weekdays":"Du kannst keine Wochentags-Spanne als Beschränkung in einer Monats-Spanne verwenden",
          expected:"\"{{-symbol}}\" erwartet.",
          "range zero":"Du kannst keine {{type}}-Spanne mit Periode \"0\" verwenden.",
          "period one year+":"Bitte verwende keine {{type}}-Spannen mit Periode \"1\". Wenn du ausdrücken willst, das eine Einrichtung ab einem bestimmten Jahr immer offen ist, benutze bitte \"<year>+\".",
          "period one":"Bitte verwende keine {{type}}-Spannen mit Periode \"1\".",
          "month 31":"Die Tagesangabe für {{month}} muss zwischen 1 und 31 liegen.",
          "month 30":"Der Monat {{month}} hat keine 31 Tage. Der letzte Tag von {{month}} ist Tag 30.",
          "month feb":"\"Der Monat {{month}} hat entweder 28 oder 29 Tage (Schaltjahre).\"",
          "point in time":"Erwarte Bindestrich (-) oder offenes Ende (+) in der Zeitspanne {{calc}}. Um mit Zeitpunkten zu arbeiten, muss der Modus für  {{libraryname}} umgestellt werden. Vielleicht falsches OSM-tag verwendet?",
          calculation:"Berechnung",
          "time range continue":"Die Zeitspanne geht nicht wie erwartet weiter",
          "period continue":"Die Zeitspannen-Periode geht nicht wie erwartet weiter. Beispiel \"/01:30\".",
          "time range mode":"{{libraryname}} wurde im \"Zeitspannen-Modus\" aufgerufen. Zeitpunkt gefunden.",
          "time ranges":"Zeitspannen",
          "holiday ranges":"Feiertagen",
          "point in time mode":"{{libraryname}} wurde im \"Zeitpunkt-Modus\" aufgerufen. Zeitspanne gefunden.",
          "outside current day":"Zeitspanne beginnt außerhalb des aktuellen Tages",
          "two midnights":"Zeitspanne welche mehrmals Mitternacht beinhaltet wird nicht unterstützt",
          "without minutes":"Zeitspanne ohne Minutenangabe angegeben. Das ist nicht sehr eindeutig! Bitte verwende stattdessen folgende Syntax \"{{syntax}}\".",
          "outside day":"Die Zeitspanne beginnt außerhalb des aktuellen Tages",
          "zero calculation":"Das Hinzufügen von 0 in einer variablen Zeitberechnung ändert die variable Zeit nicht. Bitte entferne die Zeitberechnung (Beispiel: \"sunrise-(sunset-00:00)\").",
          "calculation syntax":"Berechnung mit variabler Zeit hat nicht die korrekte Syntax",
          missing:"Fehlendes \"{{symbol}}\"",
          "(time)":"(Zeit)",
          "bad range":"Ungültige Zeitspanne: {{from}}-{{to}}",
          "] or more numbers":"\"]\" oder weitere Zahlen erwartet.",
          "additional rule no sense":"Eine weitere Regel an dieser Stelle ergibt keinen Sinn. Benutze einfach \";\" als Trenner für Regeln. Siehe https://wiki.openstreetmap.org/wiki/Key:opening_hours/specification#explain:additional_rule_separator",
          "unexpected token weekday range":"Unerwartes Token in Tages-Spanne: {{token}}",
          "max differ":"Es sollte keinen Grund geben, mehr als {{maxdiffer}} Tage von einem {{name}} abzuweichen. Wenn nötig, teile uns dies bitte mit …",
          "adding 0":"Addition von 0 verändert das Datum nicht. Bitte weglassen.",
          "unexpected token holiday":"Unerwarteter Token (in Feiertags-Auswertung): {{token}}",
          "no holiday definition":"{{name}} ist für das Land {{cc}} nicht definiert.",
          "no holiday definition state":"{{name}} ist für das Land {{cc}} und Bundesland {{state}} nicht definiert.",
          "no country code":"Der Ländercode fehlt. Dieser wird benötigt um die korrekten Feiertage zu bestimmen (siehe in der README wie dieser anzugeben ist)",
          "no SH definition":"Die Schulferien {{name}}sind für das Jahr {{year}} nicht definiert",
          "movable no formula":"Der bewegliche Feiertag {{name}} kann nicht berechnet werden. Bitte füge eine entsprechende Formel hinzu.",
          "movable not in year":"Der bewegliche Feiertag {{name}} plus {{days}} Tage befindet sich nicht mehr im selben Jahr. Aktuell nicht unterstützt.",
          "year range one year":"Eine Jahres-Spanne mit gleichem Jahr als Beginn und Ende ergibt keinen Sinn. Bitte entferne das Ende-Jahr. zum Beispiel: \"{{year}} May 23\"",
          "year range reverse":"Eine Jahres-Spanne mit Beginn größer als Ende ergibt keinen Sinn. Bitte umdrehen.",
          "year past":"Das Jahr liegt in der Vergangenheit.",
          "unexpected token year range":"Unerwartetes Token in der Jahres-Spanne: {{token}}",
          "week range reverse":"Du hast eine Wochen-Spanne in umgekehrter Reihenfolge oder mehrere Jahre umfassende angegeben. Dies ist aktuell nicht unterstützt.",
          "week negative":"Du hast eine Kalenderwoche kleiner 1 angegeben. Korrekte Angaben sind 1-53.",
          "week exceed":"Du hast eine Kalenderwoche größer als 53 angegeben. Korrekte Angaben sind 1-53.",
          "week period less than 2":"Du hast eine Wochenperiode kleiner 2 angegeben. Wenn du die gesamte Spanne von {{weekfrom}} bis {{weekto}} angeben willst, lasse \"/{{period}}\" einfach weg.",
          "week period greater than 26":"Du hast eine Wochen-Periode größer als 26 angegeben. 26,5 ist die Hälfte des Maximums von 53 Wochen pro Jahr. Damit würde eine Periode größer als 26 nur einmal pro Jahr auftreten. Bitte gibt den Wochen-Selektor als \"week {{weekfrom}}\" an, wenn es das ist, was du ausdrücken möchtest.",
          "unexpected token week range":"Unerwartetes Token in Wochen-Spanne: {{token}}",
          "unexpected token month range":"Unerwartetes Token in Monats-Spanne: {{token}}",
          "day range reverse":"Zeitspanne in falscher Reihenfolge. Beginn ist größer als Ende.",
          "open end":"Angegeben als \"open end\". Schließzeit wurde geraten.",
          "date parameter needed":"Datumsparameter nötig.",
          "assuming ok for ko":"\"{{ko}}\" wird als \"{{ok}}\" interpretiert.",
          "please use ok for ko":"Bitte verwende \"{{-ok}}\" anstelle von \"{{-ko}}\".",
          "please use ok for similar looking ko":"Please use notation \"{{ok}}\" for \"{{ko}}\". Those characters look very similar but are not the same!",
          "rant degree sign used for zero":"Beachte das dies ein Gradzeichen ist, welches als (hochgestellte) Null missbraucht wurde. Eine hochgestellte Null ist in Unicode definiert (°) und wäre angebrachter/einheitlicher an dieser Stelle. Allerdings ist die Verwendung von nicht ASCII Ziffern nicht erlaubt.",
          "please use English written ok for ko":"Bitte benutze die englische Schreibweise \"{{ok}}\" für \"{{ko}}\".",
          "please use English abbreviation ok for ko":"Bitte benutze die englische Abkürzung \"{{ok}}\" für \"{{ko}}\".",
          "please use English abbreviation ok for so":"Bitte benutze die englische Abkürzung \"{{ok}}\" für \"{{ko}}\". Beachte das Samstag in Polnisch gemeint sein kann.",
          "please use off for ko":"Bitte benutze \"{{ok}}\" für \"{{ko}}\". Beispiel: \"Mo-Fr 08:00-12:00; Tu off\".",
          "please use ok for workday":"\"{{ko}}\" wird als \"{{ok}}\" interpretiert. Werktag sollte nicht verwendet werden. Siehe https://wiki.openstreetmap.org/wiki/Talk:Key:opening_hours#need_syntax_for_holidays_and_workingdays",
          "omit hour keyword":"Bitte lasse \"{{ko}}\" weg oder verwende einen Doppelpunkt. Beispiel: \"12:00-14:00\".",
          "omit ko":"Bitte verzichte auf \"{{ko}}\".",
          "omit tag key":"Bitte lasse \"{{ko}}\" weg. Der Tag Schlüssel darf nicht im Tag Wert sein.",
          "omit wrong keyword open end":"Bitte lasse \"{{ko}}\" weg. Falls du \"open end\" ausdrücken möchtest verwende bitte ein \"+\". Beispiel: \"12:00+\".",
          "assuming open end for ko":"\"{{ko}}\" wird als \"{{ok}}\" (\"open end\") interpretiert. Example: \"12:00+\".",
          "please use ok for uncertainty":"Bitte verwende \"{{ok}}\" für \"{{ko}}\". Falls der begründete Verdacht der Ungewissheit vorliegt ziehe die Verwendung eines Kommentars in Betracht. Beispiel: 12:00-14:00 \"only on sunshine\".",
          "please use fallback rule":"Bitte verwende \"{{ok}}\" (Fallback Regel) für \"{{ko}}\". Beispiel: Mo-Fr 12:00-14:00; PH off || \"nach Vereinbarung\"",
          "please use ok for missing data":"Bitte verwende eine FIXME Notiz.",
          "please use 24 hours time for ko":"Bitte verwende 24 Stunden Zeitangaben anstelle der veralteten 12 Stunden Variante. Falls die 12 Stunden Variante verwendet wird ist eventuelle eine Konvertierung notwendig.",
          "please use restriction comment time for ko":"Es sieht so aus also möchtest du zusätzliche Einschränkungen für eine Öffnungszeit geben. Falls sich dies nicht mit der Syntax ausdrücken lässt können Kommentare verwendet werden. Zusätzlich sollte eventuell das Schlüsselwort `open` benutzt werden. Beispiel: open \"Nur Frauen\".",
          "please use ok for typographically correct":"Bitte verwende \"{{-ok}}\" für \"{{ko}}\". Auch wenn \"{{ko}}\" typografisch korrekt ist, ist dies in der opening_hours Syntax nicht definiert. Korrekte Typographie sollte auf Anwendungsebene sichergestellt werden …" },
        pretty:{ off:"geschlossen",
          SH:"Schulferien",
          PH:"Feiertags" } } },
    eo:{ opening_hours:{ texts:{ "assuming ok for ko":"\"{{ko}}\" estas interpretita kiel \"{{ok}}\".",
          "please use ok for ko":"Bonvolu uzi la esprimon \"{{-ok}}\" anstataŭ \"{{ko}}\".",
          "please use English abbreviation ok for ko":"Bonvolu uzi la anglan mallongigon \"{{ok}}\" für \"{{ko}}\"." },
        pretty:{ off:"fermita",
          SH:"lernejaj ferioj",
          PH:"festotagoj" } } },
    fi:{ opening_hours:{ pretty:{ off:"suljettu",
          SH:"koululomat",
          PH:"lailliset vapaapäivät" } } },
    fr:{ opening_hours:{ texts:{ "assuming ok for ko":"suppose \"{{ok}}\" pour \"{{ko}}\".",
          "please use ok for ko":"S'il vous plaît utilisez \"{{ok}}\" pour \"{{ko}}\".",
          "please use English abbreviation ok for ko":"S'il vous plaît utiliseé l'abréviation \"{{ok}}\" pour \"{{ko}}\"." },
        pretty:{ off:"fermé",
          SH:"vacances scolaires",
          PH:"jours fériés" } } },
    nl:{ opening_hours:{ texts:{ "please use English abbreviation ok for ko":"Neem de engelse afkorting \"{{ok}}\" voor \"{{ko}}\" alstublieft." },
        pretty:{ off:"gesloten",
          SH:"schoolvakantie",
          PH:"feestdagen" } } },
    ru:{ opening_hours:{ pretty:{ off:"закрыто",
          SH:"каникулы",
          PH:"праздник" } } },
    it:{ opening_hours:{ pretty:{ off:"chiuso",
          SH:"festività scolastiche",
          PH:"festività" } } } };
  data.en;
  data.de;
  data.eo;
  data.fi;
  data.fr;
  data.nl;
  data.ru;
  data.it;

  if (!instance.isInitialized) {
      instance.init({
          fallbackLng: 'en',
          // lngWhitelist: ['en', 'de'],
          resources: data,
          getAsync: true,
          useCookie: true,
          // debug: true,
      });
  } else {
      // compat with an app that already initializes i18n
      for (var lang in data) {
          instance.addResourceBundle(lang, 'opening_hours', data[lang]['opening_hours'], true);
      }
  }

  /* jshint laxbreak: true */
  /* jshint boss: true */
  /* jshint loopfunc: true */


  function index(value, nominatim_object, optional_conf_parm) {
      // Short constants {{{
      var word_value_replacement = { // If the correct values can not be calculated.
          dawn    : 60 * 5 + 30,
          sunrise : 60 * 6,
          sunset  : 60 * 18,
          dusk    : 60 * 18 + 30,
      };
      var months   = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var weekdays = ['Su','Mo','Tu','We','Th','Fr','Sa'];
      var string_to_token_map = {
          'su': [ 0, 'weekday' ],
          'mo': [ 1, 'weekday' ],
          'tu': [ 2, 'weekday' ],
          'we': [ 3, 'weekday' ],
          'th': [ 4, 'weekday' ],
          'fr': [ 5, 'weekday' ],
          'sa': [ 6, 'weekday' ],
          'jan': [  0, 'month' ],
          'feb': [  1, 'month' ],
          'mar': [  2, 'month' ],
          'apr': [  3, 'month' ],
          'may': [  4, 'month' ],
          'jun': [  5, 'month' ],
          'jul': [  6, 'month' ],
          'aug': [  7, 'month' ],
          'sep': [  8, 'month' ],
          'oct': [  9, 'month' ],
          'nov': [ 10, 'month' ],
          'dec': [ 11, 'month' ],
          'day': [ 'day', 'calcday' ],
          'days': [ 'days', 'calcday' ],
          'sunrise': [ 'sunrise', 'timevar' ],
          'sunset': [ 'sunset', 'timevar' ],
          'dawn': [ 'dawn', 'timevar' ],
          'dusk': [ 'dusk', 'timevar' ],
          'easter': [ 'easter', 'event' ],
          'week': [ 'week', 'week' ],
          'open': [ 'open', 'state' ],
          'closed': [ 'closed', 'state' ],
          'off': [ 'off', 'state' ],
          'unknown': [ 'unknown', 'state' ],
      };

      var default_prettify_conf = {
          // Update README.md if changed.
          'zero_pad_hour': true,           // enforce ("%02d", hour)
          'one_zero_if_hour_zero': false,  // only one zero "0" if hour is zero "0"
          'leave_off_closed': true,        // leave keywords "off" and "closed" as is
          'keyword_for_off_closed': 'off', // use given keyword instead of "off" or "closed"
          'rule_sep_string': ' ',          // separate rules by string
          'print_semicolon': true,         // print token which separates normal rules
          'leave_weekday_sep_one_day_betw': true, // use the separator (either "," or "-" which is used to separate days which follow to each other like Sa,Su or Su-Mo
          'sep_one_day_between': ',',      // separator which should be used
          'zero_pad_month_and_week_numbers': true, // Format week (e.g. `week 01`) and month day numbers (e.g. `Jan 01`) with "%02d".
          'locale': 'en',                  // use local language (needs i18next)
      };

      var osm_tag_defaults = {
          'opening_hours'       :  { 'mode' :  0, 'warn_for_PH_missing' :  true, },
          'collection_times'    :  { 'mode' :  2, },
          /* oh_mode 2: "including the hyphen because there are post boxes which are
           * emptied several (undefined) times or one (undefined) time in a certain time
           * frame. This shall be covered also.".
           * Ref: https://wiki.openstreetmap.org/wiki/Key:collection_times */
          'opening_hours:.+'    :  { 'mode' :  0, },
          '.+:opening_hours'    :  { 'mode' :  0, },
          '.+:opening_hours:.+' :  { 'mode' :  0, },
          'smoking_hours'       :  { 'mode' :  0, },
          'service_times'       :  { 'mode' :  2, },
          'happy_hours'         :  { 'mode' :  0, },
          'lit'                 :  { 'mode' :  0,
              map: {
                  'yes'      : 'sunset-sunrise open "specified as yes: At night (unknown time schedule or daylight detection)"',
                  'automatic': 'unknown "specified as automatic: When someone enters the way the lights are turned on."',
                  'no'       : 'off "specified as no: There are no lights installed."',
                  'interval' : 'unknown "specified as interval"',
                  'limited'  : 'unknown "specified as limited"',
              }
          },
      };

      var minutes_in_day = 60 * 24;
      var msec_in_day    = 1000 * 60 * minutes_in_day;
      // var msec_in_week   = msec_in_day * 7;

      var library_name   = 'opening_hours.js';
      var repository_url = 'https://github.com/opening-hours/' + library_name;
      // var issues_url     = repository_url + '/issues?state=open';
      /* }}} */

      /* Translation function {{{ */
      /* Roughly compatibly to i18next so we can replace everything by i18next with
       * sprintf support.
       */
      var locale = 'en'; // Default locale
      if (typeof instance === 'object') {
          locale = instance.language;
      }

      var t = function(str, variables) {
          if (
                  typeof instance === 'object'
                  && typeof instance.t === 'function'
                  && typeof locale === 'string'
                  && ['de'].indexOf(locale) !== -1
              ) {

              var translatorFunction;
              if (instance.language !== locale) {
                  translatorFunction = instance.getFixedT(locale);
              } else {
                  translatorFunction = instance.t;
              }
              var text = translatorFunction('opening_hours:texts.' + str, variables);
              return text;
          }
          var text = data$1[str];
          if (typeof text === 'undefined') {
              text = str;
          }
          return text.replace(/{{([^{}]*)}}/g, function (match, c) {
              return typeof variables[c] !== 'undefined'
                  ? variables[c]
                  : match
                  ;
              }
          );
      };
      /* }}} */

      /* Optional constructor parameters {{{ */

      /* nominatim_object {{{
       *
       * Required to reasonably calculate 'sunrise' and holidays.
       */
      var location_cc, location_state, lat, lon;
      if (typeof nominatim_object === 'object' && nominatim_object !== null) {
          if (typeof nominatim_object.address === 'object') {
              if (typeof nominatim_object.address.country_code === 'string') {
                  location_cc = nominatim_object.address.country_code;
              }
              if (typeof nominatim_object.address.state === 'string') {
                  location_state = nominatim_object.address.state;
              } else if (typeof nominatim_object.address.county === 'string') {
                  location_state = nominatim_object.address.county;
              }
          }

          if (typeof nominatim_object.lon === 'string' && typeof nominatim_object.lat === 'string') {
              lat = nominatim_object.lat;
              lon = nominatim_object.lon;
          }
      } else if (nominatim_object === null) {
          /* Set the location to some random value. This can be used if you don’t
           * care about correct opening hours for more complex opening_hours
           * values.
           */
          location_cc = 'de';
          location_state = 'Baden-W\u00fcrttemberg';
          lat = '49.5400039';
          lon = '9.7937133';
      } else if (typeof nominatim_object !== 'undefined') {
          throw 'The nominatim_object parameter is of unknown type.'
              + ' Given ' + typeof(nominatim_object)
              + ', expected object.';
      }
      /* }}} */

      /* mode, locale, warnings_severity, tag_key, map_value {{{
       *
       * 0: time ranges (default), tags: opening_hours, lit, …
       * 1: points in time
       * 2: both (time ranges and points in time), tags: collection_times, service_times
       */

      var warnings_severity = 4;
      /* Default, currently the highest severity supported.
       * This number is expected to be >= 4. This is not explicitly checked.
       */

      var oh_mode;
      var oh_map_value = false;
      var oh_key, oh_regex_key;

      if (typeof optional_conf_parm === 'number') {
          oh_mode = optional_conf_parm;
      } else if (typeof optional_conf_parm === 'object') {
          if (typeof optional_conf_parm['locale'] === 'string') {
              /* TODO: The split thing is obviously a workaround. */
              locale = optional_conf_parm['locale'].split('-')[0];
          }
          if (checkOptionalConfParm('mode', 'number')) {
              oh_mode = optional_conf_parm['mode'];
          }
          if (checkOptionalConfParm('warnings_severity', 'number')) {
              warnings_severity = optional_conf_parm['warnings_severity'];
              if ([ 0, 1, 2, 3, 4, 5, 6, 7 ].indexOf(warnings_severity) === -1) {
                  throw t('warnings severity', { 'severity': warnings_severity, 'allowed': '[ 0, 1, 2, 3, 4, 5, 6, 7 ]' });
              }
          }
          if (checkOptionalConfParm('tag_key', 'string')) {
              oh_key = optional_conf_parm['tag_key'];
          }
          if (checkOptionalConfParm('map_value', 'boolean')) {
              oh_map_value = optional_conf_parm.map_value;
          }
      } else if (typeof optional_conf_parm !== 'undefined') {
          throw t('optional conf parm type', { 'given': typeof(optional_conf_parm) });
      }

      if (typeof oh_key === 'string') {
          oh_regex_key = getRegexKeyForKeyFromOsmDefaults(oh_key);

          if (oh_map_value
              && typeof osm_tag_defaults[oh_regex_key] === 'object'
              && typeof osm_tag_defaults[oh_regex_key]['map'] === 'object'
              && typeof osm_tag_defaults[oh_regex_key]['map'][value] === 'string'
              ) {

              value = osm_tag_defaults[oh_regex_key]['map'][value];
          }
      } else if (oh_map_value) {
          throw t('conf param tag key missing');
      }

      if (typeof oh_mode === 'undefined') {
          if (typeof oh_key === 'string' && osm_tag_defaults[oh_regex_key] !== undefined) {
              if (typeof osm_tag_defaults[oh_regex_key]['mode'] === 'number') {
                  oh_mode = osm_tag_defaults[oh_regex_key]['mode'];
              } else {
                  oh_mode = 0;
              }
          } else {
              oh_mode = 0;
          }
      } else if ([ 0, 1, 2 ].indexOf(oh_mode) === -1) {
          throw t('conf param mode invalid', { 'given': oh_mode, 'allowed': '[ 0, 1, 2 ]' });
      }

      /* }}} */
      /* }}} */

      // Tokenize value and generate selector functions. {{{
      if (typeof value !== 'string') {
          throw t('no string');
      }
      if (/^(?:\s*;?)+$/.test(value)) {
          throw t('nothing');
      }

      var parsing_warnings = []; // Elements are fed into function formatWarnErrorMessage(nrule, at, message)
      var done_with_warnings = false; // The functions which returns warnings can be called multiple times.
      var done_with_selector_reordering = false;
      var done_with_selector_reordering_warnings = false;
      var tokens = tokenize(value);
      // console.log(JSON.stringify(tokens, null, '    '));
      var prettified_value = '';
      var week_stable = true;

      var rules = [];
      var rule_infos = {};
      /* Not reliable because tokens !== new_tokens */
      // for (var nrule = 0; nrule < tokens.length; nrule++) {
      //     rule_infos[nrule] = {};
      // }
      var new_tokens = [];

      for (var nrule = 0; nrule < tokens.length; nrule++) {
          if (tokens[nrule][0].length === 0) {
              // Rule does contain nothing useful e.g. second rule of '10:00-12:00;' (empty) which needs to be handled.
              parsing_warnings.push([nrule, -1,
                  t('nothing useful')
                  + (nrule === tokens.length - 1 && nrule > 0 && !tokens[nrule][1] ?
                      ' ' + t('programmers joke') : '')
                  ]);
              continue;
          }

          var continue_at = 0;
          var next_rule_is_additional = false;
          do {
              if (continue_at === tokens[nrule][0].length) {
                  /* Additional rule does contain nothing useful e.g. second rule
                   * of '10:00-12:00,' (empty) which needs to be handled.
                    */
                  break;
              }

              var rule = {
                  // Time selectors
                  time: [],

                  // Temporary array of selectors from time wrapped to the next day
                  wraptime: [],

                  // Date selectors
                  weekday: [],
                  holiday: [],
                  week: [],
                  month: [],
                  monthday: [],
                  year: [],

                  // Array with non-empty date selector types, with most optimal ordering
                  date: [],

                  fallback: tokens[nrule][1],
                  additional: continue_at ? true : false,
                  meaning: true,
                  unknown: false,
                  comment: undefined,
                  build_from_token_rule: undefined,
              };

              rule.build_from_token_rule = [ nrule, continue_at, new_tokens.length ];
              continue_at = parseGroup(tokens[nrule][0], continue_at, rule, nrule);
              if (typeof continue_at === 'object') {
                  continue_at = continue_at[0];
              } else {
                  continue_at = 0;
              }

              // console.log('Current tokens: ' + JSON.stringify(tokens[nrule], null, '    '));

              new_tokens.push(
                  [
                      tokens[nrule][0].slice(
                          rule.build_from_token_rule[1],
                          continue_at === 0
                              ? tokens[nrule][0].length
                              : continue_at
                      ),
                      tokens[nrule][1],
                      tokens[nrule][2],
                  ]
              );

              if (next_rule_is_additional && new_tokens.length > 1) {
                  // Move 'rule separator' from last token of last rule to first token of this rule.
                  new_tokens[new_tokens.length - 1][0].unshift(new_tokens[new_tokens.length - 2][0].pop());
              }

              next_rule_is_additional = continue_at === 0 ? false : true;

              var optimal_selector_order = ['year', 'holiday', 'month', 'monthday', 'week', 'weekday'];
              optimal_selector_order.forEach(function (element) {
                  if (rule[element].length > 0) {
                      rule.date.push(rule[element]);
                      rule[element] = [];
                  }
              });

              // console.log('Rule: ' + JSON.stringify(rule, null, '    '));
              rules.push(rule);

              /* This handles selectors with time ranges wrapping over midnight (e.g. 10:00-02:00).
               * It generates wrappers for all selectors and creates a new rule.
               */
              if (rule.wraptime.length > 0) {
                  var wrapselectors = {
                      time: rule.wraptime,
                      date: [],

                      meaning: rule.meaning,
                      unknown: rule.unknown,
                      comment: rule.comment,

                      wrapped: true,
                      build_from_token_rule: rule.build_from_token_rule,
                  };

                  for (var dselg = 0; dselg < rule.date.length; dselg++) {
                      wrapselectors.date.push([]);
                      for (var dsel = 0; dsel < rule.date[dselg].length; dsel++) {
                          wrapselectors.date[wrapselectors.date.length-1].push(
                                  generateDateShifter(rule.date[dselg][dsel], -msec_in_day)
                              );
                      }
                  }

                  rules.push(wrapselectors);
              }
          } while (continue_at);
      }
      // console.log(JSON.stringify(tokens, null, '    '));
      // console.log(JSON.stringify(new_tokens, null, '    '));
      /* }}} */

      /* Helper functions {{{ */
      /* Get regex string key from key osm_tag_defaults. {{{
       *
       * :param key: Tag key e.g. opening_hours:kitchen.
       * :returns: Regex key from osm_tag_defaults e.g. opening_hours:.*
       */
      function getRegexKeyForKeyFromOsmDefaults(key) {
          var regex_key;
          var exact_match = false;

          Object.keys(osm_tag_defaults).forEach(function (osm_key) {
              if (exact_match === true) {
                  return;
              }
              if (key === osm_key) { // Exact match.
                  regex_key = osm_key;
                  // We can't just return here as some old browsers
                  // don't interpret it as a final return (like a loop break)
                  exact_match = true;
              } else if (new RegExp(osm_key).test(key)) {
                  regex_key = osm_key;
              }
          });
          return regex_key;
      }
      /* }}} */

      /* Check given element in optional_conf_parm. {{{
       *
       * :param key: Key of optional_conf_parm.
       * :param expected_type: Expected `typeof()` the parameter.
       * :returns: True if the expected type matches the given type.
       */
      function checkOptionalConfParm(key, expected_type) {
          if (typeof optional_conf_parm[key] === expected_type) {
              return true;
          } else if (typeof optional_conf_parm[key] !== 'undefined') {
              throw t('conf param unknown type', { 'key': key, 'given': typeof(optional_conf_parm[key]), 'expected': expected_type });
          }
          return false;
      }
      /* }}} */
      /* }}} */

      /* Format warning or error message for the user. {{{
       *
       * :param nrule: Rule number starting with 0.
       * :param at: Token position at which the issue occurred.
       * :param message: Human readable string with the message.
       * :param tokens_to_use: List of token objects.
       * :returns: String with position of the warning or error marked for the user.
       */
      function formatWarnErrorMessage(nrule, at, message, tokens_to_use) {
          if (typeof tokens_to_use === 'undefined') {
              tokens_to_use = tokens;
          }
          // console.log(`Called formatWarnErrorMessage: ${nrule}, ${at}, ${message}`);
          // FIXME: Change to new_tokens.
          if (typeof nrule === 'number') {
              var pos = 0;
              if (nrule === -1) { // Usage of rule index not required because we do have access to value.length.
                  pos = value.length - at;
              } else { // Issue occurred at a later time, position in string needs to be reconstructed.
                  if (typeof tokens_to_use[nrule][0][at] === 'undefined') {
                      if (typeof tokens_to_use[nrule][0] && at === -1) {
                          pos = value.length;
                          if (typeof tokens_to_use[nrule+1] === 'object' && typeof tokens_to_use[nrule+1][2] === 'number') {
                              pos -= tokens_to_use[nrule+1][2];
                          } else if (typeof tokens_to_use[nrule][2] === 'number') {
                              pos -= tokens_to_use[nrule][2];
                          }
                      } else {
                          // Given position is invalid.
                          //
                          formatLibraryBugMessage('Bug in warning generation code which could not determine the exact position of the warning or error in value.');
                          pos = value.length;
                          if (typeof tokens_to_use[nrule][2] === 'number') {
                              // Fallback: Point to last token in the rule which caused the problem.
                              // Run real_test regularly to fix the problem before a user is confronted with it.
                              pos -= tokens_to_use[nrule][2];
                              console.warn('Last token for rule: ' + JSON.stringify(tokens_to_use[nrule]));
                              console.log(value.substring(0, pos) + ' <--- (' + message + ')');
                              console.log('\n');
                          } {
                              console.warn('tokens_to_use[nrule][2] is undefined. This is ok if nrule is the last rule.');
                          }
                      }
                  } else {
                      pos = value.length;
                      if (typeof tokens_to_use[nrule][0][at+1] === 'object') {
                          pos -= tokens_to_use[nrule][0][at+1][2];
                      } else if (typeof tokens_to_use[nrule][2] === 'number') {
                          pos -= tokens_to_use[nrule][2];
                      }
                  }
              }
              return value.substring(0, pos) + ' <--- (' + message + ')';
          } else if (typeof nrule === 'string') {
              return nrule.substring(0, at) + ' <--- (' + message + ')';
          }
      }
      /* }}} */

      /* Format internal library error message. {{{
       *
       * :param message: Human readable string with the error message.
       * :param text_template: Message template defined in the `lang` variable to use for the error message. Defaults to 'library bug'.
       * :returns: Error message for the user.
       */
      function formatLibraryBugMessage(message, text_template) {
          if (typeof message === 'undefined') {
              message = '';
          } else {
              message = ' ' + message;
          }
          if (typeof text_template !== 'string') {
              text_template = 'library bug';
          }

          message = t(text_template, { 'value': value, 'url': repository_url, 'message': message });
          console.error(message);
          return message;
      } /* }}} */

      /* Tokenize input stream {{{
       *
       * :param value: Raw opening_hours value.
       * :returns: Tokenized list object. Complex structure. Check the
       *        internal documentation in the docs/ directory for details.
       */
      function tokenize(value) {
          var all_tokens       = [];
          var curr_rule_tokens = [];

          var last_rule_fallback_terminated = false;

          while (value !== '') {
              /* Ordered after likelihood of input for performance reasons.
               * Also, error tolerance is supposed to happen at the end.
               */
              // console.log("Parsing value: " + value);
              var tmp = value.match(/^([a-z]{2,})\b((?:[.]| before| after)?)/i);
              var token_from_map = undefined;
              if (tmp && tmp[2] === '') {
                  token_from_map = string_to_token_map[tmp[1].toLowerCase()];
              }
              if (typeof token_from_map === 'object') {
                  curr_rule_tokens.push(token_from_map.concat([value.length]));
                  value = value.substr(tmp[1].length);
              } else if (tmp = value.match(/^\s+/)) {
                  // whitespace is ignored
                  value = value.substr(tmp[0].length);
              } else if (tmp = value.match(/^24\/7/)) {
                  // Reserved keyword.
                  curr_rule_tokens.push([tmp[0], tmp[0], value.length ]);
                  value = value.substr(tmp[0].length);
              } else if (/^;/.test(value)) {
                  // semicolon terminates rule.
                  // Next token belong to a new rule.
                  all_tokens.push([ curr_rule_tokens, last_rule_fallback_terminated, value.length ]);
                  value = value.substr(1);

                  curr_rule_tokens = [];
                  last_rule_fallback_terminated = false;
              } else if (/^[:.]/.test(value)) {
                  // Time separator (timesep).
                  if (value[0] === '.' && !done_with_warnings) {
                      parsing_warnings.push([ -1, value.length - 1, t('hour min separator')]);
                  }
                  curr_rule_tokens.push([ ':', 'timesep', value.length ]);
                  value = value.substr(1);
              } else if (tmp = value.match(/^(?:PH|SH)/i)) {
                  // special day name (holidays)
                  curr_rule_tokens.push([tmp[0].toUpperCase(), 'holiday', value.length ]);
                  value = value.substr(2);
              } else if (tmp = value.match(/^[°\u2070-\u209F\u00B2\u00B3\u00B9]{1,2}/)) {
                  var unicode_code_point_to_digit = {
                      176: 0,
                      0x2070: 0,
                      185: 1,
                      178: 2,
                      179: 3,
                  };
                  var regular_number = tmp[0].split('').map(function (ch) {
                      var code_point = ch.charCodeAt(0);
                      if (typeof unicode_code_point_to_digit[code_point] === 'number') {
                          return unicode_code_point_to_digit[code_point];
                      } else if (0x2074 <= code_point && code_point <= 0x2079) {
                          return code_point - 0x2070;
                      } else if (0x2080 <= code_point && code_point <= 0x2089) {
                          return code_point - 0x2080;
                      }
                  }).join('');
                  var ok = '';
                  if (curr_rule_tokens.length > 0 && matchTokens(curr_rule_tokens, curr_rule_tokens.length-1, 'number')) {
                      ok += ':';
                  }
                  ok += regular_number;
                  if (!done_with_warnings) {
                      for (var i = 0; i <= tmp[0].length; i++) {
                          if (value.charCodeAt(i) === 176) {
                              parsing_warnings.push([ -1, value.length - (1 + i),
                                      t('rant degree sign used for zero')]);
                          }
                      }
                      parsing_warnings.push([ -1, value.length - tmp[0].length,
                              t('please use ok for ko', {'ko': tmp[0], 'ok': ok})]);
                  }
                  value = ok + value.substr(tmp[0].length);
              } else if (tmp = value.match(/^(&|_|→|–|−|—|ー|=|·|öffnungszeit(?:en)?:?|opening_hours\s*=|\?|~|～|：|always (?:open|closed)|24x7|24 hours 7 days a week|24 hours|7 ?days(?:(?: a |\/)week)?|7j?\/7|all days?|every day|(?:bis|till?|-|–)? ?(?:open ?end|late)|(?:(?:one )?day (?:before|after) )?(?:school|public) holidays?|days?\b|до|рм|ам|jours fériés|on work days?|sonntags?|(?:nur |an )?sonn-?(?:(?: und |\/)feiertag(?:s|en?)?)?|(?:an )?feiertag(?:s|en?)?|(?:nach|on|by) (?:appointments?|vereinbarung|absprache)|p\.m\.|a\.m\.|[_a-zäößàáéøčěíúýřПнВсо]+\b|à|á|mo|tu|we|th|fr|sa|su|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)(\.?)/i)) {
                  /* Handle all remaining words and specific other characters with error tolerance.
                   *
                   * à|á: Word boundary does not work with Unicode chars: 'test à test'.match(/\bà\b/i)
                   * https://stackoverflow.com/questions/10590098/javascript-regexp-word-boundaries-unicode-characters
                   * Order in the regular expression capturing group is important in some cases.
                   *
                   * mo|tu|we|th|fr|sa|su|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec: Prefer defended keywords
                   * if used in cases like 'mo12:00-14:00' (when keyword is followed by number).
                   */
                  var correct_val = returnCorrectWordOrToken(tmp[1].toLowerCase(), value.length);
                  // console.log('Error tolerance for string "' + tmp[1] + '" returned "' + correct_val + '".');
                  if (typeof correct_val === 'object') {
                      curr_rule_tokens.push([ correct_val[0], correct_val[1], value.length ]);
                      value = value.substr(tmp[0].length);
                  } else if (typeof correct_val === 'string') {
                      if (correct_val === 'am' || correct_val === 'pm') {
                          var hours_token_at = curr_rule_tokens.length - 1;
                          var hours_token;
                          if (hours_token_at >= 0) {
                              if (hours_token_at -2 >= 0 &&
                                      matchTokens(
                                          curr_rule_tokens, hours_token_at - 2,
                                          'number', 'timesep', 'number'
                                      )
                              ) {
                                  hours_token_at -= 2;
                                  hours_token = curr_rule_tokens[hours_token_at];
                              } else if (matchTokens(curr_rule_tokens, hours_token_at, 'number')) {
                                  hours_token = curr_rule_tokens[hours_token_at];
                              }

                              if (typeof hours_token === 'object') {
                                  if (correct_val === 'pm' && hours_token[0] < 12) {
                                      hours_token[0] += 12;
                                  }
                                  if (correct_val === 'am' && hours_token[0] === 12) {
                                      hours_token[0] = 0;
                                  }
                                  curr_rule_tokens[hours_token_at] = hours_token;
                              }
                          }
                          correct_val = '';
                      }
                      var correct_tokens = tokenize(correct_val)[0];
                      if (correct_tokens[1] === true) { // last_rule_fallback_terminated
                          throw formatLibraryBugMessage();
                      }
                      for (var i = 0; i < correct_tokens[0].length; i++) {
                          curr_rule_tokens.push([correct_tokens[0][i][0], correct_tokens[0][i][1], value.length]);
                          // value.length - tmp[0].length does not have the desired effect for all test cases.
                      }

                      value = value.substr(tmp[0].length);
                      // value = correct_val + value.substr(tmp[0].length);
                      // Does not work because it would generate the wrong length for formatWarnErrorMessage.
                  } else {
                      // No correction available. Insert as single character token and let the parser handle the error.
                      curr_rule_tokens.push([value[0].toLowerCase(), value[0].toLowerCase(), value.length - 1 ]);
                      value = value.substr(1);
                  }
                  if (typeof tmp[2] === 'string' && tmp[2] !== '' && !done_with_warnings) {
                      parsing_warnings.push([ -1, value.length, t('omit ko', {'ko': tmp[2]})]);
                  }
              } else if (tmp = value.match(/^(\d+)(?:([.])([^\d]))?/)) {
                  // number
                  if (Number(tmp[1]) > 1900) { // Assumed to be a year number.
                      curr_rule_tokens.push([Number(tmp[1]), 'year', value.length ]);
                      if (Number(tmp[1]) >= 2100) // Probably an error
                          parsing_warnings.push([ -1, value.length - 1,
                                  t('interpreted as year', {number:  Number(tmp[1])})
                          ]);
                  } else {
                      curr_rule_tokens.push([Number(tmp[1]), 'number', value.length ]);
                  }

                  value = value.substr(tmp[1].length + (typeof tmp[2] === 'string' ? tmp[2].length : 0));
                  if (typeof tmp[2] === 'string' && tmp[2] !== '' && !done_with_warnings) {
                      parsing_warnings.push([ -1, value.length, t('omit ko', {'ko': tmp[2]})]);
                  }
              } else if (/^\|\|/.test(value)) {
                  // || terminates rule.
                  // Next token belong to a fallback rule.
                  if (curr_rule_tokens.length === 0) {
                      throw formatWarnErrorMessage(-1, value.length - 2, t('rule before fallback empty'));
                  }

                  all_tokens.push([ curr_rule_tokens, last_rule_fallback_terminated, value.length ]);
                  curr_rule_tokens = [];
                  // curr_rule_tokens = [ [ '||', 'rule separator', value.length  ] ];
                  // FIXME: Use this. Unknown bug needs to be solved in the process.
                  value = value.substr(2);

                  last_rule_fallback_terminated = true;
              } else if (tmp = value.match(/^"([^"]+)"/)) {
                  // Comment following the specification.
                  // Any character is allowed inside the comment except " itself.
                  curr_rule_tokens.push([tmp[1], 'comment', value.length ]);
                  value = value.substr(tmp[0].length);
              } else if (tmp = value.match(/^(["'„“‚‘’«「『])([^"'“”‘’»」』;|]*)(["'”“‘’»」』])/)) {
                  // Comments with error tolerance.
                  // The comments still have to be somewhat correct meaning
                  // the start and end quote signs used have to be
                  // appropriate. So “testing„ will not match as it is not a
                  // quote but rather something unknown which the user should
                  // fix first.
                  // console.log('Matched: ' + JSON.stringify(tmp));
                  for (var pos = 1; pos <= 3; pos += 2) {
                      // console.log('Pos: ' + pos + ', substring: ' + tmp[pos]);
                      var correct_val = returnCorrectWordOrToken(tmp[pos],
                          value.length - (pos === 3 ? tmp[1].length + tmp[2].length : 0)
                      );
                      if (typeof correct_val !== 'string' && tmp[pos] !== '"') {
                          throw formatLibraryBugMessage(
                              'A character for error tolerance was allowed in the regular expression'
                              + ' but is not covered by word_error_correction'
                              + ' which is needed to format a proper message for the user.'
                          );
                      }
                  }
                  curr_rule_tokens.push([tmp[2], 'comment', value.length ]);
                  value = value.substr(tmp[0].length);
              } else if (/^(?:␣|\s)/.test(value)) {
                  // Using "␣" as space is not expected to be a normal
                  // mistake. Just ignore it to make using taginfo easier.
                  value = value.substr(1);
              } else {
                  // other single-character tokens
                  curr_rule_tokens.push([value[0].toLowerCase(), value[0].toLowerCase(), value.length ]);
                  value = value.substr(1);
              }
          }

          all_tokens.push([ curr_rule_tokens, last_rule_fallback_terminated ]);

          return all_tokens;
      }
      /* }}} */

      /* error correction/tolerance function {{{
       * Go through word_error_correction hash and get correct value back.
       *
       * :param word: Wrong word or character.
       * :param value_length: Current value_length (used for warnings).
       * :returns:
       *        * (valid) opening_hours sub string.
       *        * object with [ internal_value, token_name ] if value is correct.
       *        * undefined if word could not be found (and thus is not corrected).
       */
      function returnCorrectWordOrToken(word, value_length) {
          var correctWordOrToken;
          var token_from_map = string_to_token_map[word];
          if (typeof token_from_map === 'object') {
              return token_from_map;
          }
          Object.keys(data$2).forEach(function (comment) {
              if (correctWordOrToken) {
                  return;
              }
              Object.keys(data$2[comment]).forEach(function (old_val) {
                  if (correctWordOrToken) {
                      return;
                  }
                  if (new RegExp('^' + old_val + '$').test(word)) {
                      var val = data$2[comment][old_val];
                      // Replace wrong words or characters with correct ones.
                      // This will return a string which is then being tokenized.
                      if (!done_with_warnings) {
                          parsing_warnings.push([
                              -1,
                              value_length - word.length,
                              t(comment, {'ko': word, 'ok': val}),
                          ]);
                      }
                      correctWordOrToken = val;
                  }
              });
          });
          return correctWordOrToken;
      }
      /* }}} */

      /* return warnings as list {{{
       *
       * :param it: Iterator object if available (optional).
       * :returns: Warnings as list with one warning per element.
       */
      function getWarnings(it) {
          if (warnings_severity < 4) {
              return [];
          }

          if (!done_with_warnings && typeof it === 'object') {
              /* getWarnings was called in a state without critical errors.
               * We can do extended tests.
               */

              /* Place all tests in this function if an additional (high
               * level) test is added and this does not require to rewrite
               * big parts of (sub) selector parsers only to get the
               * position. If that is the case, then rather place the test
               * code in the (sub) selector parser function directly.
               */

              var wide_range_selector_order = [ 'year', 'month', 'week', 'holiday' ];
              var small_range_selector_order = [ 'weekday', 'time', '24/7', 'state', 'comment'];

              // How many times was a selector_type used per rule? {{{
              var used_selectors = [];
              var used_selectors_types_array = [];
              var has_token = {};

              for (var nrule = 0; nrule < new_tokens.length; nrule++) {
                  if (new_tokens[nrule][0].length === 0) continue;
                  // Rule does contain nothing useful e.g. second rule of '10:00-12:00;' (empty) which needs to be handled.

                  var selector_start_end_type = [ 0, 0, undefined ];
                  // console.log(new_tokens[nrule][0]);

                  used_selectors[nrule] = {};
                  used_selectors_types_array[nrule] = [];

                  do {
                      selector_start_end_type = getSelectorRange(new_tokens[nrule][0], selector_start_end_type[1]);
                      // console.log(selector_start_end_type, new_tokens[nrule][0].length);

                      for (var token_pos = 0; token_pos <= selector_start_end_type[1]; token_pos++) {
                          if (typeof new_tokens[nrule][0][token_pos] === 'object' && new_tokens[nrule][0][token_pos][0] === 'PH') {
                              has_token['PH'] = true;
                          }
                      }

                      if (selector_start_end_type[0] === selector_start_end_type[1] &&
                          new_tokens[nrule][0][selector_start_end_type[0]][0] === '24/7'
                          ) {
                              has_token['24/7'] = true;
                      }

                      if (typeof used_selectors[nrule][selector_start_end_type[2]] !== 'object') {
                          used_selectors[nrule][selector_start_end_type[2]] = [ selector_start_end_type[1] ];
                      } else {
                          used_selectors[nrule][selector_start_end_type[2]].push(selector_start_end_type[1]);
                      }
                      used_selectors_types_array[nrule].push(selector_start_end_type[2]);

                      selector_start_end_type[1]++;
                  } while (selector_start_end_type[1] < new_tokens[nrule][0].length);
              }
              // console.log('used_selectors: ' + JSON.stringify(used_selectors, null, '    '));
              // console.log('used_selectors_types_array: ' + JSON.stringify(used_selectors_types_array, null, '    '));
              /* }}} */

              for (var nrule = 0; nrule < used_selectors.length; nrule++) {

                  /* Check if more than one not connected selector of the same type is used in one rule {{{ */
                  Object.keys(used_selectors[nrule]).forEach(function (selector_type) {
                      // console.log(selector_type + ' use at: ' + used_selectors[nrule][selector_type].length);
                      if (used_selectors[nrule][selector_type].length > 1) {
                          parsing_warnings.push([nrule, used_selectors[nrule][selector_type][used_selectors[nrule][selector_type].length - 1],
                              t('use multi', {
                                  'count': used_selectors[nrule][selector_type].length,
                                  'part2': (
                                      /^(?:comment|state)/.test(selector_type) ?
                                          t('selector multi 2a', {'what': (selector_type === 'state' ? t('selector state'): t('comments'))})
                                          :
                                          t('selector multi 2b', {'what': t(selector_type + (/^(?:month|weekday)$/.test(selector_type) ? 's' : ' ranges'))})
                                  )
                              })]
                          );
                          done_with_selector_reordering = true; // Correcting the selector order makes no sense if this kind of issue exists.
                      }
                  });
                  /* }}} */
                  /* Check if change default state rule is not the first rule {{{ */
                  if (   typeof used_selectors[nrule].state === 'object'
                      && Object.keys(used_selectors[nrule]).length === 1
                  ) {
                      if (nrule !== 0) {
                          parsing_warnings.push([nrule, new_tokens[nrule][0].length - 1, t('default state')]);
                      }
                  /* }}} */
                  /* Check if a rule (with state open) has no time selector {{{ */
                  } else if (typeof used_selectors[nrule].time === 'undefined') {
                      if (    (       typeof used_selectors[nrule].state === 'object'
                                  && new_tokens[nrule][0][used_selectors[nrule].state[0]][0] === 'open'
                                  && typeof used_selectors[nrule].comment === 'undefined'
                              ) || ( typeof used_selectors[nrule].comment === 'undefined'
                                  && typeof used_selectors[nrule].state === 'undefined'
                              ) &&
                              typeof used_selectors[nrule]['24/7'] === 'undefined'
                      ) {

                          parsing_warnings.push([nrule, new_tokens[nrule][0].length - 1, t('vague')]);
                      }
                  }
                  /* }}} */
                  /* Check if empty comment was given {{{ */
                  if (typeof used_selectors[nrule].comment === 'object'
                      && new_tokens[nrule][0][used_selectors[nrule].comment[0]][0].length === 0
                  ) {

                      parsing_warnings.push([nrule, used_selectors[nrule].comment[0], t('empty comment')]);
                  }
                  /* }}} */
                  /* Check for valid use of <separator_for_readability> {{{ */
                  for (var i = 0; i < used_selectors_types_array[nrule].length - 1; i++) {
                      var selector_type = used_selectors_types_array[nrule][i];
                      var next_selector_type = used_selectors_types_array[nrule][i+1];
                      if (   (   wide_range_selector_order.indexOf(selector_type)       !== -1
                              && wide_range_selector_order.indexOf(next_selector_type)  !== -1
                          ) || ( small_range_selector_order.indexOf(selector_type)      !== -1
                              && small_range_selector_order.indexOf(next_selector_type) !== -1)
                          ) {

                          if (new_tokens[nrule][0][used_selectors[nrule][selector_type][0]][0] === ':') {
                              parsing_warnings.push([nrule, used_selectors[nrule][selector_type][0],
                                  t('separator_for_readability')
                              ]);
                          }
                      }
                  }
                  /* }}} */
                  /* Check for missing use of <additional_rule_separator> for time wrapping midnight {{{ */
                  if (typeof rule_infos[nrule] === 'object'
                          && typeof rule_infos[nrule]['time_wraps_over_midnight'] === 'boolean'
                          && rule_infos[nrule]['time_wraps_over_midnight'] === true
                          && typeof used_selectors[nrule+1] === 'object'
                          && typeof used_selectors[nrule+1]['rule separator'] === 'undefined' // Not an additional rule
                          && new_tokens[nrule+1][1] === false // Not a fallback rule
                          ) {

                      var rules_too_complex = [ nrule, nrule+1 ].map(function (nrule){
                          for (var i = 0; i < wide_range_selector_order.length - 1; i++) {
                              if (typeof used_selectors[nrule][wide_range_selector_order[i]] === 'object') {
                                  return true;
                              }
                          }
                          return false;
                      });
                      var rules_too_complex_count = rules_too_complex.filter(function (el){ return el; }).length;
                      var next_rule_selects_next_day = false;
                      if (
                              typeof rule_infos[nrule] === 'object'
                              && typeof rule_infos[nrule] === 'object'
                              && typeof rule_infos[nrule]['week_days'] === 'object'
                              && typeof rule_infos[nrule+1] === 'object'
                              && typeof rule_infos[nrule+1]['week_days'] === 'object'
                              ) {
                          for (var i = 0; i < rule_infos[nrule]['week_days'].length; i++) {
                              var week_day = rule_infos[nrule]['week_days'][i];
                                  // console.log(rule_infos[nrule+1]['week_days']);
                                  // console.log(week_day);
                              if (rule_infos[nrule+1]['week_days'].indexOf(week_day === 6 ? 0 : week_day+1) !== -1) {
                                  next_rule_selects_next_day = true;
                                  break;
                              }
                          }
                      } else {
                          next_rule_selects_next_day = true;
                      }
                      // console.log(rule_infos);
                      // console.log(next_rule_selects_next_day);
                      var additional_rule_separator_enabled = (optional_conf_parm||{}).additional_rule_separator !== false;
                      if (rules_too_complex_count < 2 && next_rule_selects_next_day && additional_rule_separator_enabled) {
                          parsing_warnings.push([nrule+1, new_tokens[nrule+1][0].length - 1,
                              t('additional_rule_separator not used after time wrapping midnight'),
                              new_tokens
                          ]);
                      }
                  }
                  /* }}} */
                  /* Check if rule with closed|off modifier is additional {{{ */
                  if (typeof new_tokens[nrule][0][0] === 'object'
                          && new_tokens[nrule][0][0][0] === ','
                          && new_tokens[nrule][0][0][1] === 'rule separator'
                          && typeof used_selectors[nrule].state === 'object'
                          && (
                                 new_tokens[nrule][0][used_selectors[nrule].state[0]][0] === 'closed'
                              || new_tokens[nrule][0][used_selectors[nrule].state[0]][0] === 'off'
                             )
                  ) {

                      parsing_warnings.push([nrule, new_tokens[nrule][0].length - 1,
                          t('additional rule which evaluates to closed'),
                          new_tokens
                      ]);
                  }
                  /* }}} */

              }

              /* Check if 24/7 is used and it does not mean 24/7 because there are other rules {{{ */
              var has_advanced = it.advance();

              if (has_advanced === true && has_token['24/7'] && !done_with_warnings) {
                  parsing_warnings.push([ -1, 0,
                      // Probably because of: "24/7; 12:00-14:00 open", ". Needs extra testing.
                      t('strange 24/7')
                  ]);
              }
              /* }}} */

              /* Check for missing PH. {{{ */
              if (    warnings_severity >= 5
                  && !has_token['PH']
                  && !has_token['24/7']
                  && !done_with_warnings
                  && (
                          (
                              typeof oh_key === 'string'
                              && osm_tag_defaults[oh_regex_key]['warn_for_PH_missing']
                          )
                          || (typeof oh_key !== 'string')
                     )
                  ) {

                  var keys_with_warn_for_PH_missing = [];
                  Object.keys(osm_tag_defaults).forEach(function (key) {
                      if (osm_tag_defaults[key]['warn_for_PH_missing']) {
                          keys_with_warn_for_PH_missing.push(key);
                      }
                  });
                  parsing_warnings.push([ -1, 0,
                      t('public holiday', { 'part2': (typeof oh_key !== 'string'
                          ? t('public holiday part2', {'keys': keys_with_warn_for_PH_missing.join(', ')}) : '')})
                          // + '(see README how to provide it)' // UI of the evaluation tool does not allow to provide it (currently).
                  ]);
              }
              /* }}} */

              /* Check if value consists of multiple rules each only using a time selector {{{ */
              if (used_selectors_types_array.length > 1
                      &&  used_selectors_types_array.filter(function (el){
                              return el.length === 1 && el[0] === 'time';
                          }).length === used_selectors_types_array.length
                      ) {
                  parsing_warnings.push([ -1, 0,
                      t('combine rules', { 'ok': ',' }),
                  ]);
              }
              /* }}} */

              prettifyValue();
          }
          done_with_warnings = true;

          var warnings = [];
          // FIXME: Sort based on parsing_warnings[1], tricky …
          for (var i = 0; i < parsing_warnings.length; i++) {
              warnings.push( formatWarnErrorMessage(parsing_warnings[i][0], parsing_warnings[i][1], parsing_warnings[i][2], parsing_warnings[i][3]) );
          }
          return warnings;
      }

      /* Helpers for getWarnings {{{ */

      /* Check if token is the begin of a selector and why. {{{
       *
       * :param tokens: List of token objects.
       * :param at: Position where to start.
       * :returns:
       *        * false if the current token is not the begin of a selector.
       *        * Position in token array from where the decision was made that
       *          the token is the start of a selector.
       */
      function tokenIsTheBeginOfSelector(tokens, at) {
          if (typeof tokens[at][3] === 'string') {
              return 3;
          } else if (tokens[at][1] === 'comment'
                  || tokens[at][1] === 'state'
                  || tokens[at][1] === '24/7'
                  || tokens[at][1] === 'rule separator'
              ){

              return 1;
          } else {
              return false;
          }
      }
      /* }}} */

      /* Get start and end position of a selector. {{{
       * For example this value 'Mo-We,Fr' will return the position of the
       * token lexeme 'Mo' and 'Fr' e.g. there indexes [ 0, 4 ] in the
       * selector array of tokens.
       *
       * :param tokens: List of token objects.
       * :param at: Position where to start.
       * :returns: Array:
       *            0. Index of first token in selector array of tokens.
       *            1. Index of last token in selector array of tokens.
       *            2. Selector type.
       */
      function getSelectorRange(tokens, at) {
          var selector_start = at,
              selector_end,
              pos_in_token_array;

          for (; selector_start >= 0; selector_start--) {
              pos_in_token_array = tokenIsTheBeginOfSelector(tokens, selector_start);
              if (pos_in_token_array) {
                  break;
              }
          }
          selector_end = selector_start;

          if (pos_in_token_array === 1) {
              // Selector consists of a single token.

              // Include tailing colon.
              if (selector_end + 1 < tokens.length && tokens[selector_end + 1][0] === ':')
                  selector_end++;

              return [ selector_start, selector_end, tokens[selector_start][pos_in_token_array] ];
          }

          for (selector_end++; selector_end < tokens.length ; selector_end++) {
              if (tokenIsTheBeginOfSelector(tokens, selector_end))
                  return [ selector_start, selector_end - 1, tokens[selector_start][pos_in_token_array] ];
          }

          return [ selector_start, selector_end - 1, tokens[selector_start][pos_in_token_array] ];
      }
      /* }}} */
      /* }}} */
      /* }}} */

      /* Prettify raw value from user. {{{
       * The value is generated by putting the tokens back together to a string.
       *
       * :param argument_hash: Hash which can contain:
       *        'conf': Configuration hash.
       *        'get_internals: If true export internal data structures.
       *        'rule_index: Only prettify the rule with this index.
       * :returns: Prettified value string or object if get_internals is true.
       */
      function prettifyValue(argument_hash) {
          var user_conf = {};
          var get_internals = false;
          var rule_index;

          prettified_value = '';
          var prettified_value_array = [];

          if (typeof argument_hash === 'object') {
              if (typeof argument_hash.conf === 'object') {
                  user_conf = argument_hash.conf;
              }

              if (typeof argument_hash.rule_index === 'number') {
                  rule_index = argument_hash.rule_index;
              }

              if (argument_hash.get_internals === true) {
                  get_internals = true;
              }

          }

          Object.keys(default_prettify_conf).forEach(function (key) {
              if (typeof user_conf[key] === 'undefined') {
                  user_conf[key] = default_prettify_conf[key];
              }
          });

          // use months, weekdays for locales 'en' and 'all'
          // otherwise use Date.toLocaleString, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
          var _is_en_or_all = user_conf['locale'] === 'en' || user_conf['locale'] === 'all';
          var months_local = _is_en_or_all ? months : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(function(month) {
              return new Date(2018, month - 1, 1).toLocaleString(user_conf['locale'], {month: 'short'});
          });
          var weekdays_local = _is_en_or_all ? weekdays : [1, 2, 3, 4, 5, 6, 7].map(function(weekday) {
              // 2017-01-01 is Sunday
              return new Date(2017, 0, weekday).toLocaleString(user_conf['locale'], {weekday: 'short'});
          });

          for (var nrule = 0; nrule < new_tokens.length; nrule++) {
              if (new_tokens[nrule][0].length === 0) continue;
              // Rule does contain nothing useful e.g. second rule of '10:00-12:00;' (empty) which needs to be handled.

              if (typeof rule_index === 'number') {
                  if (rule_index !== nrule) continue;
              } else {
                  if (nrule !== 0)
                      prettified_value += (
                          new_tokens[nrule][1]
                              ? user_conf.rule_sep_string + '|| '
                              : (
                                  new_tokens[nrule][0][0][1] === 'rule separator'
                                  ? ','
                                  : (
                                      user_conf.print_semicolon
                                      ? ';'
                                      : ''
                                  )
                              ) +
                          user_conf.rule_sep_string);
              }

              var selector_start_end_type = [ 0, 0, undefined ];
              var prettified_group_value = [];
              var count = 0;
              // console.log(new_tokens[nrule][0]);

              do {
                  selector_start_end_type = getSelectorRange(new_tokens[nrule][0], selector_start_end_type[1]);
                  // console.log(selector_start_end_type, new_tokens[nrule][0].length, count);

                  if (count > 50) {
                      throw formatLibraryBugMessage('Infinite loop.');
                  }

                  if (selector_start_end_type[2] !== 'rule separator') {
                      prettified_group_value.push(
                          [
                              selector_start_end_type,
                              prettifySelector(
                                  new_tokens[nrule][0],
                                  selector_start_end_type[0],
                                  selector_start_end_type[1],
                                  selector_start_end_type[2],
                                  user_conf
                              ),
                          ]
                      );
                  }

                  selector_start_end_type[1]++;
                  count++;
                  // console.log(selector_start_end_type, new_tokens[nrule][0].length, count);
              } while (selector_start_end_type[1] < new_tokens[nrule][0].length);
              // console.log('Prettified value: ' + JSON.stringify(prettified_group_value, null, '    '));
              var not_sorted_prettified_group_value = prettified_group_value.slice();

              if (!done_with_selector_reordering) {
                  prettified_group_value.sort(
                      function (a, b) {
                          var selector_order = [ 'year', 'month', 'week', 'holiday', 'weekday', 'time', '24/7', 'state', 'comment'];
                          return selector_order.indexOf(a[0][2]) - selector_order.indexOf(b[0][2]);
                      }
                  );
              }
              var old_prettified_value_length = prettified_value.length;

              if (typeof user_conf['locale'] === 'string' && user_conf['locale'] !== 'en') {
                  var translatorFunction;
                  if (instance.language !== user_conf['locale']) {
                      translatorFunction = instance.getFixedT(user_conf['locale']);
                  } else {
                      translatorFunction = instance.t;
                  }
                  for (var i = 0; i < prettified_group_value.length; i++) {
                      var type = prettified_group_value[i][0][2];
                      if (type === 'weekday') {
                          weekdays.forEach(function (weekday, key) {
                              prettified_group_value[i][1] = prettified_group_value[i][1].replace(new RegExp(weekday, 'g'), weekdays_local[key]);
                          });
                      } else if (type === 'month') {
                          months.forEach(function (month, key) {
                              prettified_group_value[i][1] = prettified_group_value[i][1].replace(new RegExp(month, 'g'), months_local[key]);
                          });
                      } else {
                          var prettifiedValueIsProbablyTranslatable = prettified_group_value[i][1].indexOf(':') === -1;
                          if (prettifiedValueIsProbablyTranslatable) {
                              prettified_group_value[i][1] = translatorFunction(['opening_hours:pretty.' + prettified_group_value[i][1], prettified_group_value[i][1]]);
                          }
                      }
                  }
              }

              prettified_value += prettified_group_value.map(function (array) {
                  return array[1];
              }).join(' ');

              prettified_value_array.push( prettified_group_value );

              if (!done_with_selector_reordering_warnings) {
                  for (var i = 0, l = not_sorted_prettified_group_value.length; i < l; i++) {
                      if (not_sorted_prettified_group_value[i] !== prettified_group_value[i]) {
                          // console.log(i + ': ' + prettified_group_value[i][0][2]);
                          var length = i + old_prettified_value_length; // i: Number of spaces in string.
                          for (var x = 0; x <= i; x++) {
                              length += prettified_group_value[x][1].length;
                              // console.log('Length: ' + length + ' ' + prettified_group_value[x][1]);
                          }
                          // console.log(length);
                          parsing_warnings.push([ prettified_value, length, t('switched', {
                              'first': prettified_group_value[i][0][2],
                              'second': not_sorted_prettified_group_value[i][0][2]
                          })
                          ]);
                      }
                  }
              }
          }

          done_with_selector_reordering_warnings = true;
          // console.log(JSON.stringify(prettified_value_array, null, '    '));

          if (get_internals) {
              return [ prettified_value_array, new_tokens ];
          } else {
              return prettified_value;
          }
      }
      /* }}} */

      /* Check selector array of tokens for specific token name pattern. {{{
       *
       * :param tokens: List of token objects.
       * :param at: Position at which the matching should begin.
       * :param token_name(s): One or many token_name strings which have to match in that order.
       * :returns: true if token_name(s) match in order false otherwise.
       */
      function matchTokens(tokens, at /*, matches... */) {
          if (at + arguments.length - 2 > tokens.length)
              return false;
          for (var i = 0; i < arguments.length - 2; i++) {
              if (tokens[at + i][1] !== arguments[i + 2]) {
                  return false;
              }
          }

          return true;
      }
      /* }}} */

      /* Generate selector wrapper with time offset {{{
       *
       * :param func: Generated selector code function.
       * :param shirt: Time to shift in milliseconds.
       * :param token_name(s): One or many token_name strings which have to match in that order.
       * :returns: See selector code.
       */
      function generateDateShifter(func, shift) {
          return function(date) {
              var res = func(new Date(date.getTime() + shift));

              if (typeof res[1] === 'undefined')
                  return res;
              return [ res[0], new Date(res[1].getTime() - shift) ];
          };
      }
      /* }}} */

      /* Top-level parser {{{
       *
       * :param tokens: List of token objects.
       * :param at: Position where to start.
       * :param rule: Reference to rule object.
       * :param nrule: Rule number starting with 0.
       * :returns: See selector code.
       */
      function parseGroup(tokens, at, rule, nrule) {
          var rule_modifier_specified = false;

          // console.log(tokens); // useful for debugging of tokenize
          var last_selector = [];
          while (at < tokens.length) {
              // console.log('Parsing at position', at +':', tokens[at]);
              if (matchTokens(tokens, at, 'weekday')) {
                  at = parseWeekdayRange(tokens, at, rule, undefined, nrule);
              } else if (matchTokens(tokens, at, '24/7')) {
                  rule.time.push(function() { return [true]; });
                  // Not needed. If there is no selector it automatically matches everything.
                  // WRONG: This only works if there is no other selector in this selector group ...
                  at++;
              } else if (matchTokens(tokens, at, 'holiday')) {
                  if (matchTokens(tokens, at+1, ',')) {
                      at = parseHoliday(tokens, at, rule, true);
                  } else {
                      at = parseHoliday(tokens, at, rule, false);
                  }
                  week_stable = false;
              } else if (matchTokens(tokens, at, 'month', 'number')
                      || matchTokens(tokens, at, 'month', 'weekday')
                      || matchTokens(tokens, at, 'year', 'month', 'number')
                      || matchTokens(tokens, at, 'year', 'event')
                      || matchTokens(tokens, at, 'event')) {

                  at = parseMonthdayRange(tokens, at, nrule);
                  week_stable = false;
              } else if (matchTokens(tokens, at, 'year')) {
                  at = parseYearRange(tokens, at);
                  week_stable = false;
              } else if (matchTokens(tokens, at, 'month')) {
                  at = parseMonthRange(tokens, at);
                  // week_stable = false; // Decided based on the actual value/tokens.
              } else if (matchTokens(tokens, at, 'week')) {
                  tokens[at][3] = 'week';
                  at = parseWeekRange(tokens, at);

              } else if (at !== 0 && at !== tokens.length - 1 && tokens[at][0] === ':'
                  && !(typeof last_selector[1] === 'string' && last_selector[1] === 'time')) {
                  /* Ignore colon if they appear somewhere else than as time separator.
                   * Except the start or end of the value.
                   * This provides compatibility with the syntax proposed by Netzwolf:
                   * https://wiki.openstreetmap.org/wiki/Key:opening_hours/specification#separator_for_readability
                   * Check for valid use of <separator_for_readability> is implemented in function getWarnings().
                   */

                  if (!done_with_warnings && matchTokens(tokens, at-1, 'holiday')) {
                      parsing_warnings.push([nrule, at, t('no colon after', { 'token': tokens[at-1][1] })]);
                  }

                  at++;
              } else if (matchTokens(tokens, at, 'number', 'timesep')
                      || matchTokens(tokens, at, 'timevar')
                      || matchTokens(tokens, at, '(', 'timevar')
                      || matchTokens(tokens, at, 'number', '-')) {

                  at = parseTimeRange(tokens, at, rule, false, nrule);
                  last_selector = [ at, 'time' ];

              } else if (matchTokens(tokens, at, 'state')) {

                  if (tokens[at][0] === 'open') {
                      rule.meaning = true;
                  } else if (tokens[at][0] === 'closed' || tokens[at][0] === 'off') {
                      rule.meaning = false;
                  } else {
                      rule.meaning = false;
                      rule.unknown = true;
                  }

                  rule_modifier_specified = true;
                  at++;
                  if (typeof tokens[at] === 'object' && tokens[at][0] === ',') // additional rule
                      at = [ at + 1 ];

              } else if (matchTokens(tokens, at, 'comment')) {
                  rule.comment = tokens[at][0];
                  if (!rule_modifier_specified) {
                      // Then it is unknown. Either with unknown explicitly
                      // specified or just a comment.
                      rule.meaning = false;
                      rule.unknown = true;
                  }

                  rule_modifier_specified = true;
                  at++;
                  if (typeof tokens[at] === 'object' && tokens[at][0] === ',') { // additional rule
                      at = [ at + 1 ];
                  }
              } else if ((at === 0 || at === tokens.length - 1) && matchTokens(tokens, at, 'rule separator')) {
                  at++;
                  // console.log("value: " + nrule);
                  // throw formatLibraryBugMessage('Not implemented yet.');
              } else {
                  var warnings = getWarnings();
                  throw formatWarnErrorMessage(nrule, at, t('unexpected token', {token: tokens[at][1] })) + (warnings ? (' ' + warnings.join('; ')) : '');
              }

              if (typeof at === 'object') { // additional rule
                  tokens[at[0] - 1][1] = 'rule separator';
                  break;
              }
              if (typeof last_selector[0] === 'number' && last_selector[0] !== at) {
                  last_selector = [];
              }
          }

          return at;
      }

      /* Not used
      function get_last_token_pos_in_token_group(tokens, at, last_at) {
          for (at++; at < last_at; at++) {
              if (typeof tokens[at] === 'object') {
                  if (typeof tokens[at][3] === 'string'
                          || tokens[at][1] === 'comment'
                          || tokens[at][1] === 'state'){

                          return at - 1;
                  }
              }
          }
          return last_at;
      }
      */

      /* }}} */

      // helper functions for sub parser {{{

      /* For given date, returns date moved to the start of the day with an offset specified in minutes. {{{
       * For example, if date is 2014-05-19_18:17:12, dateAtDayMinutes would
       * return 2014-05-19_02:00:00 for minutes=120.
       *
       * :param date: Date object.
       * :param minutes: Minutes used as offset starting from midnight of current day.
       * :returns: Moved date object.
       */
      function dateAtDayMinutes(date, minutes) {
          return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, minutes);
      }
      /* }}} */

      /* For given date, returns date moved to the specific day of week {{{
       *
       * :param date: Date object.
       * :param weekday: Integer number for day of week. Starting with zero (Sunday).
       * :returns: Moved date object.
       */
      function dateAtNextWeekday(date, weekday) {
          var delta = weekday - date.getDay();
          return new Date(date.getFullYear(), date.getMonth(), date.getDate() + delta + (delta < 0 ? 7 : 0));
      }
      /* }}} */

      /* Numeric list parser (1,2,3-4,-1) {{{
       * Used in weekday parser above.
       *
       * :param tokens: List of token objects.
       * :param at: Position where to start.
       * :param func: Function func(from, to, at).
       * :returns: Position at which the token does not belong to the list any more.
       */
      function parseNumRange(tokens, at, func) {
          for (; at < tokens.length; at++) {
              if (matchTokens(tokens, at, 'number', '-', 'number')) {
                  // Number range
                  func(tokens[at][0], tokens[at+2][0], at);
                  at += 3;
              } else if (matchTokens(tokens, at, '-', 'number')) {
                  // Negative number
                  func(-tokens[at+1][0], -tokens[at+1][0], at);
                  at += 2;
              } else if (matchTokens(tokens, at, 'number')) {
                  // Single number
                  func(tokens[at][0], tokens[at][0], at);
                  at++;
              } else {
                  throw formatWarnErrorMessage(nrule, at + matchTokens(tokens, at, '-'),
                      'Unexpected token in number range: ' + tokens[at][1]);
              }

              if (!matchTokens(tokens, at, ','))
                  break;
          }

          return at;
      }
      /* }}} */

      /* List parser for constrained weekdays in month range {{{
       * e.g. Su[-1] which selects the last Sunday of the month.
       *
       * :param tokens: List of token objects.
       * :param at: Position where to start.
       * :returns: Array:
       *            0. Constrained weekday number.
       *            1. Position at which the token does not belong to the list any more (after ']' token).
       */
      function getConstrainedWeekday(tokens, at) {
          var number = 0;
          var endat = parseNumRange(tokens, at, function(from, to, at) {

              // bad number
              if (from === 0 || from < -5 || from > 5)
                  throw formatWarnErrorMessage(nrule, at,
                      t('number -5 to 5'));

              if (from === to) {
                  if (number !== 0)
                      throw formatWarnErrorMessage(nrule, at,
                          t('one weekday constraint'));
                  number = from;
              } else {
                  throw formatWarnErrorMessage(nrule, at+2,
                      t('range constrained weekdays'));
              }
          });
          for (var i = at; i < endat; i++) {
              tokens[i][4] = 'positive_number';
          }

          if (!matchTokens(tokens, endat, ']'))
              throw formatWarnErrorMessage(nrule, endat, t('expected', {symbol: ']'}));

          return [ number, endat + 1 ];
      }
      /* }}} */

      // Check if period is ok. Period 0 or 1 don’t make much sense.
      function checkPeriod(at, period, period_type, parm_string) {
          if (done_with_warnings)
              return;

          if (period === 0) {
              throw formatWarnErrorMessage(nrule, at,
                  t('range zero', { 'type': period_type }));
          } else if (period === 1) {
              if (typeof parm_string === 'string' && parm_string === 'no_end_year')
                  parsing_warnings.push([nrule, at, t('period one year+', {'type': period_type})]);
              else
                  parsing_warnings.push([nrule, at, t('period one', {'type': period_type})]);
          }
      }

      /* Get date moved to constrained weekday (and moved for add_days. {{{
       * E.g. used for 'Aug Su[-1] -1 day'.
       *
       * :param year: Year as integer.
       * :param month: Month as integer starting with zero.
       * :param weekday: Integer number for day of week. Starting with zero (Sunday).
       * :param constrained_weekday: Position where to start.
       * :returns: Date object.
       */
      function getDateForConstrainedWeekday(year, month, weekday, constrained_weekday, add_days) {
          var tmp_date = dateAtNextWeekday(
              new Date(year, month + (constrained_weekday[0] > 0 ? 0 : 1), 1), weekday);

          tmp_date.setDate(tmp_date.getDate() + (constrained_weekday[0] + (constrained_weekday[0] > 0 ? -1 : 0)) * 7);

          if (typeof add_days === 'object' && add_days[1])
              tmp_date.setDate(tmp_date.getDate() + add_days[0]);

          return tmp_date;
      }
      /* }}} */

      /* Check if date is valid. {{{
       *
       * :param month: Month as integer starting with zero.
       * :param date: Day of month as integer.
       * :param nrule: Rule number starting with 0.
       * :param at: Position at which the matching should begin.
       * :returns: undefined. There is no real return value. This function just throws an exception if something is wrong.
       */
      function checkIfDateIsValid(month, day, nrule, at) {
          // May use this instead. The problem is that this does not give feedback as precise as the code which is used in this function.
          // var testDate = new Date(year, month, day);
          // if (testDate.getDate() !== day || testDate.getMonth() !== month || testDate.getFullYear() !== year) {
          //     console.error('date not valid');
          // }

          // https://en.wikipedia.org/wiki/Month#Julian_and_Gregorian_calendars
          if (day < 1 || day > 31) {
              throw formatWarnErrorMessage(nrule, at, t('month 31', {'month': months[month]}));
          } else if ((month === 3 || month === 5 || month === 8 || month === 10) && day === 31) {
              throw formatWarnErrorMessage(nrule, at, t('month 30', {'month': months[month]}));
          } else if (month === 1 && day === 30) {
              throw formatWarnErrorMessage(nrule, at, t('month feb', {'month': months[month]}));
          }
      }
      /* }}} */
      /* }}} */

      /* Time range parser (10:00-12:00,14:00-16:00) {{{
       *
       * :param tokens: List of token objects.
       * :param at: Position where to start.
       * :param rule: Reference to rule object.
       * :param extended_open_end: Used for combined time range with open end.
       * :param nrule: Rule number starting with 0.
       * extended_open_end: <time> - <time> +
       *        parameter at is here A (if extended_open_end is true)
       * :returns: Position at which the token does not belong to the selector anymore.
       */
      function parseTimeRange(tokens, at, rule, extended_open_end, nrule) {
          if (!extended_open_end)
              tokens[at][3] = 'time';

          for (; at < tokens.length; at++) {
              var has_time_var_calc = [], has_normal_time = []; // element 0: start time, 1: end time
                  has_normal_time[0]   = matchTokens(tokens, at, 'number', 'timesep', 'number');
                  has_time_var_calc[0] = matchTokens(tokens, at, '(', 'timevar');
              var minutes_from,
                  minutes_to;
              if (has_normal_time[0] || matchTokens(tokens, at, 'timevar') || has_time_var_calc[0]) {
                  // relying on the fact that always *one* of them is true

                  var is_point_in_time = false; // default no time range
                  var has_open_end     = false; // default no open end
                  var timevar_add      = [ 0, 0 ];
                  var timevar_string   = [];    // capture timevar string like 'sunrise' to calculate it for the current date.
                  var point_in_time_period;

                  // minutes_from
                  if (has_normal_time[0]) {
                      minutes_from = getMinutesByHoursMinutes(tokens, nrule, at+has_time_var_calc[0]);
                  } else {
                      timevar_string[0] = tokens[at+has_time_var_calc[0]][0];
                      minutes_from = word_value_replacement[timevar_string[0]];

                      if (has_time_var_calc[0]) {
                          timevar_add[0] = parseTimevarCalc(tokens, at);
                          minutes_from += timevar_add[0];
                      }
                  }

                  var at_end_time = at+(has_normal_time[0] ? 3 : (has_time_var_calc[0] ? 7 : 1))+1; // after '-'
                  if (!matchTokens(tokens, at_end_time - 1, '-')) { // not time range
                      if (matchTokens(tokens, at_end_time - 1, '+')) {
                          has_open_end = true;
                      } else {
                          if (oh_mode === 0) {
                              throw formatWarnErrorMessage(nrule,
                                  at+(
                                      has_normal_time[0] ? (
                                          typeof tokens[at+3] === 'object' ? 3 : 2
                                      ) : (
                                          has_time_var_calc[0] ? 2 : (
                                                  typeof tokens[at+1] === 'object' ? 1 : 0
                                              )
                                      )
                                  ),
                                  t('point in time', {
                                      'calc': (has_time_var_calc[0] ? t('calculation') + ' ' : ''),
                                      'libraryname': library_name
                                  }));
                          } else {
                              minutes_to = minutes_from + 1;
                              is_point_in_time = true;
                          }
                      }
                  }

                  // minutes_to
                  if (has_open_end) {
                      if (extended_open_end === 1) {
                          minutes_from += minutes_in_day;
                      }
                      if (minutes_from >= 22 * 60) {

                          minutes_to = minutes_from +  8 * 60;
                      } else if (minutes_from >= 17 * 60) {
                          minutes_to = minutes_from + 10 * 60;
                      } else {
                          minutes_to = minutes_in_day;
                      }
                  } else if (!is_point_in_time) {
                      has_normal_time[1] = matchTokens(tokens, at_end_time, 'number', 'timesep', 'number');
                      has_time_var_calc[1]      = matchTokens(tokens, at_end_time, '(', 'timevar');
                      if (!has_normal_time[1] && !matchTokens(tokens, at_end_time, 'timevar') && !has_time_var_calc[1]) {
                          throw formatWarnErrorMessage(nrule, at_end_time - (typeof tokens[at_end_time] === 'object' ? 0 : 1),
                                  t('time range continue'));
                      } else {
                          if (has_normal_time[1]) {
                              minutes_to = getMinutesByHoursMinutes(tokens, nrule, at_end_time);
                          } else {
                              timevar_string[1] = tokens[at_end_time+has_time_var_calc[1]][0];
                              minutes_to = word_value_replacement[timevar_string[1]];
                          }

                          if (has_time_var_calc[1]) {
                              timevar_add[1] = parseTimevarCalc(tokens, at_end_time);
                              minutes_to += timevar_add[1];
                          }
                      }
                  }

                  at = at_end_time + (is_point_in_time ? -1 :
                          (has_normal_time[1] ? 3 : (has_time_var_calc[1] ? 7 : !has_open_end))
                      );

                  if (matchTokens(tokens, at, '/', 'number')) {
                      if (matchTokens(tokens, at + 2, 'timesep', 'number')) { // /hours:minutes
                          point_in_time_period = getMinutesByHoursMinutes(tokens, nrule, at + 1);
                          at += 4;
                      } else { // /minutes
                          point_in_time_period = tokens[at + 1][0];
                          at += 2;
                          if (matchTokens(tokens, at, 'timesep'))
                              throw formatWarnErrorMessage(nrule, at,
                                  t('period continue'));
                      }

                      // Check at this later state in the if condition to get the correct position.
                      if (oh_mode === 0) {
                          throw formatWarnErrorMessage(nrule, at - 1,
                              t('time range mode', {'libraryname': library_name}));
                      }

                      is_point_in_time = true;
                  } else if (matchTokens(tokens, at, '+')) {
                      parseTimeRange(tokens, at_end_time, rule, minutes_to < minutes_from ? 1 : true, nrule);
                      at++;
                  } else if (oh_mode === 1 && !is_point_in_time) {
                      throw formatWarnErrorMessage(nrule, at_end_time,
                          t('point in time mode', {'libraryname': library_name}));
                  }

                  if (typeof lat === 'string') { // lon will also be defined (see above)
                      if (!has_normal_time[0] || !(has_normal_time[1] || has_open_end || is_point_in_time) ) {
                          week_stable = false;
                      }
                  } else { // we can not calculate exact times so we use the already applied constants (word_value_replacement).
                      timevar_string = [];
                  }

                  // Normalize minutes into range.
                  if (!extended_open_end && minutes_from >= minutes_in_day) {
                      throw formatWarnErrorMessage(nrule, at_end_time - 2,
                          t('outside current day'));
                  }
                  if (minutes_to < minutes_from || ((has_normal_time[0] && has_normal_time[1]) && minutes_from === minutes_to)) {
                      minutes_to += minutes_in_day;
                  }
                  if (minutes_to > minutes_in_day * 2) {
                      throw formatWarnErrorMessage(nrule, at_end_time + (has_normal_time[1] ? 4 : (has_time_var_calc[1] ? 7 : 1)) - 2,
                          t('two midnights'));
                  }

                  // This shortcut makes always-open range check faster.
                  if (minutes_from === 0 && minutes_to === minutes_in_day) {
                      rule.time.push(function() { return [true]; });
                  } else {
                      if (minutes_to > minutes_in_day) { // has_normal_time[1] must be true
                          rule.time.push(function(minutes_from, minutes_to, timevar_string, timevar_add, has_open_end, is_point_in_time, point_in_time_period, extended_open_end) { return function(date) {
                              var ourminutes = date.getHours() * 60 + date.getMinutes();

                              if (timevar_string[0]) {
                                  var date_from = SunCalc.getTimes(date, lat, lon)[timevar_string[0]];
                                  minutes_from  = date_from.getHours() * 60 + date_from.getMinutes() + timevar_add[0];
                              }
                              if (timevar_string[1]) {
                                  var date_to = SunCalc.getTimes(date, lat, lon)[timevar_string[1]];
                                  minutes_to  = date_to.getHours() * 60 + date_to.getMinutes() + timevar_add[1];
                                  minutes_to += minutes_in_day;
                                  // Needs to be added because it was added by
                                  // normal times: if (minutes_to < minutes_from)
                                  // above the selector construction.
                              } else if (is_point_in_time && typeof point_in_time_period !== 'number') {
                                  minutes_to = minutes_from + 1;
                              }

                              if (typeof point_in_time_period === 'number') {
                                  if (ourminutes < minutes_from) {
                                      return [false, dateAtDayMinutes(date, minutes_from)];
                                  } else if (ourminutes <= minutes_to) {
                                      for (var cur_min = minutes_from; ourminutes + point_in_time_period >= cur_min; cur_min += point_in_time_period) {
                                          if (cur_min === ourminutes) {
                                              return [true, dateAtDayMinutes(date, ourminutes + 1)];
                                          } else if (ourminutes < cur_min) {
                                              return [false, dateAtDayMinutes(date, cur_min)];
                                          }
                                      }
                                  }
                                  return [false, dateAtDayMinutes(date, minutes_in_day)];
                              } else {
                                  if (ourminutes < minutes_from)
                                      return [false, dateAtDayMinutes(date, minutes_from)];
                                  else
                                      return [true, dateAtDayMinutes(date, minutes_to), has_open_end, extended_open_end];
                              }
                          }}(minutes_from, minutes_to, timevar_string, timevar_add, has_open_end, is_point_in_time, point_in_time_period, extended_open_end));

                          if (minutes_to - minutes_in_day > 0) {
                              if (typeof rule_infos[nrule] === 'undefined') {
                                  rule_infos[nrule] = {};
                              }
                              rule_infos[nrule]['time_wraps_over_midnight'] = true;
                              rule.wraptime.push(function(minutes_to, timevar_string, timevar_add, has_open_end, point_in_time_period, extended_open_end) { return function(date) {
                                  var ourminutes = date.getHours() * 60 + date.getMinutes();

                                  if (timevar_string[1]) {
                                      var date_to = SunCalc.getTimes(date, lat, lon)[timevar_string[1]];
                                      minutes_to  = date_to.getHours() * 60 + date_to.getMinutes() + timevar_add[1];
                                      // minutes_in_day does not need to be added.
                                      // For normal times in it was added in: if (minutes_to < // minutes_from)
                                      // above the selector construction and
                                      // subtracted in the selector construction call
                                      // which returns the selector function.
                                  }

                                  if (typeof point_in_time_period === 'number') {
                                      if (ourminutes <= minutes_to) {
                                          for (var cur_min = 0; ourminutes + point_in_time_period >= cur_min; cur_min += point_in_time_period) {
                                              if (cur_min === ourminutes) {
                                                  return [true, dateAtDayMinutes(date, ourminutes + 1)];
                                              } else if (ourminutes < cur_min) {
                                                  return [false, dateAtDayMinutes(date, cur_min)];
                                              }
                                          }
                                      }
                                  } else {
                                      if (ourminutes < minutes_to)
                                          return [true, dateAtDayMinutes(date, minutes_to), has_open_end, extended_open_end];
                                  }
                                  return [false, undefined];
                              }}(minutes_to - minutes_in_day, timevar_string, timevar_add, has_open_end, point_in_time_period, extended_open_end));
                          }
                      } else {
                          rule.time.push(function(minutes_from, minutes_to, timevar_string, timevar_add, has_open_end, is_point_in_time, point_in_time_period) { return function(date) {
                              var ourminutes = date.getHours() * 60 + date.getMinutes();

                              if (timevar_string[0]) {
                                  var date_from = SunCalc.getTimes(date, lat, lon)[timevar_string[0]];
                                  minutes_from  = date_from.getHours() * 60 + date_from.getMinutes() + timevar_add[0];
                              }
                              if (timevar_string[1]) {
                                  var date_to = SunCalc.getTimes(date, lat, lon)[timevar_string[1]];
                                  minutes_to  = date_to.getHours() * 60 + date_to.getMinutes() + timevar_add[1];
                              } else if (is_point_in_time && typeof point_in_time_period !== 'number') {
                                  minutes_to = minutes_from + 1;
                              }

                              if (typeof point_in_time_period === 'number') {
                                  if (ourminutes < minutes_from) {
                                      return [false, dateAtDayMinutes(date, minutes_from)];
                                  } else if (ourminutes <= minutes_to) {
                                      for (var cur_min = minutes_from; ourminutes + point_in_time_period >= cur_min; cur_min += point_in_time_period) {
                                          if (cur_min === ourminutes) {
                                              return [true, dateAtDayMinutes(date, ourminutes + 1)];
                                          } else if (ourminutes < cur_min) {
                                              return [false, dateAtDayMinutes(date, cur_min)];
                                          }
                                      }
                                  }
                                  return [false, dateAtDayMinutes(date, minutes_in_day)];
                              } else {
                                  if (ourminutes < minutes_from)
                                      return [false, dateAtDayMinutes(date, minutes_from)];
                                  else if (ourminutes < minutes_to)
                                      return [true, dateAtDayMinutes(date, minutes_to), has_open_end];
                                  else
                                      return [false, dateAtDayMinutes(date, minutes_from + minutes_in_day)];
                              }
                          }}(minutes_from, minutes_to, timevar_string, timevar_add, has_open_end, is_point_in_time, point_in_time_period));
                      }
                  }

              } else if (matchTokens(tokens, at, 'number', '-', 'number')) { // "Mo 09-18" (Please don’t use this) -> "Mo 09:00-18:00".
                  minutes_from = tokens[at][0]   * 60;
                  minutes_to   = tokens[at+2][0] * 60;
                  if (!done_with_warnings) {
                      parsing_warnings.push([nrule, at + 2, t('without minutes', {
                          'syntax': (tokens[at][0]   < 10 ? '0' : '') + tokens[at][0]   + ':00-'
                                  + (tokens[at+2][0] < 10 ? '0' : '') + tokens[at+2][0] + ':00'
                      })]);
                  }

                  if (minutes_from >= minutes_in_day)
                      throw formatWarnErrorMessage(nrule, at, t('outside day'));
                  if (minutes_to < minutes_from)
                      minutes_to += minutes_in_day;
                  if (minutes_to > minutes_in_day * 2)
                      throw formatWarnErrorMessage(nrule, at + 2, t('two midnights'));

                  if (minutes_to > minutes_in_day) {
                      rule.time.push(function(minutes_from, minutes_to) { return function(date) {
                          var ourminutes = date.getHours() * 60 + date.getMinutes();

                          if (ourminutes < minutes_from)
                              return [false, dateAtDayMinutes(date, minutes_from)];
                          else
                              return [true, dateAtDayMinutes(date, minutes_to)];
                      }}(minutes_from, minutes_to));

                      if (minutes_to - minutes_in_day > 0) {
                          if (typeof rule_infos[nrule] === 'undefined') {
                              rule_infos[nrule] = {};
                          }
                          rule_infos[nrule]['time_wraps_over_midnight'] = true;
                          rule.wraptime.push(function(minutes_to) { return function(date) {
                              var ourminutes = date.getHours() * 60 + date.getMinutes();

                              if (ourminutes < minutes_to) {
                                  return [true, dateAtDayMinutes(date, minutes_to)];
                              } else {
                                  return [false, undefined];
                              }
                          }}(minutes_to - minutes_in_day));
                      }
                  } else {
                      rule.time.push(function(minutes_from, minutes_to) { return function(date) {
                          var ourminutes = date.getHours() * 60 + date.getMinutes();

                          if (ourminutes < minutes_from)
                              return [false, dateAtDayMinutes(date, minutes_from)];
                          else if (ourminutes < minutes_to)
                              return [true, dateAtDayMinutes(date, minutes_to), has_open_end];
                          else
                              return [false, dateAtDayMinutes(date, minutes_from + minutes_in_day)];
                      }}(minutes_from, minutes_to));
                  }

                  at += 3;
              } else { // additional rule
                  if (matchTokens(tokens, at, '('))
                      throw formatWarnErrorMessage(nrule, at, 'Missing variable time (e.g. sunrise) after: "' + tokens[at][1] + '"');
                  if (matchTokens(tokens, at, 'number', 'timesep'))
                      throw formatWarnErrorMessage(nrule, at+1, 'Missing minutes in time range after: "' + tokens[at+1][1] + '"');
                  if (matchTokens(tokens, at, 'number'))
                      throw formatWarnErrorMessage(nrule, at + (typeof tokens[at+1] === 'object' ? 1 : 0),
                              'Missing time separator in time range after: "' + tokens[at][1] + '"');
                  return [ at ];
              }

              if (!matchTokens(tokens, at, ',')) {
                  break;
              }

              if (typeof tokens[at+1] === 'undefined' && !done_with_warnings) {
                  parsing_warnings.push([nrule, at, t('value ends with token', { 'token': tokens[at][1] }) ]);
              }
          }

          return at;
      }
      /* }}} */

      /* Helpers for time range parser {{{ */

      /* Get time in minutes from <hour>:<minute> (tokens). {{{
       * Only used if throwing an error is wanted.
       *
       * :param tokens: List of token objects.
       * :param nrule: Rule number starting with 0.
       * :param at: Position at which the time begins.
       * :returns: Time in minutes.
       */
      function getMinutesByHoursMinutes(tokens, nrule, at) {
          if (tokens[at+2][0] > 59)
              throw formatWarnErrorMessage(nrule, at+2,
                      'Minutes are greater than 59.');
          return tokens[at][0] * 60 + tokens[at+2][0];
      }
      /* }}} */

      /* Get time in minutes from "(sunrise-01:30)" {{{
       * Extract the added or subtracted time from "(sunrise-01:30)"
       * returns time in minutes e.g. -90.
       *
       * :param tokens: List of token objects.
       * :param at: Position where the specification for the point in time could be.
       * :returns: Time in minutes on suggest, throws an exception otherwise.
      */
      function parseTimevarCalc(tokens, at) {
          var error;
          if (matchTokens(tokens, at+2, '+') || matchTokens(tokens, at+2, '-')) {
              if (matchTokens(tokens, at+3, 'number', 'timesep', 'number')) {
                  if (matchTokens(tokens, at+6, ')')) {
                      var add_or_subtract = tokens[at+2][0] === '+' ? '1' : '-1';
                      var minutes = getMinutesByHoursMinutes(tokens, nrule, at+3) * add_or_subtract;
                      if (minutes === 0)
                          parsing_warnings.push([ nrule, at+5, t('zero calculation') ]
                              );
                      return minutes;
                  } else {
                      error = [ at+6, '. ' + t('missing', {'symbol': ")"}) + '.'];
                  }
              } else {
                  error = [ at+5, ' ' + t('(time)') + '.'];
              }
          } else {
              error = [ at+2, '. ' + t('expected', {'symbol': '+" or "-'})];
          }

          if (error)
              throw formatWarnErrorMessage(nrule, error[0],
                   t('calculation syntax')+ error[1]);
      }
      /* }}} */
      /* }}} */

      /* Weekday range parser (Mo,We-Fr,Sa[1-2,-1],PH). {{{
       *
       * :param tokens: List of token objects.
       * :param at: Position where the weekday tokens could be.
       * :param rule: Reference to rule object.
       * :param nrule: Rule number starting with 0.
       * :returns: Position at which the token does not belong to the selector anymore.
       */
      function parseWeekdayRange(tokens, at, rule, in_holiday_selector, nrule) {
          if (!in_holiday_selector) {
              in_holiday_selector = true;
              tokens[at][3] = 'weekday';
          }

          for (; at < tokens.length; at++) {
              if (matchTokens(tokens, at, 'weekday', '[')) {
                  // Conditional weekday (Mo[3])
                  var numbers = [];

                  // Get list of constraints
                  var endat = parseNumRange(tokens, at+2, function(from, to, at) {

                      // bad number
                      if (from === 0 || from < -5 || from > 5)
                          throw formatWarnErrorMessage(nrule, at,
                              t('number -5 to 5'));

                      if (from === to) {
                          numbers.push(from);
                      } else if (from < to) {
                          for (var i = from; i <= to; i++) {
                              // bad number
                              if (i === 0 || i < -5 || i > 5)
                                  throw formatWarnErrorMessage(nrule, at+2,
                                      t('number -5 to 5'));

                              numbers.push(i);
                          }
                      } else {
                          throw formatWarnErrorMessage(nrule, at+2,
                              t('bad range',{'from': from, 'to': to}));
                      }
                  });

                  if (!matchTokens(tokens, endat, ']')) {
                      throw formatWarnErrorMessage(
                          nrule,
                          endat + (typeof tokens[endat] === 'object' ? 0 : -1),
                          t('] or more numbers')
                      );
                  }

                  var add_days = getMoveDays(tokens, endat+1, 6, 'constrained weekdays');
                  week_stable = false;

                  // Create selector for each list element.
                  for (var nnumber = 0; nnumber < numbers.length; nnumber++) {

                      rule.weekday.push(function(weekday, number, add_days) { return function(date) {
                          var date_num = getValueForDate(date, false); // Year not needed to distinguish.
                          var start_of_this_month = new Date(date.getFullYear(), date.getMonth(), 1);
                          var start_of_next_month = new Date(date.getFullYear(), date.getMonth() + 1, 1);

                          var target_day_this_month;

                          target_day_this_month = getDateForConstrainedWeekday(date.getFullYear(), date.getMonth(), weekday, [ number ]);

                          var target_day_with_added_days_this_month = new Date(target_day_this_month.getFullYear(),
                              target_day_this_month.getMonth(), target_day_this_month.getDate() + add_days);

                          // The target day with added days can be before this month
                          if (target_day_with_added_days_this_month.getTime() < start_of_this_month.getTime()) {
                              // but in this case, the target day without the days added needs to be in this month
                              if (target_day_this_month.getTime() >= start_of_this_month.getTime()) {
                                  // so we calculate it for the month
                                  // following this month and hope that the
                                  // target day will actually be this month.

                                  target_day_with_added_days_this_month = dateAtNextWeekday(
                                      new Date(date.getFullYear(), date.getMonth() + (number > 0 ? 0 : 1) + 1, 1), weekday);
                                  target_day_this_month.setDate(target_day_with_added_days_this_month.getDate()
                                      + (number + (number > 0 ? -1 : 0)) * 7 + add_days);
                              } else {
                                  // Calculated target day is not inside this month
                                  // therefore the specified weekday (e.g. fifth Sunday)
                                  // does not exist this month. Try it next month.
                                  return [false, start_of_next_month];
                              }
                          } else if (target_day_with_added_days_this_month.getTime() >= start_of_next_month.getTime()) {
                              // The target day is in the next month. If the target day without the added days is not in this month
                              if (target_day_this_month.getTime() >= start_of_next_month.getTime())
                                  return [false, start_of_next_month];
                          }

                          var target_day_with_added_moved_days_this_month;
                          if (add_days > 0) {
                              target_day_with_added_moved_days_this_month = dateAtNextWeekday(
                                  new Date(date.getFullYear(), date.getMonth() + (number > 0 ? 0 : 1) -1, 1), weekday);
                              target_day_with_added_moved_days_this_month.setDate(target_day_with_added_moved_days_this_month.getDate()
                                  + (number + (number > 0 ? -1 : 0)) * 7 + add_days);

                              if (date_num === getValueForDate(target_day_with_added_moved_days_this_month, false))
                                  return [true, dateAtDayMinutes(date, minutes_in_day)];
                          } else if (add_days < 0) {
                              target_day_with_added_moved_days_this_month = dateAtNextWeekday(
                                  new Date(date.getFullYear(), date.getMonth() + (number > 0 ? 0 : 1) + 1, 1), weekday);
                              target_day_with_added_moved_days_this_month.setDate(target_day_with_added_moved_days_this_month.getDate()
                                  + (number + (number > 0 ? -1 : 0)) * 7 + add_days);

                              if (target_day_with_added_moved_days_this_month.getTime() >= start_of_next_month.getTime()) {
                                  if (target_day_with_added_days_this_month.getTime() >= start_of_next_month.getTime())
                                      return [false, target_day_with_added_moved_days_this_month];
                              } else {
                                  if (target_day_with_added_days_this_month.getTime() < start_of_next_month.getTime()
                                      && getValueForDate(target_day_with_added_days_this_month, false) === date_num)
                                      return [true, dateAtDayMinutes(date, minutes_in_day)];

                                  target_day_with_added_days_this_month = target_day_with_added_moved_days_this_month;
                              }
                          }

                          // we hit the target day
                          if (date.getDate() === target_day_with_added_days_this_month.getDate()) {
                              return [true, dateAtDayMinutes(date, minutes_in_day)];
                          }

                          // we're before target day
                          if (date.getDate() < target_day_with_added_days_this_month.getDate()) {
                              return [false, target_day_with_added_days_this_month];
                          }

                          // we're after target day, set check date to next month
                          return [false, start_of_next_month];
                      }}(tokens[at][0], numbers[nnumber], add_days[0]));
                  }

                  at = endat + 1 + add_days[1];
              } else if (matchTokens(tokens, at, 'weekday')) {
                  // Single weekday (Mo) or weekday range (Mo-Fr)
                  var is_range = matchTokens(tokens, at+1, '-', 'weekday');

                  var weekday_from = tokens[at][0];
                  var weekday_to = is_range ? tokens[at+2][0] : weekday_from;

                  var inside = true;

                  // handle reversed range
                  if (weekday_to < weekday_from) {
                      var tmp = weekday_to;
                      weekday_to = weekday_from - 1;
                      weekday_from = tmp + 1;
                      inside = false;
                  }
                  var weekday_list = Array.apply(0, Array(weekday_to - weekday_from + 1)).map(function (_, index) {
                      return index + weekday_to;
                  });
                  if (typeof rule_infos[nrule] === 'undefined') {
                      rule_infos[nrule] = {};
                  }
                  if (typeof rule_infos[nrule]['week_days'] === 'object') {
                      Array.prototype.push.apply(rule_infos[nrule]['week_days'], weekday_list);
                  } else {
                      rule_infos[nrule]['week_days'] = weekday_list;
                  }

                  if (weekday_to < weekday_from) { // handle full range
                      rule.weekday.push(function() { return [true]; });
                      // Not needed. If there is no selector it automatically matches everything.
                      // WRONG: This only works if there is no other selector in this selector group ...
                  } else {
                      rule.weekday.push(function(weekday_from, weekday_to, inside) { return function(date) {
                          var ourweekday = date.getDay();

                          if (ourweekday < weekday_from || ourweekday > weekday_to) {
                              return [!inside, dateAtNextWeekday(date, weekday_from)];
                          } else {
                              return [inside, dateAtNextWeekday(date, weekday_to + 1)];
                          }
                      }}(weekday_from, weekday_to, inside));
                  }

                  at += is_range ? 3 : 1;
              } else if (matchTokens(tokens, at, 'holiday')) {
                  week_stable = false;
                  return parseHoliday(tokens, at, rule, true, in_holiday_selector);
              } else if (matchTokens(tokens, at - 1, ',')) { // additional rule
                  throw formatWarnErrorMessage(
                      nrule,
                      at - 1,
                      t('additional rule no sense'));
              } else {
                  throw formatWarnErrorMessage(nrule, at, t('unexpected token weekday range', {'token': tokens[at][1]}));
              }

              if (!matchTokens(tokens, at, ',')) {
                  break;
              }
          }

          return at;
      }
      /* }}} */

      /* Get the number of days a date should be moved (if any). {{{
       *
       * :param tokens: List of token objects.
       * :param at: Position where the date moving tokens could be.
       * :param max_differ: Maximal number of days to move (could also be zero if there are no day move tokens).
       * :returns: Array:
       *            0. Days to add.
       *            1. How many tokens.
       */
      function getMoveDays(tokens, at, max_differ, name) {
          var add_days = [ 0, 0 ]; // [ 'days to add', 'how many tokens' ]
          add_days[0] = matchTokens(tokens, at, '+') || (matchTokens(tokens, at, '-') ? -1 : 0);
          if (add_days[0] !== 0 && matchTokens(tokens, at+1, 'number', 'calcday')) {
              // continues with '+ 5 days' or something like that
              if (tokens[at+1][0] > max_differ)
                  throw formatWarnErrorMessage(nrule, at+2,
                      t('max differ',{'maxdiffer': max_differ, 'name': name}));
              add_days[0] *= tokens[at+1][0];
              if (add_days[0] === 0 && !done_with_warnings)
                  parsing_warnings.push([ nrule, at+2, t('adding 0') ]);
              add_days[1] = 3;
          } else {
              add_days[0] = 0;
          }
          return add_days;
      }
      /* }}} */

      /* Holiday parser for public and school holidays (PH,SH) {{{
       *
       * :param tokens: List of token objects.
       * :param at: Position where to start.
       * :param rule: Reference to rule object.
       * :param push_to_weekday: Will push the selector into the weekday selector array which has the desired side effect of working in conjunction with the weekday selectors (either the holiday match or the weekday), which is the normal and expected behavior.
       * :returns: Position at which the token does not belong to the selector anymore.
       */
      function parseHoliday(tokens, at, rule, push_to_weekday, in_holiday_selector) {
          if (!in_holiday_selector) {

              if (push_to_weekday)
                  tokens[at][3] = 'weekday';
              else
                  tokens[at][3] = 'holiday'; // Could also be holiday but this is not important here.
          }

          for (; at < tokens.length; at++) {
              if (matchTokens(tokens, at, 'holiday')) {
                  if (tokens[at][0] === 'PH') {
                      var applying_holidays = getMatchingHoliday(tokens[at][0]);

                      // Only allow moving one day in the past or in the future.
                      // This makes implementation easier because only one holiday is assumed to be moved to the next year.
                      var add_days = getMoveDays(tokens, at+1, 1, 'public holiday');

                      var selector = function(applying_holidays, add_days) { return function(date) {

                          var holidays = getApplyingHolidaysForYear(applying_holidays, date.getFullYear(), add_days);
                          // Needs to be calculated each time because of movable days.

                          var date_num = getValueForDate(date, true);

                          for (var i = 0; i < holidays.length; i++) {
                              var next_holiday_date_num = getValueForDate(holidays[i][0], true);

                              if (date_num < next_holiday_date_num) {

                                  if (add_days[0] > 0) {
                                      // Calculate the last holiday from previous year to tested against it.
                                      var holidays_last_year = getApplyingHolidaysForYear(applying_holidays, date.getFullYear() - 1, add_days);
                                      var last_holiday_last_year = holidays_last_year[holidays_last_year.length - 1];
                                      var last_holiday_last_year_num = getValueForDate(last_holiday_last_year[0], true);

                                      if (date_num < last_holiday_last_year_num ) {
                                          return [ false, last_holiday_last_year[0] ];
                                      } else if (date_num === last_holiday_last_year_num) {
                                          return [true, dateAtDayMinutes(last_holiday_last_year[0], minutes_in_day),
                                              'Day after ' +last_holiday_last_year[1] ];
                                      }
                                  }

                                  return [ false, holidays[i][0] ];
                              } else if (date_num === next_holiday_date_num) {
                                  return [true, new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
                                      (add_days[0] > 0 ? 'Day after ' : (add_days[0] < 0 ? 'Day before ' : '')) + holidays[i][1] ];
                              }
                          }

                          if (add_days[0] < 0) {
                              // Calculate the first holiday from next year to tested against it.
                              var holidays_next_year = getApplyingHolidaysForYear(applying_holidays, date.getFullYear() + 1, add_days);
                              var first_holidays_next_year = holidays_next_year[0];
                              var first_holidays_next_year_num = getValueForDate(first_holidays_next_year[0], true);
                              if (date_num === first_holidays_next_year_num) {
                                  return [true, dateAtDayMinutes(first_holidays_next_year[0], minutes_in_day),
                                      'Day before ' + first_holidays_next_year[1] ];
                              }
                          }

                          // continue next year
                          return [ false, new Date(holidays[0][0].getFullYear() + 1,
                                  holidays[0][0].getMonth(),
                                  holidays[0][0].getDate()) ];

                      }}(applying_holidays, add_days);

                      if (push_to_weekday)
                          rule.weekday.push(selector);
                      else
                          rule.holiday.push(selector);

                      at += 1 + add_days[1];
                  } else if (tokens[at][0] === 'SH') {
                      var applying_holidays = getMatchingHoliday(tokens[at][0]);

                      var selector = function(applying_holidays) { return function(date) {
                          var date_num = getValueForDate(date);

                          // Iterate over holiday array containing the different holiday ranges.
                          for (var i = 0; i < applying_holidays.length; i++) {

                              var holiday = getSHForYear(applying_holidays[i], date.getFullYear());
                              if (typeof holiday === 'undefined') {
                                  continue;
                              }

                              for (var h = 0; h < holiday.length; h+=4) {
                                  var holiday_to_plus = new Date(date.getFullYear(), holiday[2+h] - 1, holiday[3+h] + 1);
                                  var holiday_from = (holiday[0+h] - 1) * 100 + holiday[1+h];
                                  var holiday_to   = (holiday[2+h] - 1) * 100 + holiday[3+h];
                                  holiday_to_plus  = getValueForDate(holiday_to_plus);

                                  // console.log(`holiday_from: ${holiday_from}, holiday_to: ${holiday_to}, holiday_to_plus: ${holiday_to_plus}`);

                                  var holiday_ends_next_year = holiday_to < holiday_from;

                                  if (date_num < holiday_from) { // date is before selected holiday

                                      // check if we are in the holidays from the last year spanning into this year
                                      var last_year_holiday = getSHForYear(applying_holidays[applying_holidays.length - 1], date.getFullYear() - 1);
                                      if (typeof last_year_holiday === 'object') {
                                          var last_year_holiday_from = (last_year_holiday[last_year_holiday.length - 4] - 1) * 100
                                              + last_year_holiday[last_year_holiday.length - 3]; // e.g. 1125
                                          var last_year_holiday_to   = (last_year_holiday[last_year_holiday.length - 2] - 1) * 100
                                              + last_year_holiday[last_year_holiday.length - 1]; // e.g. 0005
                                          // console.log(last_year_holiday_from, last_year_holiday_to);

                                          if (last_year_holiday_from > last_year_holiday_to && date_num <= last_year_holiday_to) {
                                              return [ true, new Date(date.getFullYear(),
                                                  last_year_holiday[last_year_holiday.length - 2] - 1,
                                                  last_year_holiday[last_year_holiday.length - 1] + 1),
                                                  applying_holidays[applying_holidays.length - 1].name ];
                                          } else {
                                              return [ false, new Date(date.getFullYear(), holiday[0+h] - 1, holiday[1+h]) ];
                                          }
                                      } else { /* School holidays for last year are not defined. */
                                          return [ false, new Date(date.getFullYear(), holiday[0+h] - 1, holiday[1+h]) ];
                                      }
                                  } else if (holiday_from <= date_num && (date_num <= holiday_to || holiday_ends_next_year)) {
                                      return [ true, new Date(date.getFullYear() + holiday_ends_next_year, holiday[2+h] - 1, holiday[3+h] + 1),
                                          applying_holidays[i].name ];
                                  } else if (holiday_to_plus === date_num) { // selected holiday end is equal to month and day
                                      if (h + 4 < holiday.length) { // next holiday is next date range of the same holidays
                                          h += 4;
                                          return [ false, new Date(date.getFullYear(), holiday[0+h] - 1, holiday[1+h]) ];
                                      } else {
                                          /* Because not all school holidays
                                           * have to apply each year this
                                           * part has been simplified which
                                           * makes the implementation a bit
                                           * less efficient but reduces
                                           * complexity.
                                           */
                                          return [ false, new Date(date.getFullYear(), holiday[2+h] - 1, holiday[3+h] + 2) ];
                                      }
                                  }
                              }
                          }
                          throw formatLibraryBugMessage(t('no SH definition', {
                              'name': '',
                              'year': date.getFullYear(),
                          }), 'library bug PR only');
                      }}(applying_holidays);

                      if (push_to_weekday)
                          rule.weekday.push(selector);
                      else
                          rule.holiday.push(selector);
                      at += 1; // FIXME: test
                  }
              } else if (matchTokens(tokens, at, 'weekday')) {
                  return parseWeekdayRange(tokens, at, rule, true, nrule);
              } else if (matchTokens(tokens, at - 1, ',')) { // additional rule
                  throw formatWarnErrorMessage(
                      nrule,
                      at - 1,
                      t('additional rule no sense'));
              } else {
                  throw formatWarnErrorMessage(nrule, at, t('unexpected token holiday', {'token': tokens[at][1]}));
              }

              if (!matchTokens(tokens, at, ','))
                  break;
          }

          return at;
      }

      // Helpers for holiday parsers {{{

      /* Returns a number for a date which can then be used to compare just the dates (without the time). {{{
       *
       * This is necessary because a selector could be called for the middle of the day and we need to tell if it matches that day.
       * Example: Returns 20150015 for Jan 15 2015.
       *
       * :param date: Date object.
       * :param include_year: Boolean. If true include the year.
       * :returns: Number for the date.
       */
      function getValueForDate(date, include_year) {
          // Implicit because undefined evaluates to false.
          // include_year = typeof include_year !== 'undefined' ? include_year : false;

          return (include_year ? (date.getFullYear() * 10000) : 0) + (date.getMonth() * 100) + date.getDate();
      }
      /* }}} */

      /* Return the school holiday definition e.g. [ 5, 25, to 6, 5 ], for the specified year {{{
       *
       * :param SH_hash:
       * :param year: Year as integer.
       * :param fatal: Defines the behavior in case no definition is find. Throw an error if set to true. Return return undefined otherwise.
       * :returns: school holidays for the given year.
       */
      function getSHForYear(SH_hash, year, fatal) {

          var holiday = SH_hash[year];
          if (typeof holiday === 'undefined') {
              holiday = SH_hash['default']; // applies for any year without explicit definition
              if (typeof holiday === 'undefined') {
                  {
                      return undefined;
                  }
              }
          }
          return holiday;
      }
      /* }}} */

      /* Return closest holiday definition available. {{{
       *
       * First try to get the state, if missing get the country wide holidays
       * (which can on it’s own be limited to some states).
       *
       * :param type_of_holidays: Choices: PH, SH.
       * :returns: Public or school holiday list.
       */
      function getMatchingHoliday(type_of_holidays) {
          if (typeof location_cc !== 'string') {
              /* We have no idea which holidays do apply because the country code was not provided. */
              throw t('no country code');
          }

          if (!holiday_definitions[location_cc]) {
              throw formatLibraryBugMessage(t('no holiday definition', {
                  'name': type_of_holidays,
                  'cc': location_cc,
              }), 'library bug PR only');
          }

          var matching_holiday = [];
          if (typeof location_state === 'string'
              && typeof holiday_definitions[location_cc][location_state] === 'object'
              && typeof holiday_definitions[location_cc][location_state][type_of_holidays] === 'object') {

              /* If holiday_definitions for the state are specified,
               * use it and ignore lesser specific ones (for the
               * country).
               */

              var country_holidays = holiday_definitions[location_cc][type_of_holidays] || [];
              var state_holidays = holiday_definitions[location_cc][location_state][type_of_holidays];
              if (type_of_holidays === 'PH') {
                  matching_holiday = state_holidays;
              } else if (!country_holidays.length) {
                  matching_holiday = state_holidays;
              } else {
                  // Merge country and state holidays chronologically
                  var country_holiday_names = country_holidays.map(function(country_holiday) {
                      return country_holiday.name;
                  });
                  var matching_holiday = [];
                  matching_holiday.push.apply(matching_holiday, country_holidays);
                  matching_holiday.push.apply(matching_holiday, state_holidays.filter(function is_not_a_country_holiday(state_holiday) {
                      return country_holiday_names.indexOf(state_holiday.name) === -1;
                  }));
                  matching_holiday.sort(function(h1, h2) {
                      var h1_year = Object.keys(h1).find(function(k) {return k !== 'name';});
                      var h2_year = Object.keys(h2).find(function(k) {return k !== 'name';});
                      var h1_date = h1[h1_year];
                      var h2_date = h2[h2_year];
                      // compare both months, or to break a tie both days
                      return (h1_date[0] - h2_date[0]) || (h1_date[1] - h2_date[1]);
                  });
              }
          } else if (holiday_definitions[location_cc][type_of_holidays]) {
              /* Holidays are defined country wide. Some
               * countries only have country-wide holiday definitions
               * so that is ok too.
               */
              var applying_holidays_for_country = holiday_definitions[location_cc][type_of_holidays];

              switch (type_of_holidays) {
                  case 'PH':
                      applying_holidays_for_country.forEach(function (holiday_item) {
                          /* Holidays in the country-wide scope can be limited to certain states. */
                          if ('only_states' in holiday_item) {
                              if (-1 === holiday_item.only_states.indexOf(location_state)) {
                                  return;
                              }
                          }

                          matching_holiday.push(holiday_item);
                      });
                      break;
                  case 'SH':
                      matching_holiday = applying_holidays_for_country;
                      break;
              }
          } else {
              throw formatLibraryBugMessage(t('no holiday definition state', {
                  'name': type_of_holidays,
                  'cc': location_cc,
                  'state': location_state,
              }), 'library bug PR only');
          }

          if (matching_holiday.length === 0) {
              throw formatLibraryBugMessage(t('no holiday definition', {
                  'name': type_of_holidays,
                  'cc': location_cc,
              }), 'library bug PR only');
          }

          return matching_holiday;
      }
      /* }}} */

      /* Return variable dates used for holiday calculation. {{{
       *
       * :param year: Year as integer.
       * :returns: Hash of variables dates. Key is the name of the variable date. Value is the variable date date object.
       */
      function getMovableEventsForYear(year) {
          /* Calculate easter {{{ */
          var C = Math.floor(year/100);
          var N = year - 19*Math.floor(year/19);
          var K = Math.floor((C - 17)/25);
          var I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19*N + 15;
          I = I - 30*Math.floor((I/30));
          I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11));
          var J = year + Math.floor(year/4) + I + 2 - C + Math.floor(C/4);
          J = J - 7*Math.floor(J/7);
          var L = I - J;
          var M = 3 + Math.floor((L + 40)/44);
          var D = L + 28 - 31*Math.floor(M/4);
          /* }}} */

          /* Calculate orthodox easter {{{ */
          var oA = year % 4;
          var oB = year % 7;
          var oC = year % 19;
          var oD = (19*oC + 15) % 30;
          var oE = (2*oA+4*oB - oD + 34) % 7;
          var oF = oD+oE;

          var oDate;
          if (oF < 9) {
              oDate = new Date(year, 4-1, oF+4);
          } else {
              if ((oF+4)<31) {
                  oDate = new Date(year, 4-1, oF+4);
              } else {
                  oDate = new Date(year, 5-1, oF-26);
              }
          }
          /* }}} */

          /* Calculate last Sunday in February {{{ */
          var lastFebruaryDay = new Date(year, 2, 0);
          var lastFebruarySunday = lastFebruaryDay.getDate() - lastFebruaryDay.getDay();
          /* }}} */

          /* Calculate Victoria Day. last Monday before or on May 24 {{{ */
          var may_24 = new Date(year, 4, 24);
          var victoriaDay = 24  - ((6 + may_24.getDay()) % 7);
          /* }}} */

          /* Calculate Canada Day. July 1st unless 1st is on Sunday, then July 2. {{{ */
          var july_1 = new Date(year, 6, 1);
          var canadaDay = july_1.getDay() === 0 ? 2 : 1;
          /* }}} */

          /* Calculation of the spring and autumnal equinoxes (for Public holidays in Japan). {{{ */
          function springEquinoxCalc(year){
              if(year >= 1900 && year <= 1923){
                  if(year % 4 === 3) return new Date(year, 2, 22)
                  else return new Date(year, 2, 21)
              } else if(year >= 1924 && year <= 1959){
                  return new Date(year, 2, 21)
              } else if(year >= 1960 && year <= 1991){
                  if(year % 4 === 0) return new Date(year, 2, 20)
                  else return new Date(year, 2, 21)
              } else if(year >= 1992 && year <= 2023){
                  if(year % 4 === 0 || year % 4 === 1) return new Date(year, 2, 20)
                  else return new Date(year, 2, 21)
              } else if(year >= 2024 && year <= 2055){
                  if(year % 4 === 3) return new Date(year, 2, 21)
                  else return new Date(year, 2, 20)
              } else if(year >= 2056 && year <= 2091){
                  return new Date(year, 2, 20)
              } else if(year >= 2092 && year <= 2099){
                  if(year % 4 === 0) return new Date(year, 2, 19)
                  else return new Date(year, 2, 20)
              }
          }

          function autumnalEquinoxCalc(year){
              if(year >= 1900 && year <= 1919){
                  if(year % 4 === 0) return new Date(year, 8, 23)
                  else return new Date(year, 8, 24)
              } else if(year >= 1920 && year <= 1947){
                  if(year % 4 === 0 || year % 4 === 1) return new Date(year, 8, 23)
                  else return new Date(year, 8, 24)
              } else if(year >= 1948 && year <= 1979){
                  if(year % 4 === 3) return new Date(year, 8, 24)
                  else return new Date(year, 8, 23)
              } else if(year >= 1980 && year <= 2011){
                  return new Date(year, 8, 23)
              } else if(year >= 2012 && year <= 2043){
                  if(year % 4 === 0) return new Date(year, 8, 22)
                  else return new Date(year, 8, 23)
              }  else if(year >= 2044 && year <= 2075){
                  if(year % 4 === 0 || year % 4 === 1) return new Date(year, 8, 22)
                  else return new Date(year, 8, 23)
              } else if(year >= 2076 && year <= 2099){
                  if(year % 4 === 3) return new Date(year, 8, 23)
                  else return new Date(year, 8, 22)
              }
          }

          /* Helper functions {{{ */
          function firstWeekdayOfMonth(month, weekday){
              var first = new Date(year, month, 1);
              return 1 + ((7 + weekday - first.getDay()) % 7);
          }

          function lastWeekdayOfMonth(month, weekday){
              var last = new Date(year, month+1, 0);
              var offset = ((7 + last.getDay() - weekday) % 7);
              return last.getDate() - offset;
          }

          function getDateOfWeekdayInDateRange(weekday, start_date){
              var days_to_dest_date = weekday - start_date.getDay();
              if (days_to_dest_date < 0) {
                  days_to_dest_date += 7;
              }
              start_date.setDate(start_date.getDate() + days_to_dest_date);
              return start_date;
          }

          /* Date of next weekday range. {{{
           *
           * :param first_weekday: First weekday in range of wanted weekday (1 is Mo).
           * :param last_weekday: Last weekday in range of wanted weekday (1 is Mo).
           * :param start_date: Earliest possible date to consider.
           * :returns: start_date if in weekday range, otherwise the next day which is in range.
           */
          function getDateOfNextWeekdayRange(first_weekday, last_weekday, start_date){
              if (first_weekday >= last_weekday) {
                  throw formatLibraryBugMessage('Not implemented yet.');
              }

              if (first_weekday <= start_date.getDay() && start_date.getDay() <= last_weekday) {
                  return start_date;
              } else {
                  var days_to_dest_date = first_weekday - start_date.getDay();
                  if (days_to_dest_date < 0) {
                      days_to_dest_date += 7;
                  }
                  start_date.setDate(start_date.getDate() + days_to_dest_date);
                  return start_date;
              }

          }
          /* }}} */

          return {
              'easter'                : new Date(year, M - 1, D),
              'orthodox easter'       : oDate,
              'victoriaDay'           : new Date(year,  4, victoriaDay),
              'canadaDay'             : new Date(year,  6, canadaDay),
              'firstJanuaryMonday'    : new Date(year,  0, firstWeekdayOfMonth(0, 1)),
              'firstFebruaryMonday'   : new Date(year,  1, firstWeekdayOfMonth(1, 1)),
              'lastFebruarySunday'    : new Date(year,  1, lastFebruarySunday),
              'firstMarchMonday'      : new Date(year,  2, firstWeekdayOfMonth(2, 1)),
              'firstAprilMonday'      : new Date(year,  3, firstWeekdayOfMonth(3, 1)),
              'firstMayMonday'        : new Date(year,  4, firstWeekdayOfMonth(4, 1)),
              'firstJuneMonday'       : new Date(year,  5, firstWeekdayOfMonth(5, 1)),
              'firstJulyMonday'       : new Date(year,  6, firstWeekdayOfMonth(6, 1)),
              'firstAugustMonday'     : new Date(year,  7, firstWeekdayOfMonth(7, 1)),
              'firstSeptemberMonday'  : new Date(year,  8, firstWeekdayOfMonth(8, 1)),
              'firstSeptemberTuesday' : new Date(year,  8, firstWeekdayOfMonth(8, 2)),
              'firstSeptemberSunday'  : new Date(year,  8, firstWeekdayOfMonth(8, 0)),
              'firstOctoberMonday'    : new Date(year,  9, firstWeekdayOfMonth(9, 1)),
              'firstNovemberMonday'   : new Date(year, 10, firstWeekdayOfMonth(10, 1)),
              'firstNovemberTuesday'  : new Date(year, 10, firstWeekdayOfMonth(10, 2)),
              'firstMarchTuesday'     : new Date(year,  2, firstWeekdayOfMonth(2, 2)),
              'firstAugustTuesday'    : new Date(year,  7, firstWeekdayOfMonth(7, 2)),
              'firstAugustFriday'     : new Date(year,  7, firstWeekdayOfMonth(7, 5)),
              'firstNovemberThursday' : new Date(year, 10, firstWeekdayOfMonth(10, 4)),
              'lastMayMonday'         : new Date(year,  4, lastWeekdayOfMonth(4, 1)),
              'lastMarchMonday'       : new Date(year,  2, lastWeekdayOfMonth(2, 1)),
              'lastAprilMonday'       : new Date(year,  3, lastWeekdayOfMonth(3, 1)),
              'lastAprilFriday'       : new Date(year,  3, lastWeekdayOfMonth(3, 5)),
              'lastAugustMonday'      : new Date(year,  7, lastWeekdayOfMonth(7, 1)),
              'lastSeptemberMonday'   : new Date(year,  8, lastWeekdayOfMonth(8, 1)),
              'lastSeptemberFriday'   : new Date(year,  8, lastWeekdayOfMonth(8, 5)),
              'lastOctoberMonday'     : new Date(year,  9, lastWeekdayOfMonth(9, 1)),
              'lastOctoberFriday'     : new Date(year,  9, lastWeekdayOfMonth(9, 5)),
              'nextSaturday20Jun'     : getDateOfWeekdayInDateRange(6, new Date(year, 5, 20)),
              'nextSaturday31Oct'     : getDateOfWeekdayInDateRange(6, new Date(year, 9, 31)),
              'nextWednesday16Nov'    : getDateOfWeekdayInDateRange(3, new Date(year, 10, 16)),
              'nextMo-Fr17March'      : getDateOfNextWeekdayRange(1, 5, new Date(year, 2, 17)),
              'nextMo-Sa01May'        : getDateOfNextWeekdayRange(1, 6, new Date(year, 4, 1)),
              'nextMo-Sa07August'     : getDateOfNextWeekdayRange(1, 6, new Date(year, 7, 7)),
              'nextMo-Sa25December'   : getDateOfNextWeekdayRange(1, 6, new Date(year, 11, 25)),
              'springEquinox'         : springEquinoxCalc(year),
              'autumnalEquinox'       : autumnalEquinoxCalc(year),
          };
      }
      /* }}} */

      function getApplyingHolidaysForYear(applying_holidays, year, add_days) {
          var movableDays = getMovableEventsForYear(year);

          var sorted_holidays = [];
          var next_holiday;

          applying_holidays.forEach(function (holiday_item) {
              if ('fixed_date' in holiday_item) {
                  next_holiday = new Date(year,
                          holiday_item.fixed_date[0] - 1,
                          holiday_item.fixed_date[1]
                      );
              } else if ('variable_date' in holiday_item) {
                  var selected_movableDay = movableDays[holiday_item.variable_date];
                  if (!selected_movableDay) {
                      throw t('movable no formula', {'name': holiday_item.name});
                  }
                  var date_offset = 0;
                  if ('offset' in holiday_item) {
                      date_offset = holiday_item.offset;
                  }
                  next_holiday = new Date(selected_movableDay.getFullYear(),
                      selected_movableDay.getMonth(),
                      selected_movableDay.getDate() + date_offset
                  );
                  if (year !== next_holiday.getFullYear()) {
                      throw t('movable not in year', {
                          'name': holiday_item.variable_date, 'days': date_offset});
                  }
              } else {
                  throw formatLibraryBugMessage('Unexpected object: ' + JSON.stringify(holiday_item, null, '    '));
              }

              if (add_days[0]) {
                  next_holiday.setDate(next_holiday.getDate() + add_days[0]);
              }

              sorted_holidays.push([ next_holiday, holiday_item.name ]);
          });

          sorted_holidays = sorted_holidays.sort(function(a,b){
              if (a[0].getTime() < b[0].getTime()) return -1;
              if (a[0].getTime() > b[0].getTime()) return 1;
              return 0;
          });

          return sorted_holidays;
      }
      /* }}} */
      /* }}} */

      /* Year range parser (2013,2016-2018,2020/2). {{{
       *
       * :param tokens: List of token objects.
       * :param at: Position where to start.
       * :returns: Position at which the token does not belong to the selector anymore.
       */
      function parseYearRange(tokens, at) {
          tokens[at][3] = 'year';
          for (; at < tokens.length; at++) {
              if (matchTokens(tokens, at, 'year')) {
                  var is_range = false,
                      has_period,
                      period;
                  if (matchTokens(tokens, at+1, '-', 'year', '/', 'number')) {
                      is_range   = true;
                      has_period = true;
                      period = parseInt(tokens[at+4][0]);
                      checkPeriod(at+4, period, 'year');
                  } else {
                      is_range   = matchTokens(tokens, at+1, '-', 'year');
                      has_period = matchTokens(tokens, at+1, '/', 'number');
                      if (has_period) {
                          period = parseInt(tokens[at+2][0]);
                          checkPeriod(at+2, period, 'year', 'no_end_year');
                      } else if (matchTokens(tokens, at+1, '+')) {
                          period = 1;
                          has_period = 2;
                      }
                  }

                  var year_from = parseInt(tokens[at][0]);
                  // error checking {{{
                      if (is_range && tokens[at+2][0] <= year_from) {
                          // handle reversed range
                          if (tokens[at+2][0] === year_from) {
                              throw formatWarnErrorMessage(nrule, at, t('year range one year', {'year': year_from }));
                          } else {
                              throw formatWarnErrorMessage(nrule, at, t('year range reverse'));
                          }
                      }
                      if (!is_range && year_from < new Date().getFullYear()) {
                          parsing_warnings.push([ nrule, at, t('year past') ]);
                      }
                      if (is_range && tokens[at+2][0] < new Date().getFullYear()) {
                          parsing_warnings.push([ nrule, at+2, t('year past') ]);
                      }
                  /* }}} */

                  rule.year.push(function(tokens, at, year_from, is_range, has_period, period) { return function(date) {
                      var ouryear = date.getFullYear();
                      var year_to = is_range ? parseInt(tokens[at+2][0]) : year_from;

                      if (ouryear < year_from ){
                          return [false, new Date(year_from, 0, 1)];
                      } else if (has_period) {
                          if (year_from <= ouryear) {
                              if (is_range && ouryear > year_to)
                                  return [false];
                              if (period > 0) {
                                  if ((ouryear - year_from) % period === 0) {
                                      return [true, new Date(ouryear + 1, 0, 1)];
                                  } else {
                                      return [false, new Date(ouryear + period - 1, 0, 1)];
                                  }
                              }
                          }
                      } else if (is_range) {
                          if (ouryear <= year_to)
                              return [true, new Date(year_to + 1, 0, 1)];
                      } else if (ouryear === year_from) {
                          return [true];
                      }

                      return [false];

                  }}(tokens, at, year_from, is_range, has_period, period));

                  at += 1 + (is_range ? 2 : 0) + (has_period ? (has_period === 2 ? 1 : 2) : 0);
              } else if (matchTokens(tokens, at - 1, ',')) { // additional rule
                  throw formatWarnErrorMessage(nrule, at - 1, t('additional rule no sense'));
              } else {
                  throw formatWarnErrorMessage(nrule, at, t('unexpected token year range', {'token': tokens[at][1]}));
              }

              if (!matchTokens(tokens, at, ','))
                  break;
          }

          return at;
      }
      /* }}} */

      /* Week range parser (week 11-20, week 1-53/2). {{{
       *
       * :param tokens: List of token objects.
       * :param at: Position where to start.
       * :returns: Position at which the token does not belong to the selector anymore.
       */
      function parseWeekRange(tokens, at) {
          for (; at < tokens.length; at++) {
              if (matchTokens(tokens, at, 'week')) {
                  at++;
              }
              if (matchTokens(tokens, at, 'number')) {
                  var is_range = matchTokens(tokens, at+1, '-', 'number'), period = 0;
                  var week_from = tokens[at][0];
                  var week_to   = is_range ? tokens[at+2][0] : week_from;
                  if (week_from > week_to) {
                      throw formatWarnErrorMessage(nrule, at+2, t('week range reverse'));
                  }
                  if (week_from < 1) {
                      throw formatWarnErrorMessage(nrule, at, t('week negative'));
                  }
                  if (week_to > 53) {
                      throw formatWarnErrorMessage(nrule, is_range ? at+2 : at, t('week exceed'));
                  }
                  if (is_range) {
                      period = matchTokens(tokens, at+3, '/', 'number');
                      if (period) {
                          period = tokens[at+4][0];
                          tokens[at+4][4] = 'positive_number';
                          if (period < 2) {
                              throw formatWarnErrorMessage(nrule, at+4, t('week period less than 2', {
                                  'weekfrom': week_from, 'weekto': week_to, 'period': period}));
                          } else if (period > 26) {
                              throw formatWarnErrorMessage(nrule, at+4, t('week period greater than 26', {
                                  'weekfrom': week_from
                              }));
                          }
                      }
                  }

                  if (week_stable && (!(week_from <= 1 && week_to >= 53) || period)) {
                      week_stable = false;
                  }

                  if (!period && week_from === 1 && week_to === 53) {
                      /* Shortcut and work around bug. */
                      rule.week.push(function() { return [true]; });
                  } else {

                      rule.week.push(function(week_from, week_to, period) { return function(date) {
                          var ourweek = getWeekNumber(date);

                          // console.log("week_from: %s, week_to: %s", week_from, week_to);
                          // console.log("ourweek: %s, date: %s", ourweek, date);

                          // before range
                          if (ourweek < week_from) {
                              // console.log("Before: " + getNextDateOfISOWeek(week_from, date));
                              return [false, getNextDateOfISOWeek(week_from, date)];
                          }

                          // we're after range, set check date to next year
                          if (ourweek > week_to) {
                              // console.log("After");
                              return [false, getNextDateOfISOWeek(week_from, date)];
                          }

                          // we're in range
                          if (period) {
                              var in_period = (ourweek - week_from) % period === 0;
                              if (in_period) {
                                  return [true, getNextDateOfISOWeek(ourweek + 1, date)];
                              } else {
                                  return [false, getNextDateOfISOWeek(ourweek + period - 1, date)];
                              }
                          }

                          // console.log("Match");
                          return [true, getNextDateOfISOWeek(week_to === 53 ? 1 : week_to + 1, date)];
                      }}(week_from, week_to, period));
                  }

                  at += 1 + (is_range ? 2 : 0) + (period ? 2 : 0);
              } else if (matchTokens(tokens, at - 1, ',')) { // additional rule
                  throw formatWarnErrorMessage(nrule, at - 1, t('additional rule no sense'));
              } else {
                  throw formatWarnErrorMessage(nrule, at, t('unexpected token week range', {'token': tokens[at][1]}));
              }

              if (!matchTokens(tokens, at, ','))
                  break;
          }

          return at;
      }

      // https://stackoverflow.com/a/6117889
      /* For a given date, get the ISO week number.
       *
       * Based on information at:
       *
       *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
       *
       * Algorithm is to find nearest Thursday, it's year
       * is the year of the week number. Then get weeks
       * between that date and the first day of that year.
       *
       * Note that dates in one year can be weeks of previous
       * or next year, overlap is up to 3 days.
       *
       * e.g. 2014/12/29 is Monday in week  1 of 2015
       *      2012/1/1   is Sunday in week 52 of 2011
       */
      function getWeekNumber(d) {
          // Copy date so don't modify original
          d = new Date(+d);
          d.setHours(0,0,0,0);
          // Set to nearest Thursday: current date + 4 - current day number
          // Make Sunday's day number 7
          d.setDate(d.getDate() + 4 - (d.getDay()||7));
          // Get first day of year
          var yearStart = new Date(d.getFullYear(),0,1);
          // Calculate full weeks to nearest Thursday
          return Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7)
      }
      // https://stackoverflow.com/a/16591175
      function getDateOfISOWeek(w, year) {
          var simple = new Date(year, 0, 1 + (w - 1) * 7);
          var dow = simple.getDay();
          var ISOweekStart = simple;
          if (dow <= 4)
              ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
          else
              ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
          return ISOweekStart;
      }
      function getNextDateOfISOWeek(week, date) {
          var next_date;
          for (var i = -1; i <= 1; i++) {
              next_date = getDateOfISOWeek(week, date.getFullYear() + i);
              if (next_date.getTime() > date.getTime()) {
                  return next_date;
              }
          }
          throw formatLibraryBugMessage();
      }
      /* }}} */

      /* Month range parser (Jan,Feb-Mar). {{{
       *
       * :param tokens: List of token objects.
       * :param at: Position where to start.
       * :param push_to_monthday: Will push the selector into the monthday selector array which has the desired side effect of working in conjunction with the monthday selectors (either the month match or the monthday).
       * :returns: Position at which the token does not belong to the selector anymore.
       */
      function parseMonthRange(tokens, at, push_to_monthday, in_selector) {
          if (!in_selector)
              tokens[at][3] = 'month';

          for (; at < tokens.length; at++) {
              // Use parseMonthdayRange if '<month> <daynum>' and not '<month> <hour>:<minute>'
              if (matchTokens(tokens, at, 'month', 'number') && !matchTokens(tokens, at+2, 'timesep', 'number')) {
                  return parseMonthdayRange(tokens, at, nrule, true);
              } else if (matchTokens(tokens, at, 'month')) {
                  // Single month (Jan) or month range (Feb-Mar)
                  var is_range = matchTokens(tokens, at+1, '-', 'month');

                  var month_from = tokens[at][0];
                  var month_to = is_range ? tokens[at+2][0] : month_from;

                  if (is_range && week_stable) {
                      if (month_from !== (month_to + 1) % 12)
                          week_stable = false;
                  } else {
                      week_stable = false;
                  }

                  var inside = true;

                  // handle reversed range
                  if (month_to < month_from) {
                      var tmp = month_to;
                      month_to = month_from - 1;
                      month_from = tmp + 1;
                      inside = false;
                  }

                  var selector = function(month_from, month_to, inside) { return function(date) {
                      var ourmonth = date.getMonth();

                      if (month_to < month_from) {
                          /* Handle full range. */
                          return [!inside];
                      }

                      if (ourmonth < month_from || ourmonth > month_to) {
                          return [!inside, dateAtNextMonth(date, month_from)];
                      } else {
                          return [inside, dateAtNextMonth(date, month_to + 1)];
                      }
                  }}(month_from, month_to, inside);

                  if (push_to_monthday === true)
                      rule.monthday.push(selector);
                  else
                      rule.month.push(selector);

                  at += is_range ? 3 : 1;
              } else {
                  throw formatWarnErrorMessage(nrule, at, t('unexpected token month range', {'token': tokens[at][1]}));
              }

              if (!matchTokens(tokens, at, ','))
                  break;
          }

          return at;
      }

      function dateAtNextMonth(date, month) {
          return new Date(date.getFullYear(), month < date.getMonth() ? month + 12 : month);
      }
      /* }}} */

      /* Month day range parser (Jan 26-31; Jan 26-Feb 26). {{{
       *
       * :param tokens: List of token objects.
       * :param at: Position where to start.
       * :param nrule: Rule number starting with 0.
       * :param push_to_month: Will push the selector into the month selector array which has the desired side effect of working in conjunction with the month selectors (either the month match or the monthday).
       * :returns: Position at which the token does not belong to the selector anymore.
       */
      function parseMonthdayRange(tokens, at, nrule, push_to_month) {
          if (!push_to_month)
              tokens[at][3] = 'month';

          for (; at < tokens.length; at++) {
              var has_year = [], has_month = [], has_event = [], has_calc = [], has_constrained_weekday = [];
              has_year[0]  = matchTokens(tokens, at, 'year');
              has_month[0] = matchTokens(tokens, at+has_year[0], 'month', 'number');
              has_event[0] = matchTokens(tokens, at+has_year[0], 'event');

              if (has_event[0])
                  has_calc[0] = getMoveDays(tokens, at+has_year[0]+1, 200, 'event like easter');

              var at_range_sep;
              if (matchTokens(tokens, at+has_year[0], 'month', 'weekday', '[')) {
                  has_constrained_weekday[0] = getConstrainedWeekday(tokens, at+has_year[0]+3);
                  has_calc[0] = getMoveDays(tokens, has_constrained_weekday[0][1], 6, 'constrained weekdays');
                  at_range_sep = has_constrained_weekday[0][1] + (typeof has_calc[0] === 'object' && has_calc[0][1] ? 3 : 0);
              } else {
                  at_range_sep = at+has_year[0]
                      + (has_event[0]
                          ? (typeof has_calc[0] === 'object' && has_calc[0][1] ? 4 : 1)
                          : 2);
              }

              var at_sec_event_or_month;
              if ((has_month[0] || has_event[0] || has_constrained_weekday[0]) && matchTokens(tokens, at_range_sep, '-')) {
                  has_year[1] = matchTokens(tokens, at_range_sep+1, 'year');
                  at_sec_event_or_month = at_range_sep+1+has_year[1];
                  has_month[1] = matchTokens(tokens, at_sec_event_or_month, 'month', 'number');
                  if (!has_month[1]) {
                      has_event[1] = matchTokens(tokens, at_sec_event_or_month, 'event');
                      if (has_event[1]) {
                          has_calc[1] = getMoveDays(tokens, at_sec_event_or_month+1, 366, 'event like easter');
                      } else if (matchTokens(tokens, at_sec_event_or_month, 'month', 'weekday', '[')) {
                          has_constrained_weekday[1] = getConstrainedWeekday(tokens, at_sec_event_or_month+3);
                          has_calc[1] = getMoveDays(tokens, has_constrained_weekday[1][1], 6, 'constrained weekdays');
                      }
                  }
              }

              // monthday range like Jan 26-Feb 26 {{{
              if (has_year[0] === has_year[1] && (has_month[1] || has_event[1] || has_constrained_weekday[1])) {

                  if (has_month[0])
                      checkIfDateIsValid(tokens[at+has_year[0]][0], tokens[at+has_year[0]+1][0], nrule, at+has_year[0]+1);
                  if (has_month[1])
                      checkIfDateIsValid(tokens[at_sec_event_or_month][0], tokens[at_sec_event_or_month+1][0], nrule, at_sec_event_or_month+1);

                  var selector = function(tokens, at, nrule, has_year, has_event, has_calc, at_sec_event_or_month, has_constrained_weekday) { return function(date) {
                      var start_of_next_year = new Date(date.getFullYear() + 1, 0, 1);

                      var movableDays, from_date;
                      if (has_event[0]) {
                          movableDays = getMovableEventsForYear(has_year[0] ? parseInt(tokens[at][0]) : date.getFullYear());
                          from_date = movableDays[tokens[at+has_year[0]][0]];

                          if (typeof has_calc[0] === 'object' && has_calc[0][1]) {
                              var from_year_before_calc = from_date.getFullYear();
                              from_date.setDate(from_date.getDate() + has_calc[0][0]);
                              if (from_year_before_calc !== from_date.getFullYear())
                                  throw formatWarnErrorMessage(nrule, at+has_year[0]+has_calc[0][1]*3,
                                      t('movable not in year', {'name': tokens[at+has_year[0]][0], 'days': has_calc[0][0]}));
                          }
                      } else if (has_constrained_weekday[0]) {
                          from_date = getDateForConstrainedWeekday((has_year[0] ? tokens[at][0] : date.getFullYear()), // year
                              tokens[at+has_year[0]][0], // month
                              tokens[at+has_year[0]+1][0], // weekday
                              has_constrained_weekday[0],
                              has_calc[0]);
                      } else {
                          from_date = new Date((has_year[0] ? tokens[at][0] : date.getFullYear()),
                              tokens[at+has_year[0]][0], tokens[at+has_year[0]+1][0]);
                      }

                      var to_date;
                      if (has_event[1]) {
                          movableDays = getMovableEventsForYear(has_year[1]
                                      ? parseInt(tokens[at_sec_event_or_month-1][0])
                                      : date.getFullYear());
                          to_date = movableDays[tokens[at_sec_event_or_month][0]];

                          if (typeof has_calc[1] === 'object' && has_calc[1][1]) {
                              var to_year_before_calc = to_date.getFullYear();
                              to_date.setDate(to_date.getDate() + has_calc[1][0]);
                              if (to_year_before_calc !== to_date.getFullYear()) {
                                  throw formatWarnErrorMessage(nrule, at_sec_event_or_month+has_calc[1][1],
                                      t('movable not in year', {'name': tokens[at_sec_event_or_month][0], 'days':  has_calc[1][0] }));
                              }
                          }
                      } else if (has_constrained_weekday[1]) {
                          to_date = getDateForConstrainedWeekday((has_year[1] ? tokens[at_sec_event_or_month-1][0] : date.getFullYear()), // year
                              tokens[at_sec_event_or_month][0],   // month
                              tokens[at_sec_event_or_month+1][0], // weekday
                              has_constrained_weekday[1],
                              has_calc[1]);
                      } else {
                          to_date = new Date((has_year[1] ? tokens[at_sec_event_or_month-1][0] : date.getFullYear()),
                              tokens[at_sec_event_or_month][0], tokens[at_sec_event_or_month+1][0] + 1);
                      }

                      var inside = true;

                      if (to_date < from_date) {
                          var tmp = to_date;
                          to_date = from_date;
                          from_date = tmp;
                          inside = false;
                      }

                      if (date.getTime() < from_date.getTime()) {
                          return [!inside, from_date];
                      } else if (date.getTime() < to_date.getTime()) {
                          return [inside, to_date];
                      } else {
                          if (has_year[0]) {
                              return [!inside];
                          } else {
                              return [!inside, start_of_next_year];
                          }
                      }
                  }}(tokens, at, nrule, has_year, has_event, has_calc, at_sec_event_or_month, has_constrained_weekday);

                  if (push_to_month === true)
                      rule.month.push(selector);
                  else
                      rule.monthday.push(selector);

                  at = (has_constrained_weekday[1]
                          ? has_constrained_weekday[1][1]
                          : at_sec_event_or_month + (has_event[1] ? 1 : 2))
                      + (typeof has_calc[1] === 'object' ? has_calc[1][1] : 0);

                  /* }}} */
                  // Monthday range like Jan 26-31 {{{
              } else if (has_month[0]) {

                  has_year = has_year[0];
                  var year = tokens[at][0]; // Could be month if has no year. Tested later.
                  var month = tokens[at+has_year][0];

                  var first_round = true;

                  do {
                      var range_from = tokens[at+1 + has_year][0];
                      var is_range = matchTokens(tokens, at+2+has_year, '-', 'number');
                      var period = undefined;
                      var range_to = tokens[at+has_year+(is_range ? 3 : 1)][0] + 1;
                      if (is_range && matchTokens(tokens, at+has_year+4, '/', 'number')) {
                          period = tokens[at+has_year+5][0];
                          tokens[at+has_year+5][4] = 'positive_number';
                          checkPeriod(at+has_year+5, period, 'day');
                      }

                      if (first_round) {
                          var at_timesep_if_monthRange = at + has_year + 1 // at month number
                              + (is_range ? 2 : 0) + (period ? 2 : 0)
                              + !(is_range || period); // if not range nor has period, add one

                          // Check for '<month> <timespan>'
                          if (matchTokens(tokens, at_timesep_if_monthRange, 'timesep', 'number')
                                  && (matchTokens(tokens, at_timesep_if_monthRange+2, '+')
                                      || matchTokens(tokens, at_timesep_if_monthRange+2, '-')
                                      || oh_mode !== 0)
                              ) {
                                  return parseMonthRange(tokens, at, true, true);
                          }
                      }

                      // error checking {{{
                      if (range_to < range_from)
                          throw formatWarnErrorMessage(nrule, at+has_year+3, t('day range reverse'));

                      checkIfDateIsValid(month, range_from, nrule, at+1 + has_year);
                      checkIfDateIsValid(month, range_to - 1 /* added previously */,
                          nrule, at+has_year+(is_range ? 3 : 1));
                      /* }}} */

                      var selector = function(year, has_year, month, range_from, range_to, period) { return function(date) {
                          var start_of_next_year = new Date(date.getFullYear() + 1, 0, 1);

                          var from_date = new Date(has_year ? year : date.getFullYear(),
                              month, range_from);
                          if (month === 1 && range_from !== from_date.getDate()) // Only on leap years does this day exist.
                              return [false]; // If day 29 does not exist,
                                              // then the date object adds one day to date
                                              // and this selector should not match.
                          var to_date   = new Date(from_date.getFullYear(),
                              month, range_to);
                          if (month === 1 && is_range && range_to !== to_date.getDate()) // Only on leap years does this day exist.
                              return [false];

                          if (date.getTime() < from_date.getTime())
                              return [false, from_date];
                          else if (date.getTime() >= to_date.getTime())
                              return [false, start_of_next_year];
                          else if (!period)
                              return [true, to_date];

                          var nday = Math.floor((date.getTime() - from_date.getTime()) / msec_in_day);
                          var in_period = nday % period;

                          if (in_period === 0)
                              return [true, new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)];
                          else
                              return [false, new Date(date.getFullYear(), date.getMonth(), date.getDate() + period - in_period)];

                      }}(year, has_year, month, range_from, range_to, period);

                      if (push_to_month === true)
                          rule.month.push(selector);
                      else
                          rule.monthday.push(selector);

                      at += 2 + has_year + (is_range ? 2 : 0) + (period ? 2 : 0);

                      first_round = false;
                  }
                  while (matchTokens(tokens, at, ',', 'number'))


                  /* }}} */
                  // Only event like easter {{{
              } else if (has_event[0]) {

                  var selector = function(tokens, at, nrule, has_year, add_days) { return function(date) {

                      // console.log('enter selector with date: ' + date);
                      var movableDays = getMovableEventsForYear((has_year ? tokens[at][0] : date.getFullYear()));
                      var event_date = movableDays[tokens[at+has_year][0]];
                      if (!event_date)
                          throw t('movable no formula', {'name': tokens[at+has_year][0]});

                      if (add_days[0]) {
                          event_date.setDate(event_date.getDate() + add_days[0]);
                          if (date.getFullYear() !== event_date.getFullYear())
                              throw formatWarnErrorMessage(nrule, at+has_year+add_days[1], t('movable not in year', {
                                  'name': tokens[at+has_year][0], 'days': add_days[0]}));
                      }

                      if (date.getTime() < event_date.getTime())
                          return [false, event_date];
                      // else if (date.getTime() < event_date.getTime() + msec_in_day) // does not work because of daylight saving times
                      else if (event_date.getMonth() * 100 + event_date.getDate() === date.getMonth() * 100 + date.getDate())
                          return [true, new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)];
                      else
                          return [false, new Date(date.getFullYear() + 1, 0, 1)];

                  }}(tokens, at, nrule, has_year[0], has_calc[0]);

                  if (push_to_month === true)
                      rule.month.push(selector);
                  else
                      rule.monthday.push(selector);

                  at += has_year[0] + has_event[0] + (typeof has_calc[0][1] === 'number' && has_calc[0][1] ? 3 : 0);
                  /* }}} */
              } else if (has_constrained_weekday[0]) {
                  at = parseMonthRange(tokens, at);
              } else if (matchTokens(tokens, at, 'month')) {
                  return parseMonthRange(tokens, at, true, true);
              } else {
                  // throw 'Unexpected token in monthday range: "' + tokens[at] + '"';
                  return at;
              }

              if (!matchTokens(tokens, at, ','))
                  break;
          }

          return at;
      }
      /* }}} */

      /* Main selector traversal function (return state array for date). {{{
       * Checks for given date which rule and those which state and comment applies.
       *
       * :param date: Date object.
       * :returns: Array:
       *            0. resultstate: State: true for 'open', false for 'closed'.
       *            1. changedate: Next change as date object.
       *            2. unknown: true if state open is not sure.
       *            3. comment: Comment which applies for this time range (from date to changedate).
       *            4. match_rule: Rule number starting with 0 (nrule).
       */
      this.getStatePair = function(date) {
          var resultstate = false;
          var changedate;
          var unknown = false;
          var comment;
          var match_rule;

          var date_matching_rules = [];

          /* Go though all date selectors and check if they return something
           * else than closed for the given date.
           */
          for (var nrule = 0; nrule < rules.length; nrule++) {
              var matching_date_rule = true;
              // console.log(nrule, 'length',  rules[nrule].date.length);

              /* Try each date selector type. */
              for (var ndateselector = 0; ndateselector < rules[nrule].date.length; ndateselector++) {
                  var dateselectors = rules[nrule].date[ndateselector];
                  // console.log(nrule, ndateselector);

                  var has_matching_selector = false;
                  for (var datesel = 0; datesel < dateselectors.length; datesel++) {
                      var res = dateselectors[datesel](date);
                      if (res[0]) {
                          has_matching_selector = true;

                          if (typeof res[2] === 'string') { // holiday name
                              comment = [ res[2], nrule ];
                          }

                      }
                      if (typeof changedate === 'undefined' || (typeof res[1] === 'object' && res[1].getTime() < changedate.getTime()))
                          changedate = res[1];
                  }

                  if (!has_matching_selector) {
                      matching_date_rule = false;
                      // We can ignore other date selectors, as the state won't change
                      // anyway until THIS selector matches (due to conjunction of date
                      // selectors of different types).
                      // This is also an optimization, if widest date selector types
                      // are checked first.
                      break;
                  }
              }

              if (matching_date_rule) {
                  /* The following lines implement date overwriting logic (e.g. for
                   * "Mo-Fr 10:00-20:00; We 10:00-16:00", We rule overrides Mo-Fr rule partly (We).
                   *
                   * This is the only way to be consistent. I thought about ("22:00-02:00; Tu 12:00-14:00") letting Th override 22:00-02:00 partly:
                   * Like: Th 00:00-02:00,12:00-14:00 but this would result in including 22:00-00:00 for Th which is probably not what you want.
                   */
                  if ((rules[nrule].date.length > 0 || nrule > 0 && rules[nrule].meaning && rules[nrule-1].date.length === 0)
                          && (rules[nrule].meaning || rules[nrule].unknown)
                          && !rules[nrule].wrapped && !rules[nrule].additional && !rules[nrule].fallback
                      ) {

                      // var old_date_matching_rules = date_matching_rules;
                      date_matching_rules = [];
                      // for (var nrule = 0; nrule < old_date_matching_rules.length; nrule++) {
                      //     if (!rules[old_date_matching_rules[nrule]].wrapped)
                      //         date_matching_rules.push(nrule);
                      // }
                  }
                  date_matching_rules.push(nrule);
              }
          }

          // console.log(date_matching_rules);
          for (var nrule = 0; nrule < date_matching_rules.length; nrule++) {
              var rule = date_matching_rules[nrule];

              // console.log('Processing rule ' + rule + ': with date ' + date
                  // + ' and ' + rules[rule].time.length + ' time selectors (comment: "' + rules[rule].comment + '").');

              /* There is no time specified, state applies to the whole day. */
              if (rules[rule].time.length === 0) {
                  // console.log('there is no time', date);
                  if (!rules[rule].fallback || (rules[rule].fallback && !(resultstate || unknown))) {
                      resultstate = rules[rule].meaning;
                      unknown     = rules[rule].unknown;
                      match_rule  = rule;

                      // if (rules[rule].fallback)
                          // break rule; // fallback rule matched, no need for checking the rest
                      // WRONG: What if closing rules follow?
                  }
              }

              for (var timesel = 0; timesel < rules[rule].time.length; timesel++) {
                  var res = rules[rule].time[timesel](date);

                  // console.log('res:', res);
                  if (res[0]) {
                      if (!rules[rule].fallback || (rules[rule].fallback && !(resultstate || unknown))) {
                          resultstate = rules[rule].meaning;
                          unknown     = rules[rule].unknown;
                          match_rule  = rule;

                          /* Reset open end comment */
                          if (typeof comment === 'object' && comment[0] === t('open end'))
                              comment = undefined;

                          // open end
                          if (res[2] === true && (resultstate || unknown)) {
                              comment = [ t('open end'), match_rule ];

                              resultstate = false;
                              unknown     = true;

                              /* Hack to make second rule in '07:00+,12:00-16:00; 16:00-24:00 closed "needed because of open end"' obsolete {{{ */
                              if (typeof rules[rule].time[timesel+1] === 'function') {

                                  var next_res = rules[rule].time[timesel+1](date);
                                  if (  !next_res[0]
                                      // && next_res[2]
                                      && typeof next_res[1] === 'object'
                                      // && getValueForDate(next_res[1], true) !== getValueForDate(date, true) // Just to be sure.
                                      && rules[rule].time[timesel](new Date(date.getTime() - 1))[0]
                                      /* To distinguish the following two values:
                                       *     'sunrise-14:00,14:00+',
                                       *   '07:00+,12:00-16:00',
                                       */
                                      ) {

                                      // console.log("07:00+,12:00-16:00 matched.");

                                      resultstate = false;
                                      unknown     = false;
                                  }
                              }
                              /* }}} */
                          }

                          if (rules[rule].fallback) {
                              if (typeof changedate === 'undefined' || (typeof res[1] !== 'undefined' && res[1] < changedate)) {
                                  // FIXME: Changing undefined does not break the test framework.
                                  changedate = res[1];
                              }

                              // break rule; // Fallback rule matched, no need for checking the rest.
                              // WRONG: What if 'off' is used after fallback rule.
                          }
                      }
                  }
                  if (typeof changedate === 'undefined' || (typeof res[1] === 'object' && res[1] < changedate))
                      changedate = res[1];
              }
          }

          if (typeof rules[match_rule] === 'object' && typeof rules[match_rule].comment === 'string') {
              /* Only use comment if one is explicitly specified. */
              comment = rules[match_rule].comment;
          } else if (typeof comment === 'object') {
              if (comment[1] === match_rule) {
                  comment = comment[0];
              } else {
                  comment = undefined;
              }
          }

          // console.log('changedate', changedate, resultstate, comment, match_rule);
          return [ resultstate, changedate, unknown, comment, match_rule ];
      };
      /* }}} */

      /* Generate prettified value for selector based on tokens. {{{
       *
       * :param tokens: List of token objects.
       * :param at: Position where to start.
       * :param last_at: Position where to stop.
       * :param conf: Configuration options.
       * :returns: Prettified value.
       */
      function prettifySelector(tokens, selector_start, selector_end, selector_type, conf) {

          var prettified_value = '';
          var at = selector_start;
          // console.log(selector_type);
          while (at <= selector_end) {
              // console.log('At: ' + at + ', token: ' + tokens[at]);
              if (matchTokens(tokens, at, 'weekday')) {
                  if (!conf.leave_weekday_sep_one_day_betw
                      && at - selector_start > 1 && (matchTokens(tokens, at-1, ',') || matchTokens(tokens, at-1, '-'))
                      && matchTokens(tokens, at-2, 'weekday')
                      && tokens[at][0] === (tokens[at-2][0] + 1) % 7) {
                          prettified_value = prettified_value.substring(0, prettified_value.length - 1) + conf.sep_one_day_between;
                  }
                  prettified_value += weekdays[tokens[at][0]];
              } else if (at - selector_start > 0 // e.g. '09:0' -> '09:00'
                      && selector_type === 'time'
                      && matchTokens(tokens, at-1, 'timesep')
                      && matchTokens(tokens, at, 'number')) {
                  prettified_value += (tokens[at][0] < 10 ? '0' : '') + tokens[at][0].toString();
              } else if (selector_type === 'time' // e.g. '9:00' -> ' 09:00'
                      && conf.zero_pad_hour
                      && at !== tokens.length
                      && matchTokens(tokens, at, 'number')
                      && matchTokens(tokens, at+1, 'timesep')) {
                  prettified_value += (
                          tokens[at][0] < 10 ?
                              (tokens[at][0] === 0 && conf.one_zero_if_hour_zero ?
                               '' : '0') :
                              '') + tokens[at][0].toString();
              } else if (selector_type === 'time' // e.g. '9-18' -> '09:00-18:00'
                      && at + 2 <= selector_end
                      && matchTokens(tokens, at, 'number')
                      && matchTokens(tokens, at+1, '-')
                      && matchTokens(tokens, at+2, 'number')) {
                  prettified_value += (tokens[at][0] < 10 ?
                          (tokens[at][0] === 0 && conf.one_zero_if_hour_zero ? '' : '0')
                          : '') + tokens[at][0].toString();
                  prettified_value += ':00-'
                      + (tokens[at+2][0] < 10 ? '0' : '') + tokens[at+2][0].toString()
                      + ':00';
                  at += 2;
              } else if (matchTokens(tokens, at, 'comment')) {
                  prettified_value += '"' + tokens[at][0].toString() + '"';
              } else if (matchTokens(tokens, at, 'closed')) {
                  prettified_value += (conf.leave_off_closed ? tokens[at][0] : conf.keyword_for_off_closed);
              } else if (at - selector_start > 0 && matchTokens(tokens, at, 'number')
                      && (selector_type === 'month' || selector_type === 'week')) {
                  prettified_value +=
                      (matchTokens(tokens, at-1, 'month') || matchTokens(tokens, at-1, 'week') ? ' ' : '')
                      + (conf.zero_pad_month_and_week_numbers && tokens[at][4] !== 'positive_number' && tokens[at][0] < 10 ? '0' : '')
                      + tokens[at][0];
              } else if (at - selector_start > 0 && matchTokens(tokens, at, 'month')
                      && matchTokens(tokens, at-1, 'year')) {
                  prettified_value += ' ' + months[[tokens[at][0]]];
              } else if (at - selector_start > 0 && matchTokens(tokens, at, 'event')
                      && matchTokens(tokens, at-1, 'year')) {
                  prettified_value += ' ' + tokens[at][0];
              } else if (matchTokens(tokens, at, 'month')) {
                  prettified_value += months[[tokens[at][0]]];
                  if (at + 1 <= selector_end && matchTokens(tokens, at+1, 'weekday'))
                      prettified_value += ' ';
              } else if (at + 2 <= selector_end
                      && (matchTokens(tokens, at, '-') || matchTokens(tokens, at, '+'))
                      && matchTokens(tokens, at+1, 'number', 'calcday')) {
                  prettified_value += ' ' + tokens[at][0] + tokens[at+1][0] + ' day' + (Math.abs(tokens[at+1][0]) === 1 ? '' : 's');
                  at += 2;
              } else if (at === selector_end
                      && selector_type === 'weekday'
                      && tokens[at][0] === ':') ; else if (at === selector_end
                      && selector_type === 'time'
                      && tokens[at][0] === ',') ; else {
                  prettified_value += tokens[at][0].toString();
              }
              at++;
          }
          return prettified_value;
      }
      /* }}} */

      //======================================================================
      // Public interface {{{
      // All functions below are considered public.
      //======================================================================

      // Simple API {{{

      this.getState = function(date) {
          var it = this.getIterator(date);
          return it.getState();
      };

      this.getUnknown = function(date) {
          var it = this.getIterator(date);
          return it.getUnknown();
      };

      this.getStateString = function(date, past) {
          var it = this.getIterator(date);
          return it.getStateString(past);
      };

      this.getComment = function(date) {
          var it = this.getIterator(date);
          return it.getComment();
      };

      this.getMatchingRule = function(date) {
          var it = this.getIterator(date);
          return it.getMatchingRule();
      };

      /* Not available for iterator API {{{ */
      /* getWarnings: Get warnings, empty list if none {{{ */
      this.getWarnings = function() {
          var it = this.getIterator();
          return getWarnings(it);
      };
      /* }}} */

      /* prettifyValue: Get a nicely formated value {{{ */
      this.prettifyValue = function(argument_hash) {
          this.getWarnings();
          /* getWarnings has to be run before prettifyValue because some
           * decisions if certain aspects makes sense to prettify or not
           * are influenced by warnings.
           * Basically, both functions depend on each other in some way :(
           * See done_with_selector_reordering.
           */
          return prettifyValue(argument_hash);
      };
      /* }}} */

      /* getNextChange: Get time of next status change {{{ */
      this.getNextChange = function(date, maxdate) {
          var it = this.getIterator(date);
          if (!it.advance(maxdate))
              return undefined;
          return it.getDate();
      };
      /* }}} */

      /* isWeekStable: Checks whether open intervals are same for every week. {{{ */
      this.isWeekStable = function() {
          return week_stable;
      };
      /* }}} */

      /* isEqualTo: Check if this opening_hours object has the same meaning as the given opening_hours object. {{{ */
      this.isEqualTo = function(second_oh_object, start_date) {
          if (typeof start_date === 'undefined') {
              var start_date = new Date();
          }
          var datelimit;

          if (this.isWeekStable() && second_oh_object.isWeekStable()) {
              datelimit = new Date(start_date.getTime() + msec_in_day * 10);
          // } else if (this.isWeekStable() !== second_oh_object.isWeekStable()) {
          //     return [ false,
          //         {
          //             'reason': 'isWeekStable do not match',
          //         }
          //     ];
          } else {
              datelimit = new Date(start_date.getTime() + msec_in_day * 366 * 5);
          }

          var first_it = this.getIterator(start_date);
          var second_it = second_oh_object.getIterator(start_date);

          while (first_it.advance(datelimit)) {
              second_it.advance(datelimit);

              var not_equal = [];

              if (first_it.getDate().getTime() !== second_it.getDate().getTime()) {
                  not_equal.push('getDate');
              }

              if (first_it.getState() !== second_it.getState()) {
                  not_equal.push('getState');
              }

              if (first_it.getUnknown() !== second_it.getUnknown()) {
                  not_equal.push('getUnknown');
              }

              if (first_it.getComment() !== second_it.getComment()) {
                  not_equal.push('getComment');
              }

              if (not_equal.length) {
                  var deviation_for_time = {};
                  deviation_for_time[first_it.getDate().getTime()] = not_equal;
                  return [ false,
                      {
                          'matching_rule': first_it.getMatchingRule(),
                          'matching_rule_other': second_it.getMatchingRule(),
                          'deviation_for_time': deviation_for_time,
                      }
                  ];
              }
          }

          return [ true ];
      };
      /* }}} */
      /* }}} */
      /* }}} */

      // High-level API {{{
      /* getOpenIntervals: Get array of open intervals between two dates {{{ */
      this.getOpenIntervals = function(from, to) {
          var res = [];

          var it = this.getIterator(from);

          if (it.getState() || it.getUnknown()) {
              res.push([from, undefined, it.getUnknown(), it.getComment()]);
          }

          while (it.advance(to)) {
              if (it.getState() || it.getUnknown()) {
                  if (res.length !== 0 && typeof res[res.length - 1][1] === 'undefined') {
                      // last state was also open or unknown
                      res[res.length - 1][1] = it.getDate();
                  }
                  res.push([it.getDate(), undefined, it.getUnknown(), it.getComment()]);
              } else {
                  if (res.length !== 0 && typeof res[res.length - 1][1] === 'undefined') {
                      // only use the first time as closing/change time and ignore closing times which might follow
                      res[res.length - 1][1] = it.getDate();
                  }
              }
          }

          if (res.length > 0 && typeof res[res.length - 1][1] === 'undefined') {
              res[res.length - 1][1] = to;
          }

          return res;
      };
      /* }}} */

      /* getOpenDuration: Get total number of milliseconds a facility is open,unknown within a given date range {{{ */
      this.getOpenDuration = function(from, to) {

          var open    = 0;
          var unknown = 0;

          var it = this.getIterator(from);
          var prevdate    = (it.getState() || it.getUnknown()) ? from : undefined;
          var prevstate   = it.getState();
          var prevunknown = it.getUnknown();

          while (it.advance(to)) {
              if (it.getState() || it.getUnknown()) {

                  if (typeof prevdate === 'object') {
                      // last state was also open or unknown
                      if (prevunknown) //
                          unknown += it.getDate().getTime() - prevdate.getTime();
                      else if (prevstate)
                          open    += it.getDate().getTime() - prevdate.getTime();
                  }

                  prevdate    = it.getDate();
                  prevstate   = it.getState();
                  prevunknown = it.getUnknown();
                  // console.log('if', prevdate, open / (1000 * 60 * 60), unknown / (1000 * 60 * 60));
              } else {
                  // console.log('else', prevdate);
                  if (typeof prevdate === 'object') {
                      if (prevunknown)
                          unknown += it.getDate().getTime() - prevdate.getTime();
                      else
                          open    += it.getDate().getTime() - prevdate.getTime();
                      prevdate = undefined;
                  }
              }
          }

          if (typeof prevdate === 'object') {
              if (prevunknown)
                  unknown += to.getTime() - prevdate.getTime();
              else
                  open    += to.getTime() - prevdate.getTime();
          }

          return [ open, unknown ];
      };
      /* }}} */
      /* }}} */

      // Iterator API {{{
      this.getIterator = function(date) {
          return new function(oh) {
              if (typeof date === 'undefined')
                  date = new Date();

              var prevstate = [ undefined, date, undefined, undefined, undefined ];
              var state = oh.getStatePair(date);

              /* getDate {{{ */
              this.getDate = function() {
                  return prevstate[1];
              };
              /* }}} */

              /* setDate {{{ */
              this.setDate = function(date) {
                  if (typeof date !== 'object')
                      throw t('date parameter needed');

                  prevstate = [ undefined, date, undefined, undefined, undefined ];
                  state     = oh.getStatePair(date);
              };
              /* }}} */

              /* getState: Check whether facility is `open' {{{ */
              this.getState = function() {
                  return state[0];
              };
              /* }}} */

              /* getUnknown: Checks whether the opening state is conditional or unknown {{{ */
              this.getUnknown = function() {
                  return state[2];
              };
              /* }}} */

              /* getStateString: Get state string. Either 'open', 'unknown' or 'closed' {{{ */
              this.getStateString = function(past) {
                  return (state[0] ? 'open' : (state[2] ? 'unknown' : (past ? 'closed' : 'close')));
              };
              /* }}} */

              /* getComment: Get the comment, undefined in none {{{ */
              this.getComment = function() {
                  return state[3];
              };
              /* }}} */

              /* getMatchingRule: Get the rule which matched thus deterrents the current state {{{ */
              this.getMatchingRule = function() {
                  if (typeof state[4] === 'undefined')
                      return undefined;

                  return rules[state[4]].build_from_token_rule[2];
              };
              /* }}} */

              /* advance: Advances to the next position {{{ */
              this.advance = function(datelimit) {
                  if (typeof datelimit === 'undefined') {
                      datelimit = new Date(prevstate[1].getTime() + msec_in_day * 366 * 5);
                  } else if (datelimit.getTime() <= prevstate[1].getTime()) {
                      return false; /* The limit for advance needs to be after the current time. */
                  }

                  do {
                      if (typeof state[1] === 'undefined') {
                          return false; /* open range, we won't be able to advance */
                      }

                      // console.log('\n' + 'previous check time:', prevstate[1]
                      //     + ', current check time:',
                      //     state[1],
                      //     (state[0] ? 'open' : (state[2] ? 'unknown' : 'closed'))
                      //     + ', comment:', state[3]
                      //     + ', match_rule:', state[4]);

                      if (state[1].getTime() <= prevstate[1].getTime()) {
                          /* We're going backwards or staying at the same time.
                           * This most likely indicates an error in a selector code.
                           */
                          throw 'Fatal: infinite loop in nextChange';
                      }

                      if (state[1].getTime() >= datelimit.getTime()) {
                          /* Don't advance beyond limits. */
                          return false;
                      }

                      // do advance
                      prevstate = state;
                      state = oh.getStatePair(prevstate[1]);
                      // console.log(state);
                  } while (state[0] === prevstate[0] && state[2] === prevstate[2] && state[3] === prevstate[3]);
                  return true;
              };
              /* }}} */
          }(this);
      };
      /* }}} */

      /* }}} */
  }

  /* vim: set ts=4 sw=4 tw=0 et foldmarker={{{,}}} foldlevel=0 foldmethod=marker : */

  return index;

}));
