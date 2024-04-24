import { Component, OnInit, Renderer2, ElementRef, inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importar FormsModule
import { HttpClient } from '@angular/common/http';
import { ScrollService } from '../services/scrollService/scroll-service.service';
import { SpinnerService } from '../services/spinnerService/spinner-service.service';

import { DisplayUnmodulatedCodeService } from '../services/display_unmodulated_code/display-unmodulated-code.service';
import { DisplayCarrierSignalService } from '../services/display_carrier_signal/display-carrier-signal.service';
import { points_3d } from '../services/points_3d/points_3d.service';
import { DisplayModulatedSignal } from '../services/display_modulated_signal/display_modulated_signal.service';
import { Emmiter } from 'src/models/emmiter';
import { Pos_emiService } from '../services/pos_emi/pos_emi.service';
import { Display_signal_with_transducer_effect } from '../services/display_signal_with_transducer_effect/display_signal_with_transducer_effect.service';
import { SeeTranducerModel } from '../services/see_transducer_model/see_transducer_model.service';


@Component({
  selector: 'app-seccion2',
  templateUrl: './seccion2.component.html',
  styleUrls: ['./seccion2.component.css'],
})
export class Seccion2Component implements OnInit {

  @ViewChild('seccion3Ref') seccion3Ref!: ElementRef;

  form: FormGroup<any>;
  csv: string | undefined;
  isLoadBasedBinaryCodeSelected: boolean | undefined = false;
  isLoadModulatedCodeSelected: boolean | undefined = false;
  matrix_cod: any[][] | undefined;
  matrix_codMod: any[][] | undefined;
  showSeccion3: boolean = false;
  disabledLink = true;
  popmenu1_CarrierType: string[] = ['', 'Sine', 'Square']; //portadora
  popmenu2_TransductorModel: string[] = ['', '328ST160', 'Introduce model', 'No' ]; //transductor
  selectedModulation: any;
  popmenu3_Emmiter: string[] = []; //transductor
  // TODO emmiters:Emmiter[]
  emmiters: Emmiter[] = [];


  Pos_emi = [
    [0, 0, 51.5, 0, -51.4],
    [0, 51.2, 0, -52.2, 0],
    [328, 342.5, 336, 342.5, 336],
  ];

  objeto_global = {
    opciones_load: 'load_based_binary_code',
    sampling_frequency: 50,
    exclusion_window_around_main_peak: 10,
    length_L: 0,
    num_sim_emmiters_nemo: 0,
    carrierFreq: 41.6667, // fc
    oversampling_factor: 12, // of
    sampling_frequency_modulation: 500, // fse_m
    carrier_cycles: 2, // nc
    emission_time: 0,
    tgap: 150, // tgap
    num_Repetitions: 20, //nrep
    //carrier_type: 'Opcion 2', //_portadora
    transductor_model: 2,
    Tshift: 0, //_Tshift
    carrier_type: ['Sine'], // portadora =  2
    modulation: 'CDMA',
    /*     X: 0,
    Y: 0,
    Z: 0, */
  };

  isEditableFse: boolean = true;
  isEditableExclusion: boolean = true;
  ttotal: number = 0;
  isEditableCarrierFreq: any;
  isEditableSampling_freq_mod: any;
  isEditableCarrierCycles: any;
  isEnabledCarryerType = false;
  isEnabledDisplay_unmodulated = false;
  isEnabledDisplay_modulated = false;
  isEnabledSave_modulated = false;
  isEnabledSave_display_carrier_signal = false;
  isEditableLengthL = false; //completar
  isEditableNumEmitters = false;
  isEditableOf: any;
  isEditableTe: any;

  see_transducerModel = inject(SeeTranducerModel)
  display_unmodulated = inject(DisplayUnmodulatedCodeService);
  display_carrierSignal = inject(DisplayCarrierSignalService);
  display_modulated_code = inject(DisplayModulatedSignal);
  points_3d = inject(points_3d);
  display_signal_with_transducer_effect = inject(Display_signal_with_transducer_effect)
  pos_emiService=inject(Pos_emiService);
  changeDetectorRef = inject(ChangeDetectorRef);
  pos_emision: Emmiter[] = [];

  graficoJSON: any;
  graficoJSON3: any;
  graficoJSON4: any;
  graficoJSON5: any;
  graficoJSON6: any;
  graficoJSON7: any;

  spinnerService = inject(SpinnerService);
  spinnerService2 = inject(SpinnerService);
  spinnerService3 = inject(SpinnerService);
  spinnerService4 = inject(SpinnerService);
  spinnerService5 = inject(SpinnerService);
  output: string = '';

  constructor(
    private location: Location,
    private http: HttpClient,
    private renderer: Renderer2,
    private el: ElementRef,
    private scrollService: ScrollService
  ) {
    this.form = new FormGroup({
      opciones_load: new FormControl('', Validators.required),
      //sampling_frequency: new FormControl('', Validators.required),
      exclusion_window_around_main_peak: new FormControl('', Validators.required),
      length_L: new FormControl('', Validators.required),
      num_sim_emmiters_nemo: new FormControl('', Validators.required),
      carrier_type: new FormControl('', Validators.required),
      carrierFreq: new FormControl('', Validators.required),
      sampling_frequency_modulation: new FormControl('', Validators.required),
      oversampling_factor: new FormControl('', Validators.required),
      carrier_cycles: new FormControl('', Validators.required),
      emission_time: new FormControl('', Validators.required),
      tgap: new FormControl('', Validators.required),
      num_Repetitions: new FormControl('', Validators.required),
      modulation: new FormControl('', Validators.required),
      Tshift: new FormControl('', Validators.required),
      transductor_model: new FormControl('', Validators.required),
      
    });
  }

  ngOnInit() {
    this.isEditableFse = false;
    this.isEditableExclusion = false;
    if (this.form) {
      let control = this.form.get('opciones_load');
      if (control) {
        control.valueChanges.subscribe((value) => {
          console.log(value + '1');
          if (value == 'load_modulated_code') {
            this.isLoadModulatedCodeSelected = true;
            this.isEditableFse = true;
            this.isEditableExclusion = true;
          } else {
            this.isLoadModulatedCodeSelected = false;
            this.isEditableFse = false;
            this.isEditableExclusion = false;
          }

          if (value == 'load_based_binary_code') {
            this.isLoadBasedBinaryCodeSelected = true;
          } else {
            this.isLoadBasedBinaryCodeSelected = false;
          }
          
        });
      }
    }
    this.pos_emiService.getPos_emision.subscribe((objeto) => {
      this.pos_emision = objeto;
    });

    setTimeout(() => {
      this.scrollToSelector3();
    }, 500);
  }

  popmenu1_CarrierTypeChange(event: any) {
    const selectedValue = event.target.value;
    console.log('Selected value from popmenu1:', selectedValue);
  }

  popmenu2_TransductorModelChange(event: any) {
    const selectedValue = event.target.value;
    console.log('Selected value from popmenu2:', selectedValue);
  }



  /* Cargar Valores por Default*/
  async setDefaultValues() {
    this.vaciarGraficos();
    if (
      this.isLoadBasedBinaryCodeSelected &&
      !this.isLoadModulatedCodeSelected
    ) {
      this.isEnabledCarryerType = true;
      this.isEnabledDisplay_unmodulated = true;
      this.isEnabledSave_modulated = true;
      this.isEnabledSave_display_carrier_signal = true;
      //
      this.isEditableCarrierFreq = false; //edit5
      this.isEditableSampling_freq_mod = false; //edit6
      this.isEditableCarrierCycles = false; //edit7
      //
      this.isEditableFse = false;
      this.isEditableExclusion = false;

      if (this.matrix_cod) {
        this.ttotal = 52.096;
        //    ttotal=52.096;
        //    load 'Avi328ST160_500.mat';
        //    load 'delay_500.mat';

        this.form.patchValue({
          opciones_load: 'load_based_binary_code',

          sampling_frequency: 50,
          exclusion_window_around_main_peak: 24,
          length_L: this.matrix_cod
            ? Math.max(...this.matrix_cod.map((row) => row.length))
            : 0, // L
          num_sim_emmiters_nemo: this.matrix_cod
            ? this.getNum_row(this.matrix_cod)
            : 0, // nemo
          carrierFreq: 41.6667, // fc
          oversampling_factor: 12, // of
          sampling_frequency_modulation: 500, // fse_m
          carrier_cycles: 2, // nc
          emission_time: this.matrix_cod
            ? Math.max(...this.matrix_cod.map((row) => row.length)) / 500 //te
            : 0, //length_L/sampling_frequency_modulation_fse_m,   // te
          tgap: 150, // tgap
          num_Repetitions: 20, //nrep
          carrier_type: ['Sine'], // portadora =  2
          transductor_model: ['328ST160'], //transductor_model: 2,
          //ttotal=52.096,
          Tshift: '', //_Tshift

          modulation: 'CDMA',
          /*  X: this.Pos_emi[0][0],
          Y: this.Pos_emi[1][0],
          Z: this.Pos_emi[2][0],
 */
          //load 'Avi328ST160_500.mat';
          //load 'delay_500.mat';

          // Agregar más valores predeterminados según sea necesario
        });
        console.log('no modulado');
        this.objeto_global = this.form.value;
        console.log(this.objeto_global);
      } else {
        window.alert('no se cargo un archivo no modulado');
      }
    } else {
      // TODO      BORRAR LA CONDICION Y CARGAR EL ARCHIVO MODULADO Y VA....
      /*      SI ES MODULADA:       */
      try {
        await this.cargarCSV_MatrixCodMod_defecto();
      } catch (e) {
        console.log('Error al cargar el archivo modulado por defecto ', e);
      }

      this.form.get('opciones_load')?.setValue('load_modulated_code');
      this.isLoadModulatedCodeSelected = true;
      //
      this.isEnabledCarryerType = false;
      this.isEnabledDisplay_unmodulated = false;
      this.isEnabledSave_modulated = false;
      this.isEnabledSave_display_carrier_signal = false;
      this.isEnabledDisplay_modulated = true;
      //
      this.isEditableCarrierFreq = false; //edit5
      this.isEditableSampling_freq_mod = false; //edit6
      this.isEditableCarrierCycles = false; //edit7
      this.isEditableFse = true; // edit11
      this.isEditableExclusion = true; // edit12
      this.isEditableOf = false;
      this.isEditableTe = false;

      console.log('1');
      console.log(this.matrix_codMod);
      if (this.matrix_codMod) {
        console.log('2');
        this.ttotal = 52.096;
        this.form.patchValue({
          opciones_load: 'load_modulated_code',
          //sampling_frequency: 50, // Ejemplo de valor predeterminado para sampling_frequency
          exclusion_window_around_main_peak: 24, // Ejemplo de valor predeterminado
          length_L: this.matrix_codMod
            ? Math.max(...this.matrix_codMod.map((row) => row.length))
            : 0, // L
          // A no la calculo porq es solo para calcular el numero de filas de matri x_codMod
          num_sim_emmiters_nemo: this.matrix_codMod
            ? this.getNum_row(this.matrix_codMod)
            : 0, // nemo
          carrierFreq: 41.6667, // fc
          oversampling_factor: 12, // of
          sampling_frequency_modulation: 500, // fse_m
          carrier_cycles: 2, // nc
          emission_time: this.matrix_codMod
            ? Math.max(...this.matrix_codMod.map((row) => row.length)) / 500
            : 0, //length_L/sampling_frequency_modulation_fse_m,   // te
          tgap: 150, // tgap

          //carrier_type: 'Opcion 2', //_portadora
          //transductor_model: 2,
          Tshift: 0, //_Tshift
          num_Repetitions: 20, //nrep
          carrier_type: ['Sine'], // portadora =  2
          modulation: 'CDMA', // transductor2
          /*   X: this.Pos_emi[0][0],
          Y: this.Pos_emi[1][0],
          Z: this.Pos_emi[2][0],  */
          transductor_model: ['328ST160'],
        });
        this.emmiters = [];
        this.extractPoints(this.Pos_emi); //todo
        console.log('3');
        /* this.cargarEmmitersCodigoModulado( this.form.value.num_sim_emmiters_nemo );  */
        console.log('4');
        console.log('modulado');
        this.objeto_global = this.form.value;
        console.log(this.objeto_global);
      } /*else {
        window.alert('no se cargo un archivo no modulado');
      }*/
    }
    /*if (!this.isLoadBasedBinaryCodeSelected && !this.isLoadModulatedCodeSelected){
      this.cargarCSV_MatrixCodMod_defecto();
    }*/
  }

  agregarPosEmision(emisor:Emmiter) {
    this.pos_emision.push(emisor); // Modificar un elemento del array bidimensional
    this.pos_emiService.pos_emision = this.pos_emision; // Publicar el cambio en el objeto
  }

  onSubmit() {
    if (this.form.valid) {
      // Si el formulario es valido
      //console.log(this.form.value);

      // cargo en el objeto VALORES todos los elementos del formulario
      const valores = {
        opciones_load: this.form.get('opciones_load')?.value,
        isLoadBasedBinaryCodeSelected:
          this.form.get('opciones_load')?.value === 'load_based_binary_code',
        isLoadModulatedCodeSelected:
          this.form.get('opciones_load')?.value === 'load_modulated_code',
        sampling_frequency_fse: this.form.get('sampling_frequency')?.value,
        exclusion_window_around_main_peak: this.form.get(
          'exclusion_window_around_main_peak'
        )?.value,
        length_L: this.form.get('length_L')?.value,
        num_sim_emmiters_nemo: this.form.get('num_sim_emmiters_nemo')?.value,
        carrier_type_portadora: this.form.get('carrier_type')?.value,
        carrierFreq_fc: this.form.get('carrierFreq')?.value,
        sampling_frequency_modulation_fse_m: this.form.get(
          'sampling_frequency_modulation'
        )?.value,
        oversampling_factor_of: this.form.get('oversampling_factor')?.value,
        carrier_cycles_nc: this.form.get('carrier_cycles')?.value,
        emission_time_te: this.form.get('emission_time')?.value,
        space_between_emissions_tgap: this.form.get('tgap')?.value,
        num_Repetitions_nrep: this.form.get('num_Repetitions')?.value,
        modulation: this.form.get('modulation')?.value,
        delay_between_emitters_Tshift: this.form.get('Tshift')?.value,
        transductor_model: this.form.get('transductor_model')?.value,
      };

      // imprimo el objeto 'valores'
      console.log(valores);     ///TODO valores debe ser un singleton compartido por todas las secciones
      this.showSeccion3 = true;
      
      setTimeout(() => {
        this.scrollToSelector3();
      }, 500);

    } else {
      console.log('Formulario no válido ');
    }

  }

  cargarCSV_MatrixCod() {
    // Crear un elemento de tipo input file
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    // Agregar un evento que se dispare al cambiar el valor del input
    input.addEventListener('change', () => {
      // Obtener el archivo seleccionado
      if (input.files != null) {
        let file = input.files[0];
        // Crear un lector de archivos
        let reader = new FileReader();
        // Leer el archivo como texto
        reader.readAsText(file);
        // Agregar un evento que se dispare al terminar la lectura
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            // Obtener el contenido del archivo como texto
            let csvData = reader.result;
            // Dividir el texto en líneas
            let lines = csvData.split('\n');
            // Crear una matriz para almacenar los datos
            let matrix = [];
            // Recorrer cada línea
            for (let line of lines) {
              // Dividir la línea en números
              // Convertir los números a flotantes
              let numbers = line.split(';').map((number) => parseFloat(number));
              // Verificar si todos los elementos son números
              if (numbers.every((number) => !isNaN(number))) {
                matrix.push(numbers);
              }
            }
            this.matrix_cod = matrix;
            console.log('matrix_cod -> Codigo No Modulado');
            console.table(this.matrix_cod);
          } else {
            console.error('reader.result is not a string');
          }
        };
        reader.onerror = () => {
          console.error(reader.error);
        };
      }
    });
    // Simular un click en el input para abrir el diálogo de selección de archivos
    input.click();
  }

  cargarCSV_MatrixCodMod() {
    // Crear un elemento de tipo input file
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    // Agregar un evento que se dispare al cambiar el valor del input
    input.addEventListener('change', () => {
      // Obtener el archivo seleccionado
      if (input.files != null) {
        let file = input.files[0];
        // Crear un lector de archivos
        let reader = new FileReader();
        // Leer el archivo como texto
        reader.readAsText(file);
        // Agregar un evento que se dispare al terminar la lectura
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            // Obtener el contenido del archivo como texto
            let csvData = reader.result;
            // Dividir el texto en líneas
            let lines = csvData.split('\n');
            // Crear una matriz para almacenar los datos
            let matrix = [];
            // Recorrer cada línea
            for (let line of lines) {
              // Dividir la línea en números
              // Convertir los números a flotantes
              let numbers = line.split(';').map((number) => parseFloat(number));
              // Verificar si todos los elementos son números
              if (numbers.every((number) => !isNaN(number))) {
                matrix.push(numbers);
              }
            }
            this.matrix_codMod = matrix;
            console.log('matrix_codMod -> Codigo Modulado');
            console.table(this.matrix_codMod);
          } else {
            console.error('reader.result is not a string');
          }
        };
        reader.onerror = () => {
          console.error(reader.error);
        };
      }
    });
    // Simular un click en el input para abrir el diálogo de selección de archivos
    input.click();
  }

  cargarCSV_MatrixCodMod_defecto(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // Cargar el archivo CSV desde la carpeta "Assets"
      this.http
        .get('assets/archives/CodigoKasamiModuladoL63Of12Nc2.csv', {
          responseType: 'text',
        })
        .subscribe(
          (data) => {
            // Dividir el contenido del archivo en líneas
            const lines = data.split('\n');

            // Crear una matriz para almacenar los datos
            const matrix: number[][] = [];

            for (const line of lines) {
              // Dividir la línea en números
              const numbersAsString = line.split(';');
              const numbers: number[] = [];

              for (const numberAsString of numbersAsString) {
                const parsedNumber = parseFloat(
                  numberAsString.replace(/,/g, '.')
                );
                if (!isNaN(parsedNumber)) {
                  //const decimalNumber = this.convertScientificToDecimal(parsedNumber);
                  numbers.push(parsedNumber);
                }
              }

              // Verificar si todos los elementos son números
              if (numbers.length > 0) {
                matrix.push(numbers);
              }
            }

            this.matrix_codMod = matrix;
            // Ahora tienes la matriz con los datos del archivo CSV
            console.log('Matriz cargada desde el archivo CSV:');
            console.table(this.matrix_codMod);
            resolve();
          },
          (error) => {
            console.error('Error al cargar el archivo CSV:', error);
            reject(error);
          }
        );
    });
  }

  convertScientificToDecimal(number: number): number {
    const decimalPlaces = -Math.floor(Math.log10(Math.abs(number)));
    const multiplier = Math.pow(10, decimalPlaces);
    return Math.round(number * multiplier) / multiplier;
  }

  cargarArchivo(event: any) {
    const archivo = event.target.files[0];
    const formData = new FormData();
    formData.append('archivo', archivo);

    this.http
      .post<any>('http://127.0.0.1:5000/subir_archivo', formData)
      .subscribe((response) => {
        if (response.error) {
          console.error(response.error);
        } else {
          console.log(response.matriz);
          // Aquí puedes hacer algo con la matriz en el frontend
        }
      });
  }

  getNum_row(matrix_cod: any[][]) {
    let A;
    if (Array.isArray(matrix_cod[0])) {
      // Si matrix es una matriz bidimensional
      A = [matrix_cod.length, matrix_cod[0].length];
    } else {
      // Si matrix es un vector
      A = [matrix_cod.length];
    }
    console.log(A);
    return A[0];
  }

  display_unmod_code() {
    this.output = 'display_unmodulated_code';
    this.spinnerService.show();
    console.log('hola back');
    this.display_unmodulated
      .display_unmodulated_code(this.objeto_global, this.matrix_cod)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.spinnerService.hide();
          this.graficoJSON = JSON.parse(response);
          console.table(this.graficoJSON);
          console.log(this.graficoJSON instanceof Array);
        },

        (error) => {
          this.spinnerService.hide();
          console.error(error);
          //
        }
      );
  }

  display_modulated_signal() {
    this.output = 'display_modulated_signal';
    this.display_modulated_code
      .display_modulated_signal(this.objeto_global, this.matrix_codMod) // portadora = 2 --> carrier_type: ['Sine'] // nemo --> num_sim_emmiters_nemo // te --> emission_time
      .subscribe(
        (response: any) => {
          console.log(response);
          this.spinnerService.hide();
          this.graficoJSON5 = JSON.parse(response);
          console.table(this.graficoJSON5);
          console.log(this.graficoJSON5 instanceof Array);
        },

        (error) => {
          this.spinnerService.hide();
          console.error(error);
          //
        }
      );
  }

  save_modulated_code_file() {
    if (this.form.get('carrier_type')?.value == '') {
      window.alert('El popup de la carrier type (portadora) es vacio ');
    }
  }

  display_carrier_signal() {
    //const data = {
    this.output = 'display_carrier_signal';
    this.spinnerService2.show();
    const carrier_type = this.form.get('carrier_type')?.value[0]; //portadora
    const carrierFreq = this.form.get('carrierFreq')?.value; // fc
    const oversampling_factor = this.form.get('oversampling_factor')?.value; // of
    const carrier_cycles = this.form.get('oversampling_factor')?.value; // nc
    //}
    //console.table(data);
    if (this.form.get('carrier_type')?.value[0] !== '') {
      this.display_carrierSignal
        .display_carrier_signal(
          carrier_type,
          carrierFreq,
          oversampling_factor,
          carrier_cycles
        )
        .subscribe(
          (response: any) => {
            console.log(response);
            this.spinnerService2.hide();
            this.graficoJSON3 = JSON.parse(response.graph);
            console.table(this.graficoJSON3);
            console.log(this.graficoJSON3 instanceof Array);
          },

          (error) => {
            this.spinnerService2.hide();
            console.error(error);
            // Maneja el error (por ejemplo, muestra un mensaje de error)
          }
        );
    } else {
      window.alert(
        'Debe configurar un valor para el carrier_type (portadora) para poder continuar'
      );
    }
  }

  display_points_3d() {
    this.output = 'display_signals_to_emit';
    this.spinnerService3.show();
    //this.points_3d.points_3d(this.emmiters).subscribe(
    this.points_3d.points_3d(this.pos_emiService.pos_emision).subscribe(
    
      (response: any) => {
        console.log(response);
        this.spinnerService3.hide();
        this.graficoJSON4 = JSON.parse(response.graph);
        console.table(this.graficoJSON4);
        console.log(this.graficoJSON4 instanceof Array);
      },

      (error) => {
        this.spinnerService3.hide();
        console.error(error);
        // Maneja el error (por ejemplo, muestra un mensaje de error)
      }
    );
  }

  display_signal_transducer_effect() {
    this.output = 'display_signal_with_transducer_effect';
    this.spinnerService3.show();
    //this.points_3d.points_3d(this.emmiters).subscribe(
    this.display_signal_with_transducer_effect.display_signal_with_transducer_effect(this.objeto_global, this.matrix_codMod).subscribe(
    
      (response: any) => {
        console.log(response);
        this.spinnerService3.hide();
        this.graficoJSON6 = JSON.parse(response.graph);
        console.table(this.graficoJSON6);
        console.log(this.graficoJSON6 instanceof Array);
      },

      (error) => {
        this.spinnerService3.hide();
        console.error(error);
        // Maneja el error (por ejemplo, muestra un mensaje de error)
      }
    );
  }

  see_transducer_model() {
    this.output = 'see_transducer_model';
    this.spinnerService3.show();
    //this.points_3d.points_3d(this.emmiters).subscribe(
    this.see_transducerModel.see_transducer_model(this.objeto_global, this.matrix_codMod).subscribe(
    
      (response: any) => {
        console.log(response);
        this.spinnerService3.hide();
        this.graficoJSON7 = JSON.parse(response.graph);
        console.table(this.graficoJSON7);
        console.log(this.graficoJSON7 instanceof Array);
      },

      (error) => {
        this.spinnerService3.hide();
        console.error(error);
        // Maneja el error (por ejemplo, muestra un mensaje de error)
      }
    );
  }

  load_modulated_code() {
    console.log(this.isLoadModulatedCodeSelected);
    this.isLoadModulatedCodeSelected
      ? (this.isEditableFse = true)
      : (this.isEditableFse = false);
  }

  validateInputEnteros(event: KeyboardEvent) {
    const char = event.key;
    // Permitir números, punto, + y -
    if (!/[\d.]/.test(char)) {
      event.preventDefault();
    }
  }

  //extractPoints(matrix: number[][]): number[][] {
  extractPoints(matrix: number[][]) {
    const points: number[][] = [];

    // Asumimos que cada fila tiene el mismo número de elementos
    const numCols = matrix.length;
    const numRows = matrix[0].length;

    for (let i = 0; i < numRows; i++) {
      const x = matrix[0][i];
      const y = matrix[1][i];
      const z = matrix[2][i];

      points.push([x, y, z]);
      //this.agregarPosEmision([x,y,z]);
      let j = i + 1;
      this.emmiters.push(new Emmiter('e' + j.toString(), x, y, z));
      this.agregarPosEmision(new Emmiter('e' + j.toString(), x, y, z));
    }
    
    console.table(this.agregarPosEmision);
    //return points;
  }

  clear() {
    this.form.reset();
    this.isLoadModulatedCodeSelected = false;
    this.isLoadBasedBinaryCodeSelected = false;
    this.isEnabledCarryerType = false;
    this.isEnabledDisplay_unmodulated = false;
    this.isEnabledSave_modulated = false;
    this.isEnabledSave_display_carrier_signal = false;
    this.graficoJSON = null;
    this.graficoJSON3 = null;
    this.graficoJSON4 = null;
    this.graficoJSON5 = null;
    this.pos_emiService.pos_emision=[];
    this.changeDetectorRef.detectChanges();
  }

  openDialogClear() {
    this.clear();
  }

  onEmmiterChange(emmit: any, variable: string, value: any) {
   
    value.preventDefault(); // Evitar la recarga
    console.log(variable);
    console.log(`Emisor modificado en ${variable}:`, emmit);
    console.log(`Valor actual del campo de entrada (${variable}):`, value.target.value
    );

    this.pos_emiService.updatePos_emision(emmit, variable, value);
  }

  //Scroll a la nueva seccion
  scrollToSelector3() {
    // Verificar si la referencia existe
    console.log("Desplazamiento activado");
    if (this.seccion3Ref) {
      // Desplazar la pantalla hacia el elemento #seccion3Ref
      this.seccion3Ref.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onEnterPress(event: any) {
    event.preventDefault();
  }

  vaciarGraficos(){
    this.graficoJSON = null;
    this.graficoJSON3 = null;
    this.graficoJSON4 = null;
    this.graficoJSON5 = null;
    this.graficoJSON6 = null;
    this.graficoJSON7 = null;
  }
}
