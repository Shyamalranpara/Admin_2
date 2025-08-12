import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export interface BreakdownData {
  key: string;
  time: string;
  delta: string;
  bedTemp: string;
  tfOut: string;
  ibhInlet: string;
  furnaceDraft: string;
  sandLevel: string;
  fdFanTemp: string;
  flueGasTemp: string;
  heatOutput: string;
}

export interface BreakdownResponse {
  id: string;
  data: BreakdownData[];
}

export const dataService = {
  async getBreakdownData(): Promise<BreakdownData[]> {
    try {
      const response = await axios.get<BreakdownResponse[]>(`${API_BASE_URL}/breakdown`);
      if (response.data && response.data.length > 0) {
        return response.data[0].data || [];
      }
      return [];
    } catch (error) {
      console.error('Error fetching breakdown data:', error);
      return [];
    }
  },

  // Save breakdown data
  async saveBreakdownData(data: BreakdownData[]): Promise<boolean> {
    try {
      await axios.post(`${API_BASE_URL}/breakdown`, {
        id: Date.now().toString(),
        data: data
      });
      return true;
    } catch (error) {
      console.error('Error saving breakdown data:', error);
      return false;
    }
  },

  // Get specific chart data
  async getChartData(chartType: string): Promise<{ time: string; value: number }[]> {
    try {
      const breakdownData = await this.getBreakdownData();
      
      return breakdownData.map(item => ({
        time: item.time,
        value: parseFloat(item[chartType as keyof BreakdownData] as string) || 0
      }));
    } catch (error) {
      console.error(`Error fetching ${chartType} chart data:`, error);
      return [];
    }
  }
};
