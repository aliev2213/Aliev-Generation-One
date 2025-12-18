import { getAllDailyLogs, getJournalEntries } from '../utils/storage';

export function exportData(): string {
    const data = {
        dailyLogs: getAllDailyLogs(),
        journalEntries: getJournalEntries(),
        exportDate: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
}

export function importData(jsonString: string): boolean {
    try {
        const data = JSON.parse(jsonString);

        if (data.dailyLogs) {
            localStorage.setItem('life-rpg-daily-logs', JSON.stringify(data.dailyLogs));
        }

        if (data.journalEntries) {
            localStorage.setItem('life-rpg-journal-entries', JSON.stringify(data.journalEntries));
        }

        return true;
    } catch (error) {
        console.error('Import failed:', error);
        return false;
    }
}

export function downloadDataBackup(): void {
    const dataStr = exportData();
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `life-rpg-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
