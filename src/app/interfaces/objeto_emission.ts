export interface ObjetoEmission {
    opciones_load: string;
    sampling_frequency: number;
    exclusion_window_around_main_peak: number;
    length_L: number;
    num_sim_emmiters_nemo: number;
    carrierFreq: number;
    oversampling_factor: number;
    sampling_frequency_modulation: number;
    carrier_cycles: number;
    emission_time: number;
    tgap: number;
    num_Repetitions: number;
    transductor_model: number;
    Tshift: number;
    carrier_type: string[];
    modulation: string;
  }